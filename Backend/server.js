const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");

// Allow requests from multiple frontend origins
const allowedOrigins = ["http://localhost:5174", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB (Removed deprecated options)
mongoose.connect(db_config.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    initAdminUser();
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB:", err);
  });

// Initialize admin user if not present
async function initAdminUser() {
  try {
    let user = await user_model.findOne({ userId: "admin" });

    if (user) {
      console.log("Admin is already present");
      return;
    }

    const adminUser = await user_model.create({
      userId: "admin",
      name: "Sachin",
      email: "kaushl@getMaxListeners.com",
      password: bcrypt.hashSync("welcome", 8),
    });
    console.log("Admin created:", adminUser);
  } catch (err) {
    console.error("Error while creating admin:", err);
  }
}

// Importing routes
const authRoutes = require("./routes/auth.routes");

// Use routes
app.use("/ecomm/api/v1/auth", authRoutes);

// Start the server
app.listen(server_config.PORT, () => {
  console.log("Server started at port:", server_config.PORT);
});
