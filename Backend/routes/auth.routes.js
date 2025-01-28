// auth.routes.js
import express from 'express';
const authRouter = express.Router();

// Example: Registration route
authRouter.post('/register', (req, res) => {
    // Your logic for user registration
    res.status(200).json({ message: 'User registered successfully' });
});

// Example: Login route
authRouter.post('/login', (req, res) => {
    // Your logic for user login
    res.status(200).json({ message: 'User logged in successfully' });
});

export default authRouter;
