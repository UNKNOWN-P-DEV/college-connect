import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { initializeFirebase } from './config/firebase.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase
try {
  await initializeFirebase();
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('🔥 Firebase initialization error:', error);
  // Don't crash the server, just log the error
}

// Connect to Database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'College Connect API is running!' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);

app.use('/api/users', (req, res) => {
  res.json({ message: 'User routes coming soon' });
});

app.use('/api/colleges', (req, res) => {
  res.json({ message: 'College routes coming soon' });
});

app.use('/api/brokers', (req, res) => {
  res.json({ message: 'Broker routes coming soon' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 