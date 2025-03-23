const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

// ✅ Set or Update Budget
router.post("/", budgetController.setBudget);

// ✅ Get All Budgets for a User
router.get("/", budgetController.getBudgets);

// ✅ Get Budget by Category
router.get("/:category", budgetController.getBudgetByCategory);

// ✅ Delete Budget by Category
router.delete("/:category", budgetController.deleteBudget);

// ✅ Update Budget Amount
router.put("/:category", budgetController.updateBudgetAmount);

// ✅ Track Spending & Alerts
router.get("/track/:month", budgetController.trackSpending);

module.exports = router;
