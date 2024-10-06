import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";

const cartRouter = express.Router();

// Define your cart routes
cartRouter.post("/add", addToCart);        
cartRouter.post("/remove", removeFromCart); 
cartRouter.get("/getCart", getCart); // Change to /getCart

// Export the router
export default cartRouter;
