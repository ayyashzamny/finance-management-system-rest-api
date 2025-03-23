const budgetService = require("../services/budgetService");

// ✅ Set or Update Budget
exports.setBudget = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const response = await budgetService.setBudget(userId, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get All Budgets for a User
exports.getBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await budgetService.getBudgets(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get Budget by Category
exports.getBudgetByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await budgetService.getBudgetByCategory(userId, req.params.category);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete Budget
exports.deleteBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await budgetService.deleteBudget(userId, req.params.category);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update Budget Amount
exports.updateBudgetAmount = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await budgetService.updateBudgetAmount(userId, req.params.category, req.body.amount);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Track Spending & Get Alerts
exports.trackSpending = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await budgetService.trackSpending(userId, req.params.month);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
