import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import foodRoutes from './routes/food.js';
import orderRoutes from './routes/order.js';
import cartRoutes from './routes/cart.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Root route - displays a welcome message
app.get('/', (_req, res) => {
  res.send('🎉 MERN Eats Server is running! Visit /api/foods to see the menu.');
});

// Health check route
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Connect to DB and start server
const port = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
});

export default app; // for tests

