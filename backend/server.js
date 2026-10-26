const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// Allow frontend requests
app.use(cors());

// Read JSON data from requests
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Easy Expense Tracker!");
});

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Transaction routes
app.use("/api/transactions", transactionRoutes);

// Export the Express app for Vercel
module.exports = app;