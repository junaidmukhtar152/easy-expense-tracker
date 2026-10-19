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

// Transaction routes
app.use("/api/transactions", transactionRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/easy_expense_tracker")
  .then(() => {
    console.log("MongoDB connected successfully✔️");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
