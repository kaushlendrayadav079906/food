import mongoose from "mongoose";

// Define the schema for an order
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID must be a string and is required
    items: [
        {
            productId: { type: String, required: true }, // Each item must have a productId
            quantity: { type: Number, required: true }, // Each item must have a quantity
            price: { type: Number, required: true }, // Each item must have a price
        }
    ],
    amount: { type: Number, required: true }, // The total amount must be a number and is required
    address: { 
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true }
    },
    status: { type: String, default: "Food Processing" }, // Default status of the order
    createdAt: { type: Date, default: Date.now }, // Automatically sets the creation date
});

// Create the model from the schema
const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
