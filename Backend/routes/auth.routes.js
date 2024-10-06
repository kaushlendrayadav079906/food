// routes/auth.routes.js
import express from "express";
import { signup, signin } from "../controllers/auth.controller.js"; // Ensure this import is correct

const router = express.Router();

// Define the routes
router.post("/signup", signup);
router.post("/signin", signin);

// Export the router as ES module
export default router;
