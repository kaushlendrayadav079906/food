import orderModel from "../models/orderModel.js";
import userModel from "../models/user.model.js"; 
import Razorpay from "razorpay";

// Initialize Razorpay with credentials from environment variables
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Function to place an order
export const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"; // URL to redirect after payment
    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // Clear the user's cart data after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create an order with Razorpay
        const razorpayOrder = await razorpay.orders.create({
            amount: req.body.amount * 100, // Amount should be in paise
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`,
            payment_capture: 1,
        });

        // Respond with order details
        res.json({
            success: true,
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            frontend_url,
        });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while placing the order.", error: error.message });
    }
};

// Function to verify an order
export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body; // Extract orderId and success from the request body
    try {
        if (success === "true") {
            // Update order to indicate payment success
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            // Delete the order if payment failed
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.error("Error verifying order:", error.message);
        res.status(500).json({ success: false, message: "An error occurred while verifying the order.", error: error.message });
    }
};

// Function to fetch user orders
export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }); // Fetch orders for the specified user
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error.message);
        res.status(500).json({ success: false, message: "Error fetching orders.", error: error.message });
    }
};

// Function to list all orders
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}); // Fetch all orders from the database
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: "Error fetching orders.", error: error.message });
    }
};
