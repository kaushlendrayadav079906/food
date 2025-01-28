// server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRouter.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRouter.js';
import server_config from './configs/server.config.js';
import { connectDB } from './configs/db.config.js';
import authRouter from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// CORS options
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],  // Adjust to your frontend URL
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));  // Enable CORS
app.use(express.json());  // Parse JSON requests
connectDB();  // Connect to DB

// Simple route to check if the API is working
app.get('/', (req, res) => {
    res.send('API Working');
});

// Routes
app.use('/api/auth', authRouter); // Authentication routes
app.use('/api/cart', cartRouter); // Cart routes
app.use('/api/food', foodRouter); // Food-related routes
app.use('/api/order', orderRouter); // Order-related routes

// Serve images from the uploads directory
app.use('/image', express.static('uploads'));

// Start the server
app.listen(server_config.PORT, () => {
    console.log(`Server started on port: ${server_config.PORT}`);
});
