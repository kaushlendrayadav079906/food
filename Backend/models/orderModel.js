import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    createdAt: { type: Date, default: Date.now }, // Use Date instead of Data
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
