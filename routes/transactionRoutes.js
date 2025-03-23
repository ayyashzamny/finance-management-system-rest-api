const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Get all transactions
router.get("/", transactionController.getTransactions);

// Create a transaction
router.post("/", transactionController.createTransaction);

// Update a transaction
router.put("/:id", transactionController.updateTransaction);

// Delete a transaction
router.delete("/:id", transactionController.deleteTransaction);

// Filter transactions by tag
router.get("/filter", transactionController.filterTransactionsByTag);

// Route: Only admin can view transaction summary
router.get("/summary", authenticate, authorize(["admin"]), transactionController.getTransactionSummary);

module.exports = router;
