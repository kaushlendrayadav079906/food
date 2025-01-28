import express from 'express';
import {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
} from '../controllers/orderController.js'; // Ensure this path is correct

const orderRouter = express.Router();

// Define the middleware
const foodMiddleware = (req, res, next) => {
    // Middleware logic here
    console.log('Food middleware is running');
    next();
};

// Define Routes
orderRouter.post('/place', foodMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', userOrders);
orderRouter.get('/list', listOrders);

export default orderRouter;
