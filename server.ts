import express from 'express';
import { createServer as createViteServer } from 'vite';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'Test@9050',
  database: process.env.DB_NAME || 'qsync',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.get('/api/health', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT 1 AS solution');
      res.json({ status: 'ok', database: 'connected', solution: (rows as any)[0].solution });
    } catch (error) {
      console.error('Database connection error:', error);
      res.status(500).json({ status: 'error', message: 'Database connection failed' });
    }
  });

  app.post('/api/signup', async (req, res) => {
    try {
      const { fullName, email, passwordHash } = req.body;
      const [result] = await pool.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
        [fullName, email, passwordHash]
      );
      res.json({ success: true, userId: (result as any).insertId });
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ success: false, message: 'Email already exists' });
      } else {
        res.status(500).json({ success: false, message: 'Database error' });
      }
    }
  });

  app.post('/api/login', async (req, res) => {
    try {
      const { email } = req.body;
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      const users = rows as any[];
      if (users.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      // Return the hash to the frontend for comparison (as requested by frontend bcrypt architecture)
      res.json({ 
        success: true, 
        user: { id: users[0].id, email: users[0].email, full_name: users[0].full_name, role: users[0].role }, 
        passwordHash: users[0].password_hash 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
