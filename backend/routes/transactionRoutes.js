
const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// POST: Create a new transaction
router.post("/", async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Fetch all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 // GET: Fetch one transaction by ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 // DELETE: Remove one transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction: transaction
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 // PUT: Update a transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: transaction
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;
