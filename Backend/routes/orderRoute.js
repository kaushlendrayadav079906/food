import express from 'express';
import { placeOrder } from '../controllers/orderController.js'; // Ensure this path is correct

const router = express.Router();

// Define your order routes
router.post('/place-order', placeOrder); // Example route to place an order

export default router;
