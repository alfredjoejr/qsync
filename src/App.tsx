/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, QrCode, Bell, User, X, CheckCircle2, ArrowRight, Plus, Ticket, History, ShieldAlert, Users, Trash2, Edit, Layers } from 'lucide-react';
import bcrypt from 'bcryptjs';

const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a1a]">
    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/40 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/40 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
    <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-500/30 blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '7s' }} />
    <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-rose-500/30 blur-[100px] mix-blend-screen animate-pulse" style={{ animationDuration: '9s' }} />
  </div>
);

const Navbar = ({ onAuth, isLoggedIn, userEmail, onLogout, currentView, onViewChange }: { onAuth: () => void, isLoggedIn: boolean, userEmail?: string, onLogout: () => void, currentView: string, onViewChange: (view: string) => void }) => (
  <motion.nav 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
  >
    <div className="container mx-auto">
      <div className="glass-panel rounded-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">QSync</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {isLoggedIn && (
            <button onClick={() => onViewChange('dashboard')} className={`hover:text-white transition-colors ${currentView === 'dashboard' ? 'text-white font-semibold' : ''}`}></button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium hidden md:block">{userEmail || 'user@example.com'}</span>
              </div>
              <button onClick={onLogout} className="text-sm text-white/60 hover:text-white transition-colors">
                Log out
              </button>
            </div>
          ) : (
            <button onClick={onAuth} className="glass-button px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Log In / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  </motion.nav>
);

const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-4 md:mt-8">
    <motion.h1 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6"
    >
      Wait less. <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400">
        Live more.
      </span>
    </motion.h1>
    
    <motion.p 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed"
    >
      Book your spot, get a digital QR ticket, and receive real-time notifications when it's your turn. The elegant way to manage your time.
    </motion.p>
    
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center gap-4"
    >
      <button onClick={onGetStarted} className="px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
        Book Appointment <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  </div>
);

const Features = () => {
  const steps = [
    {
      icon: <Calendar className="w-6 h-6 text-indigo-400" />,
      title: "Select a Time",
      description: "Choose your preferred service, date, and morning or evening slot."
    },
    {
      icon: <QrCode className="w-6 h-6 text-fuchsia-400" />,
      title: "Get Your QR Ticket",
      description: "Receive an instant digital ticket with your queue number and QR code."
    },
    {
      icon: <Bell className="w-6 h-6 text-rose-400" />,
      title: "Smart Notifications",
      description: "Get reminded when you're top #5 in the queue. No more waiting in crowded rooms."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      title: "Scan & Go",
      description: "Simply scan your QR code at the location to confirm your arrival."
    }
  ];

  return (
    <motion.div 
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      id="how-it-works"
    >
      {steps.map((step, index) => (
        <div key={index} className="glass-panel rounded-3xl p-6 hover:bg-white/10 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
            {step.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
          <p className="text-white/60 leading-relaxed text-sm">
            {step.description}
          </p>
        </div>
      ))}
    </motion.div>
  );
};

const AuthModal = ({ type, onClose, onSwitch, onSuccess }: { type: 'login' | 'signup', onClose: () => void, onSwitch: () => void, onSuccess: (user: { id: number, email: string, role?: string }) => void }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (type === 'signup') {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);
        
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, passwordHash })
        });
        
        const data = await res.json();
        if (data.success) {
          onSuccess({ id: data.userId, email, role: 'customer' });
        } else {
          setError(data.message || 'Signup failed');
        }
      } else {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        
        const data = await res.json();
        if (data.success) {
          const isValid = bcrypt.compareSync(password, data.passwordHash);
          if (isValid) {
            onSuccess({ id: data.user.id, email: data.user.email, role: data.user.role });
          } else {
            setError('Invalid credentials');
          }
        } else {
          setError(data.message || 'Invalid credentials');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-3xl font-bold mb-2">
          {type === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-white/60 mb-8">
          {type === 'login' ? 'Enter your details to access your queue.' : 'Sign up to start booking appointments.'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" placeholder="John Doe" required />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/80 ml-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" placeholder="you@example.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/80 ml-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" placeholder="••••••••" required />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
          
          <button disabled={isLoading} className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-6 hover:bg-white/90 transition-colors disabled:opacity-50">
            {isLoading ? 'Please wait...' : (type === 'login' ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-white/60">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={onSwitch} className="text-white font-medium hover:underline">
            {type === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// ADMIN COMPONENTS
// ==========================================

const AdminLogin = ({ onSuccess }: { onSuccess: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();

        if (data.success) {
          const isValid = bcrypt.compareSync(password, data.passwordHash);
          if (isValid) {
            onSuccess(data.user);
          } else {
            setError('Invalid credentials.');
          }
        } else {
          setError(data.message || 'Invalid credentials.');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <Background />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-panel w-full max-w-md rounded-3xl p-8 border-t border-l border-white/20 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.4)]">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2 text-center">Admin Portal</h2>
        <p className="text-white/60 mb-8 text-center text-sm">Secure access for authorized personnel only.</p>

        <form className="space-y-4" onSubmit={handleAdminLogin}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/80 ml-1">Administrator Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm focus:border-rose-400" placeholder="admin@qsync.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-white/80 ml-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm focus:border-rose-400" placeholder="••••••••" required />
          </div>

          {error && <p className="text-rose-400 text-sm text-center mt-2 bg-rose-500/10 py-2 rounded-lg border border-rose-500/20">{error}</p>}

          <button disabled={isLoading} className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold mt-6 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all disabled:opacity-50">
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button onClick={() => window.location.href = '/'} className="text-sm text-white/40 hover:text-white/80 transition-colors">
              Return to Public Site
            </button>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard = ({ userEmail, onLogout }: { userEmail?: string, onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [usersList, setUsersList] = useState<any[]>([]);
  const [ticketsList, setTicketsList] = useState<any[]>([]);
  const [queuesList, setQueuesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modals State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [showAddQueueModal, setShowAddQueueModal] = useState(false);
  const [showEditQueueModal, setShowEditQueueModal] = useState(false);
  
  // Add User State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [addError, setAddError] = useState('');

  // Queue State
  const [newQueueName, setNewQueueName] = useState('');
  const [newQueueDesc, setNewQueueDesc] = useState('');
  const [newQueueActive, setNewQueueActive] = useState(true);
  const [editQueueData, setEditQueueData] = useState<any>(null);

  // Edit Ticket State
  const [editTicketData, setEditTicketData] = useState<any>(null);

  useEffect(() => {
    // When on a specific tab, fetch only what is needed for that tab
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'tickets') fetchTickets();
    if (activeTab === 'queues') fetchAdminQueues();
    
    // When on the overview tab, fetch EVERYTHING so the stats are accurate immediately
    if (activeTab === 'overview') {
      fetchAdminQueues();
      fetchUsers();
      fetchTickets();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (data.success) setUsersList(data.users);
    } catch (err) { console.error('Failed to fetch users', err); }
  };

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/admin/tickets');
      const data = await res.json();
      if (data.success) setTicketsList(data.tickets);
    } catch (err) { console.error('Failed to fetch tickets', err); }
  };

  const fetchAdminQueues = async () => {
    try {
      const res = await fetch('/api/admin/queues');
      const data = await res.json();
      if (data.success) setQueuesList(data.queues);
    } catch (err) { console.error('Failed to fetch queues', err); }
  };

  // --- Delete Handlers ---
  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user? This will also delete all their tickets.')) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchUsers();
      else alert('Failed to delete user: ' + data.message);
    } catch (err) { console.error('Delete error', err); }
  };

  const handleDeleteTicket = async (ticketId: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this ticket?')) return;
    try {
      const res = await fetch(`/api/admin/tickets/${ticketId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchTickets();
      else alert('Failed to delete ticket: ' + data.message);
    } catch (err) { console.error('Delete error', err); }
  };

  const handleDeleteQueue = async (queueId: number) => {
    if (!window.confirm('Are you sure you want to delete this queue? ALL associated tickets will also be deleted!')) return;
    try {
      const res = await fetch(`/api/admin/queues/${queueId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchAdminQueues();
      else alert('Failed to delete queue: ' + data.message);
    } catch (err) { console.error('Delete error', err); }
  };

  // --- Submit Handlers ---
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(''); setIsLoading(true);
    try {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(newUserPassword, salt);
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: newUserName, email: newUserEmail, passwordHash })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false); setNewUserName(''); setNewUserEmail(''); setNewUserPassword(''); fetchUsers();
      } else { setAddError(data.message || 'Failed to add user'); }
    } catch (err) { setAddError('An error occurred.'); } 
    finally { setIsLoading(false); }
  };

  const handleUpdateTicket = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/tickets/${editTicketData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editTicketData.status, appointment_date: editTicketData.appointment_date, time_period: editTicketData.time_period })
      });
      const data = await res.json();
      if (data.success) { setShowEditTicketModal(false); fetchTickets(); } 
      else { alert(data.message || 'Failed to update ticket'); }
    } catch (err) { console.error('Update error', err); } 
    finally { setIsLoading(false); }
  };

  const handleAddQueue = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true);
    try {
      const res = await fetch('/api/admin/queues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newQueueName, description: newQueueDesc, is_active: newQueueActive })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddQueueModal(false); setNewQueueName(''); setNewQueueDesc(''); setNewQueueActive(true); fetchAdminQueues();
      } else { alert(data.message || 'Failed to add queue'); }
    } catch (err) { console.error('Add queue error', err); } 
    finally { setIsLoading(false); }
  };

  const handleUpdateQueue = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/queues/${editQueueData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editQueueData.name, description: editQueueData.description, is_active: editQueueData.is_active })
      });
      const data = await res.json();
      if (data.success) { setShowEditQueueModal(false); fetchAdminQueues(); } 
      else { alert(data.message || 'Failed to update queue'); }
    } catch (err) { console.error('Update queue error', err); } 
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <Background />
      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        
        {/* Admin Header */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-white/60 text-sm">Manage queues, tickets, and staff</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-xs text-rose-400">System Administrator</p>
            </div>
            <button onClick={onLogout} className="glass-button px-6 py-2.5 rounded-xl text-sm font-medium border-rose-500/30 hover:bg-rose-500/20 text-rose-100 transition-all">
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Admin Sidebar */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <button onClick={() => setActiveTab('overview')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Clock className="w-5 h-5" /> Overview</div>
            </button>
            <button onClick={() => setActiveTab('queues')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'queues' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Layers className="w-5 h-5" /> Manage Queues</div>
            </button>
            <button onClick={() => setActiveTab('users')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Users className="w-5 h-5" /> Manage Users</div>
            </button>
            <button onClick={() => setActiveTab('tickets')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'tickets' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
              <div className="flex items-center gap-3"><QrCode className="w-5 h-5" /> Manage Tickets</div>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 glass-panel p-8 rounded-3xl min-h-[500px] overflow-hidden">
                       {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">System Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                     <div className="text-white/50 text-sm mb-1">Total Queues</div>
                     <div className="text-4xl font-bold">{queuesList.length}</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                     <div className="text-white/50 text-sm mb-1">System Status</div>
                     <div className="text-2xl font-bold text-emerald-400 mt-2 flex items-center gap-2"><CheckCircle2 className="w-6 h-6"/> Online</div>
                  </div>
                </div>
              </div>
            )}
 
            {activeTab === 'overview' && (
              <div className="flex flex-col h-full min-h-[450px]">
                <h2 className="text-2xl font-bold mb-6">System Overview</h2>
                
                {/* Top Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
                     <div className="text-white/50 text-sm mb-2 flex items-center gap-2"><Layers className="w-4 h-4 text-indigo-400"/> Total Queues</div>
                     <div className="text-3xl font-bold">{queuesList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
                     <div className="text-white/50 text-sm mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-fuchsia-400"/> Total Users</div>
                     <div className="text-3xl font-bold">{usersList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
                     <div className="text-white/50 text-sm mb-2 flex items-center gap-2"><QrCode className="w-4 h-4 text-rose-400"/> Total Tickets</div>
                     <div className="text-3xl font-bold">{ticketsList.length}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-colors">
                     <div className="text-white/50 text-sm mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> System Status</div>
                     <div className="text-xl font-bold text-emerald-400 mt-1">Online</div>
                  </div>
                </div>

                {/* Graph Section */}
                <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col mt-auto">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg font-semibold">Weekly Activity Trend</h3>
                      <p className="text-xs text-white/50 mt-1">Simulated ticket generation over the last 7 days</p>
                    </div>
                    <div className="text-xs text-fuchsia-400 font-medium bg-fuchsia-500/10 px-3 py-1.5 rounded-lg border border-fuchsia-500/20">
                      +12% vs last week
                    </div>
                  </div>
                  
                  {/* Tailwind CSS Bar Chart */}
                  <div className="flex-1 flex items-end justify-between gap-2 h-48 border-b border-white/10 pb-2">
                    {/* Simulated data percentages for heights */}
                    {[45, 60, 35, 80, 55, 90, 65].map((val, i) => (
                      <div key={i} className="flex flex-col items-center gap-3 w-full h-full group">
                        <div className="w-full relative flex justify-center items-end h-full">
                           {/* Hover Tooltip */}
                           <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold py-1 px-2 rounded shadow-lg pointer-events-none z-10">
                             {val} Tkt
                           </div>
                           
                           {/* The Bar */}
                           <motion.div 
                             initial={{ height: 0 }}
                             animate={{ height: `${val}%` }}
                             transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                             className="w-full max-w-[48px] bg-gradient-to-t from-indigo-500/40 to-fuchsia-500/80 rounded-t-md transition-all duration-300 group-hover:from-indigo-400 group-hover:to-fuchsia-400 group-hover:shadow-[0_0_15px_rgba(217,70,239,0.5)]" 
                           ></motion.div>
                        </div>
                        {/* X-Axis Labels */}
                        <span className="text-xs text-white/40 font-medium group-hover:text-white/80 transition-colors">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'queues' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Service Queues</h2>
                  <button onClick={() => setShowAddQueueModal(true)} className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors">
                    <Plus className="w-4 h-4" /> Add Queue
                  </button>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 font-medium text-white/80">ID</th>
                        <th className="px-6 py-4 font-medium text-white/80">Name</th>
                        <th className="px-6 py-4 font-medium text-white/80">Description</th>
                        <th className="px-6 py-4 font-medium text-white/80">Status</th>
                        <th className="px-6 py-4 font-medium text-white/80 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {queuesList.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-8 text-center text-white/50">No queues found.</td></tr>
                      ) : (
                        queuesList.map((q) => (
                          <tr key={q.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 text-white/60">#{q.id}</td>
                            <td className="px-6 py-4 font-bold text-indigo-300">{q.name}</td>
                            <td className="px-6 py-4 text-white/60 max-w-[200px] truncate">{q.description || 'No description'}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${q.is_active ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                {q.is_active ? 'ACTIVE' : 'INACTIVE'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => { setEditQueueData(q); setShowEditQueueModal(true); }} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors inline-flex mr-2">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteQueue(q.id)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors inline-flex">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Existing Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors">
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 font-medium text-white/80">ID</th>
                        <th className="px-6 py-4 font-medium text-white/80">Name</th>
                        <th className="px-6 py-4 font-medium text-white/80">Email</th>
                        <th className="px-6 py-4 font-medium text-white/80 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {usersList.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white/60">#{user.id}</td>
                          <td className="px-6 py-4 font-medium">{user.full_name}</td>
                          <td className="px-6 py-4 text-white/80">{user.email}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors inline-flex">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Existing Tickets Tab */}
            {activeTab === 'tickets' && (
               // ... existing tickets table content ...
               <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Tickets / QR Management</h2>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 font-medium text-white/80">Ticket #</th>
                        <th className="px-6 py-4 font-medium text-white/80">User</th>
                        <th className="px-6 py-4 font-medium text-white/80">Service</th>
                        <th className="px-6 py-4 font-medium text-white/80">Status</th>
                        <th className="px-6 py-4 font-medium text-white/80 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {ticketsList.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-bold text-fuchsia-400">{ticket.ticket_number}</td>
                            <td className="px-6 py-4">
                              <div className="font-medium">{ticket.user_name}</div>
                            </td>
                            <td className="px-6 py-4 text-white/80">{ticket.queue_name}</td>
                            <td className="px-6 py-4">
                               <span className={`px-2 py-1 rounded-full text-xs font-medium border ${ticket.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-white/10 border-white/20 text-white/80'}`}>{ticket.status.toUpperCase()}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => {
                                const formattedDate = ticket.appointment_date ? new Date(ticket.appointment_date).toISOString().split('T')[0] : '';
                                setEditTicketData({ ...ticket, appointment_date: formattedDate });
                                setShowEditTicketModal(true);
                              }} className="p-2 text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors inline-flex mr-2">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteTicket(ticket.id)} className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors inline-flex">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- QUEUE MODALS --- */}
      <AnimatePresence>
        {/* ADD QUEUE MODAL */}
        {showAddQueueModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddQueueModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl">
              <button onClick={() => setShowAddQueueModal(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-bold mb-6">Add New Queue</h2>
              <form className="space-y-4" onSubmit={handleAddQueue}>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Queue Name</label><input type="text" value={newQueueName} onChange={e => setNewQueueName(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" placeholder="e.g. Consular Services" required /></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Description</label><textarea value={newQueueDesc} onChange={e => setNewQueueDesc(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" placeholder="Details about this queue..." rows={3} /></div>
                <div className="flex items-center gap-3 mt-4">
                  <input type="checkbox" id="queueActive" checked={newQueueActive} onChange={e => setNewQueueActive(e.target.checked)} className="w-5 h-5 accent-indigo-500" />
                  <label htmlFor="queueActive" className="text-sm font-medium text-white/80 cursor-pointer">Queue is Active</label>
                </div>
                <button disabled={isLoading} className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-6 hover:bg-white/90 transition-colors disabled:opacity-50">{isLoading ? 'Saving...' : 'Create Queue'}</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT QUEUE MODAL */}
        {showEditQueueModal && editQueueData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditQueueModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl">
              <button onClick={() => setShowEditQueueModal(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-bold mb-6">Edit Queue</h2>
              <form className="space-y-4" onSubmit={handleUpdateQueue}>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Queue Name</label><input type="text" value={editQueueData.name} onChange={e => setEditQueueData({...editQueueData, name: e.target.value})} className="w-full glass-input rounded-xl px-4 py-3 text-sm" required /></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Description</label><textarea value={editQueueData.description || ''} onChange={e => setEditQueueData({...editQueueData, description: e.target.value})} className="w-full glass-input rounded-xl px-4 py-3 text-sm" rows={3} /></div>
                <div className="flex items-center gap-3 mt-4">
                  <input type="checkbox" id="editQueueActive" checked={!!editQueueData.is_active} onChange={e => setEditQueueData({...editQueueData, is_active: e.target.checked})} className="w-5 h-5 accent-indigo-500" />
                  <label htmlFor="editQueueActive" className="text-sm font-medium text-white/80 cursor-pointer">Queue is Active</label>
                </div>
                <button disabled={isLoading} className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-6 hover:bg-white/90 transition-colors disabled:opacity-50">{isLoading ? 'Saving...' : 'Save Changes'}</button>
              </form>
            </motion.div>
          </div>
        )}

        {/* --- EXISTING MODALS (USER / TICKET) KEEP THESE --- */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl">
              <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-bold mb-6">Add New User</h2>
              <form className="space-y-4" onSubmit={handleAddUser}>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Full Name</label><input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" required /></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Email</label><input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" required /></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Password</label><input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm" required /></div>
                {addError && <p className="text-rose-400 text-sm text-center mt-2">{addError}</p>}
                <button disabled={isLoading} className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-6 hover:bg-white/90 transition-colors disabled:opacity-50">{isLoading ? 'Creating...' : 'Create User'}</button>
              </form>
            </motion.div>
          </div>
        )}
        
        {showEditTicketModal && editTicketData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowEditTicketModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl">
              <button onClick={() => setShowEditTicketModal(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-bold mb-2">Modify Ticket</h2>
              <form className="space-y-4" onSubmit={handleUpdateTicket}>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Status</label><select value={editTicketData.status} onChange={e => setEditTicketData({...editTicketData, status: e.target.value})} className="w-full glass-input rounded-xl px-4 py-3 text-sm appearance-none bg-gray-900"><option value="waiting">Waiting</option><option value="serving">Serving</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Appointment Date</label><input type="date" value={editTicketData.appointment_date} onChange={e => setEditTicketData({...editTicketData, appointment_date: e.target.value})} className="w-full glass-input rounded-xl px-4 py-3 text-sm [color-scheme:dark]" required /></div>
                <div className="space-y-1"><label className="text-sm font-medium text-white/80 ml-1">Time Period</label><select value={editTicketData.time_period} onChange={e => setEditTicketData({...editTicketData, time_period: e.target.value})} className="w-full glass-input rounded-xl px-4 py-3 text-sm appearance-none bg-gray-900"><option value="Morning">Morning</option><option value="Evening">Evening</option></select></div>
                <button disabled={isLoading} className="w-full py-3 rounded-xl bg-white text-black font-semibold mt-6 hover:bg-white/90 transition-colors disabled:opacity-50">{isLoading ? 'Saving...' : 'Save Changes'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

// ==========================================
// USER DASHBOARD
// ==========================================

const Dashboard = ({ userId }: { userId?: number }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [booked, setBooked] = useState(false);
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [queues, setQueues] = useState<any[]>([]);
  
  // New state for the custom cancel modal
  const [cancelTicketId, setCancelTicketId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/queues')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setQueues(data.queues);
        }
      })
      .catch(err => console.error('Failed to fetch queues', err));
  }, []);

  useEffect(() => {
    if (userId && (activeTab === 'queue' || activeTab === 'history')) {
      fetch(`/api/tickets/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTickets(data.tickets);
          }
        })
        .catch(err => console.error('Failed to fetch tickets', err));
    }
  }, [userId, activeTab]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, service, date, time })
      });
      const data = await res.json();
      if (data.success) {
        setBooked(true);
      }
    } catch (error) {
      console.error('Booking failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const executeCancelTicket = async () => {
    if (!userId || !cancelTicketId) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tickets/${cancelTicketId}/cancel`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      
      if (data.success) {
        const refreshRes = await fetch(`/api/tickets/${userId}`);
        const refreshData = await refreshRes.json();
        if (refreshData.success) {
          setTickets(refreshData.tickets);
        }
      }
    } catch (error) {
      console.error('Failed to cancel ticket', error);
    } finally {
      setCancelTicketId(null);
      setIsLoading(false);
    }
  };

  const toLocalDateInput = (value: Date) => { //local time formatter
  const d = new Date(value);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
  };

  const today = toLocalDateInput(new Date());
  const oneWeek = toLocalDateInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button onClick={() => setActiveTab('new')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'new' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
            <div className="flex items-center gap-3"><Plus className="w-5 h-5" /> Book Appointment</div>
          </button>
          <button onClick={() => setActiveTab('queue')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'queue' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
            <div className="flex items-center gap-3"><Ticket className="w-5 h-5" /> My Queue</div>
          </button>
          <button onClick={() => setActiveTab('history')} className={`text-left px-4 py-3 rounded-xl transition-all ${activeTab === 'history' ? 'bg-white/10 border border-white/20 shadow-lg' : 'hover:bg-white/5 text-white/70 hover:text-white'}`}>
            <div className="flex items-center gap-3"><History className="w-5 h-5" /> History</div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          {activeTab === 'new' && (
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Book New Appointment</h2>
              {booked ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Appointment Confirmed!</h3>
                  <p className="text-white/60 mb-6">You have been added to the queue.</p>
                  <button onClick={() => { setBooked(false); setActiveTab('queue'); }} className="glass-button px-6 py-2 rounded-xl">View My Queue</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleBooking}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Select Service</label>
                    <select value={service} onChange={e => setService(e.target.value)} className="w-full glass-input rounded-xl px-4 py-3 text-sm appearance-none" required>
                      <option value="" className="bg-gray-900">Choose a service...</option>
                      {queues.map((queue) => (
                        <option key={queue.id} value={queue.id} className="bg-gray-900">
                          {queue.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Select Date</label>
                      <input 
                      type="date" 
                      value={date} 
                      min={today} //minimum date to select
                      max={oneWeek} // maximum date to select
                      className="w-full glass-input rounded-xl px-4 py-3 text-sm [color-scheme:dark]" 
                      required />                  
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Time Period</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="cursor-pointer">
                        <input type="radio" name="time" value="Morning" checked={time === 'Morning'} onChange={e => setTime(e.target.value)} className="peer sr-only" required />
                        <div className="text-center px-4 py-3 rounded-xl border border-white/10 peer-checked:bg-indigo-500/20 peer-checked:border-indigo-500/50 hover:bg-white/5 transition-all">
                          Morning (9 AM - 12 PM)
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input type="radio" name="time" value="Evening" checked={time === 'Evening'} onChange={e => setTime(e.target.value)} className="peer sr-only" required />
                        <div className="text-center px-4 py-3 rounded-xl border border-white/10 peer-checked:bg-indigo-500/20 peer-checked:border-indigo-500/50 hover:bg-white/5 transition-all">
                          Evening (2 PM - 6 PM)
                        </div>
                      </label>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl bg-white text-black font-semibold mt-4 hover:bg-white/90 transition-colors disabled:opacity-50">
                    {isLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Active Queue</h2>
              {tickets.filter(t => t.status === 'waiting' || t.status === 'serving').length === 0 ? (
                <div className="text-center py-10 text-white/60">No active tickets in your queue.</div>
              ) : (
                tickets.filter(t => t.status === 'waiting' || t.status === 'serving').map(ticket => (
                  <div key={ticket.id} className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                    <div className="flex-1 space-y-6 w-full">
                      <div className="glass-panel rounded-2xl p-6 border-indigo-500/30 bg-indigo-500/5">
                        <div className="text-indigo-400 text-sm font-medium mb-1">Current Status</div>
                        <div className="text-3xl font-bold mb-2">Status: {ticket.status}</div>
                        <p className="text-white/70 text-sm">Ticket Number: {ticket.ticket_number}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="text-white/60">Service</span>
                          <span className="font-medium">{ticket.queue_name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="text-white/60">Date</span>
                          <span className="font-medium">{ticket.appointment_date ? new Date(ticket.appointment_date).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <span className="text-white/60">Time Period</span>
                          <span className="font-medium">{ticket.time_period || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">Queue Number</span>
                          <span className="font-bold text-xl text-fuchsia-400">{ticket.ticket_number}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-64 flex flex-col items-center justify-center p-6 glass-panel rounded-2xl bg-white/5">
                      <div className="w-48 h-48 bg-white rounded-xl p-2 mb-4">
                        <div className="w-full h-full border-4 border-black flex items-center justify-center relative">
                          <div className="absolute top-2 left-2 w-8 h-8 border-4 border-black"></div>
                          <div className="absolute top-2 right-2 w-8 h-8 border-4 border-black"></div>
                          <div className="absolute bottom-2 left-2 w-8 h-8 border-4 border-black"></div>
                          <QrCode className="w-16 h-16 text-black" />
                        </div>
                      </div>
                      <p className="text-sm text-center text-white/60 mb-4">Scan at the location to confirm arrival</p>
                      
                      <button 
                        onClick={() => setCancelTicketId(ticket.id)}
                        className="w-full py-2 px-4 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" /> Cancel Appointment
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">Appointment History</h2>
              <div className="space-y-4">
                {tickets.filter(t => t.status === 'completed' || t.status === 'cancelled').length === 0 ? (
                  <div className="text-center py-10 text-white/60">No history found.</div>
                ) : (
                  tickets.filter(t => t.status === 'completed' || t.status === 'cancelled').map((ticket) => (
                    <div key={ticket.id} className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/5 transition-colors">
                      <div>
                        <h4 className="font-semibold text-lg">{ticket.queue_name}</h4>
                        <p className="text-sm text-white/60">{ticket.appointment_date ? new Date(ticket.appointment_date).toLocaleDateString() : 'N/A'} • {ticket.time_period || 'N/A'}</p>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${ticket.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        <CheckCircle2 className="w-4 h-4" /> {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Custom Cancel Confirmation Modal */}
          <AnimatePresence>
            {cancelTicketId !== null && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setCancelTicketId(null)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="glass-panel w-full max-w-sm rounded-3xl p-8 relative z-10 border-t border-l border-white/20 shadow-2xl text-center"
                >
                  <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Cancel Appointment?</h3>
                  <p className="text-white/60 mb-8 text-sm leading-relaxed">
                    Are you sure you want to cancel this appointment? This action cannot be undone.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCancelTicketId(null)}
                      className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/10 text-white transition-colors font-medium text-sm"
                    >
                      Keep It
                    </button>
                    <button 
                      onClick={executeCancelTicket}
                      disabled={isLoading}
                      className="flex-1 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white transition-colors font-medium text-sm disabled:opacity-50"
                    >
                      {isLoading ? 'Canceling...' : 'Yes, Cancel'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isAdminRoute] = useState(window.location.pathname.startsWith('/admin'));
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const [userId, setUserId] = useState<number | undefined>();
  const [userRole, setUserRole] = useState<string | undefined>();
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  const handleAuthSuccess = (user: { id: number, email: string, role?: string }) => {
    setIsLoggedIn(true);
    setUserEmail(user.email);
    setUserId(user.id);
    setUserRole(user.role);
    setIsLoginOpen(false);
    setIsSignupOpen(false);
    
    // Only alter the standard view if they are not in the admin portal
    if (!isAdminRoute) {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(undefined);
    setUserId(undefined);
    setUserRole(undefined);
    if (!isAdminRoute) {
      setCurrentView('home');
    }
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    } else {
      setIsSignupOpen(true);
    }
  };

  // Render the hidden Admin App if the path is `/admin`
  if (isAdminRoute) {
    if (isLoggedIn && userRole === 'admin') {
      return <AdminDashboard userEmail={userEmail} onLogout={handleLogout} />;
    }
    return <AdminLogin onSuccess={handleAuthSuccess} />;
  }

  // Otherwise, render the standard Customer App
  return (
    <div className="min-h-screen text-white font-sans selection:bg-white/30">
      <Background />
      <Navbar 
        onAuth={() => setIsLoginOpen(true)} 
        isLoggedIn={isLoggedIn} 
        userEmail={userEmail}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as 'home' | 'dashboard')}
      />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {currentView === 'home' ? (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <Features />
          </>
        ) : (
          <Dashboard userId={userId} />
        )}
      </main>

      <AnimatePresence>
        {isLoginOpen && <AuthModal type="login" onClose={() => setIsLoginOpen(false)} onSwitch={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} onSuccess={handleAuthSuccess} />}
        {isSignupOpen && <AuthModal type="signup" onClose={() => setIsSignupOpen(false)} onSwitch={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} onSuccess={handleAuthSuccess} />}
      </AnimatePresence>
    </div>
  );
}