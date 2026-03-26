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
  // Fetch available queues for the dropdown
  app.get('/api/queues', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id, name, description FROM queues WHERE is_active = TRUE');
      res.json({ success: true, queues: rows });
    } catch (error) {
      console.error('Fetch queues error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

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

  // --- Admin Login Endpoint ---
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email } = req.body;
      // Query the new 'admins' table instead of 'users'
      const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
      const admins = rows as any[];
      
      if (admins.length === 0) {
        return res.status(404).json({ success: false, message: 'Admin not found or invalid credentials' });
      }
      
      // Return the hash to the frontend for bcrypt comparison
      res.json({ 
        success: true, 
        user: { id: admins[0].id, email: admins[0].email, role: 'admin' }, 
        passwordHash: admins[0].password_hash 
      });
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

// ==========================================
  // ADMIN USER MANAGEMENT ROUTES
  // ==========================================

  // Get all users
  app.get('/api/admin/users', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id, full_name, email, created_at FROM users ORDER BY created_at DESC');
      res.json({ success: true, users: rows });
    } catch (error) {
      console.error('Fetch users error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Create a new user (Admin override)
  app.post('/api/admin/users', async (req, res) => {
    try {
      const { fullName, email, passwordHash } = req.body;
      const [result] = await pool.query(
        'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)',
        [fullName, email, passwordHash]
      );
      res.json({ success: true, userId: (result as any).insertId });
    } catch (error: any) {
      console.error('Create user error:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ success: false, message: 'Email already exists' });
      } else {
        res.status(500).json({ success: false, message: 'Database error' });
      }
    }
  });

  // Delete a user
  app.delete('/api/admin/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // First, delete associated tickets to prevent foreign key constraint errors
      await pool.query('DELETE FROM tickets WHERE user_id = ?', [id]);
      
      // Then delete the user
      const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });
  
// ==========================================
  // ADMIN TICKET / QR MANAGEMENT ROUTES
  // ==========================================

  // Get all tickets
  app.get('/api/admin/tickets', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT t.*, u.full_name as user_name, u.email as user_email, q.name as queue_name 
        FROM tickets t 
        JOIN users u ON t.user_id = u.id 
        JOIN queues q ON t.queue_id = q.id 
        ORDER BY t.joined_at DESC
      `);
      res.json({ success: true, tickets: rows });
    } catch (error) {
      console.error('Fetch tickets error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Update a ticket (Status, Date, Time)
  app.put('/api/admin/tickets/:id', async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { status, appointment_date, time_period } = req.body;
      
      const [result] = await pool.query(
        'UPDATE tickets SET status = ?, appointment_date = ?, time_period = ? WHERE id = ?',
        [status, appointment_date, time_period, ticketId]
      );
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
      }
      res.json({ success: true, message: 'Ticket updated successfully' });
    } catch (error) {
      console.error('Update ticket error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Delete a ticket
  app.delete('/api/admin/tickets/:id', async (req, res) => {
    try {
      const ticketId = req.params.id;
      const [result] = await pool.query('DELETE FROM tickets WHERE id = ?', [ticketId]);
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
      }
      res.json({ success: true, message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error('Delete ticket error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Ensure tickets table has the required columns for the frontend
  const ensureTicketColumns = async () => {
    try {
      await pool.query('ALTER TABLE tickets ADD COLUMN appointment_date DATE');
    } catch (e) { /* Ignore if exists */ }
    try {
      await pool.query('ALTER TABLE tickets ADD COLUMN time_period VARCHAR(50)');
    } catch (e) { /* Ignore if exists */ }
  };
  ensureTicketColumns();

  app.post('/api/tickets', async (req, res) => {
      try {
        const { userId, service, date, time } = req.body;
        
        // 'service' is now coming from the frontend as the actual queue ID (1, 2, or 3)
        // We parse it into an integer just to be safe before inserting it into the database.
        const queueId = parseInt(service, 10);

        const ticketNumber = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;

        const [result] = await pool.query(
          'INSERT INTO tickets (queue_id, user_id, ticket_number, appointment_date, time_period) VALUES (?, ?, ?, ?, ?)',
          [queueId, userId, ticketNumber, date, time]
        );

        res.json({ success: true, ticketId: (result as any).insertId, ticketNumber });
      } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ success: false, message: 'Database error' });
      }
    });

  app.get('/api/tickets/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const [rows] = await pool.query(`
        SELECT t.*, q.name as queue_name 
        FROM tickets t 
        JOIN queues q ON t.queue_id = q.id 
        WHERE t.user_id = ? 
        ORDER BY t.joined_at DESC
      `, [userId]);
      
      res.json({ success: true, tickets: rows });
    } catch (error) {
      console.error('Fetch tickets error:', error);
      res.status(500).json({ success: false, message: 'Database error' });
    }
  });

  // Cancel a ticket
  app.put('/api/tickets/:id/cancel', async (req, res) => {
    try {
      const ticketId = req.params.id;
      const { userId } = req.body; // Verify user ID for basic security
      
      const [result] = await pool.query(
        'UPDATE tickets SET status = "cancelled" WHERE id = ? AND user_id = ?',
        [ticketId, userId]
      );
      
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found or unauthorized' });
      }

      res.json({ success: true, message: 'Ticket cancelled' });
    } catch (error) {
      console.error('Cancel error:', error);
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