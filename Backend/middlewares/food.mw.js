const bcrypt = require('bcryptjs');
const user_model = require('../models/food.model');
const jwt = require('jsonwebtoken');

const secret = 'yourSecretKey'; // Replace with your actual secret key

// Middleware to verify signup body
exports.verifySignUpBody = async (req, res, next) => {
    try {
        // Check for required fields
        const { name, email } = req.body; // Removed password
        if (!name || !email) {
            return res.status(400).send({
                message: "Missing required fields: name or email",
            });
        }

        // Check if a user with the same name already exists
        const existingUser = await user_model.findOne({ name });
        if (existingUser) {
            return res.status(400).send({
                message: "User with the same name already exists",
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Error while validating signup data:", err);
        res.status(500).send({ message: "Error while validating signup data" });
    }
};

// Signup function
exports.signup = async (req, res) => {
  const { name, description, price } = req.body; // Removed password

  // Validate required fields already handled by middleware
  try {
    // Create user without password
    const newUser = await user_model.create({
      name,
      description,
      price
    });

    return res.status(201).json({ message: `User ${newUser.name} created successfully` });
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred during signup' });
  }
};

// Signin function
exports.signin = async (req, res) => {
  const { name } = req.body; // Removed password

  // Validate required fields
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    // Check if user exists
    const user = await user_model.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate token (you might want to include some identification info here)
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: 120 });

    // Return user details along with token
    return res.status(200).json({
      token,
      name: user.name,
      description: user.description,
      price: user.price
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred during signin' });
  }
};
