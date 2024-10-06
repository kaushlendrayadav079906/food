import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js"; // Ensure this path is correct
import server_config from "./configs/server.config.js"; // Use ES module import if applicable
import { connectDB } from "./configs/db.config.js"; // Use ES module import if applicable
import authRouter from "./routes/auth.routes.js"; // Import the auth routes directly

const app = express();

// Enable CORS for multiple origins
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Database connection
connectDB(); // This connects to MongoDB and logs the connection status

// Test route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Use routes
app.use("/api/auth", authRouter); // Ensure this path is correct
app.use("/api/cart", cartRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter); // Ensure you have a leading slash

// Starting the server
app.listen(server_config.PORT, () => {
    console.log(`Server started on port: ${server_config.PORT}`);
});
