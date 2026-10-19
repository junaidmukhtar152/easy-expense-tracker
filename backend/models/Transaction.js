
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [2, "Description must contain at least 2 characters"]
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0.01, "Amount must be greater than zero"]
  },

  type: {
    type: String,
    enum: {
      values: ["income", "expense"],
      message: "Type must be income or expense"
    },
    required: [true, "Transaction type is required"]
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
