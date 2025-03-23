const Budget = require("../models/Budget");

exports.setBudget = async (userId, { category, amount, notificationThreshold }) => {
  let budget = await Budget.findOne({ userId, category });

  if (budget) {
    budget.amount = amount;
    budget.notificationThreshold = notificationThreshold || budget.notificationThreshold;
  } else {
    budget = new Budget({ userId, category, amount, notificationThreshold });
  }

  await budget.save();
  return { status: 200, data: { message: "Budget saved successfully", budget } };
};

exports.getBudgets = async (userId) => {
  const budgets = await Budget.find({ userId });
  if (!budgets.length) return { status: 404, data: { message: "No budgets found" } };
  return { status: 200, data: budgets };
};

exports.getBudgetByCategory = async (userId, category) => {
  const budget = await Budget.findOne({ userId, category });
  if (!budget) return { status: 404, data: { message: `No budget found for category: ${category}` } };
  return { status: 200, data: budget };
};

exports.deleteBudget = async (userId, category) => {
  const deletedBudget = await Budget.findOneAndDelete({ userId, category });
  if (!deletedBudget) return { status: 404, data: { message: `No budget found for category: ${category}` } };
  return { status: 200, data: { message: "Budget deleted successfully" } };
};

exports.updateBudgetAmount = async (userId, category, amount) => {
  let budget = await Budget.findOne({ userId, category });
  if (!budget) return { status: 404, data: { message: `No budget found for category: ${category}` } };

  budget.amount = amount;
  await budget.save();
  return { status: 200, data: { message: "Budget updated successfully", budget } };
};

exports.trackSpending = async (userId, month) => {
  const budgets = await Budget.find({ userId });
  if (!budgets.length) return { status: 404, data: { message: "No budgets set" } };

  for (let budget of budgets) {
    let alertMessage = "✅ Within Budget";
    if (budget.spent >= budget.amount) {
      alertMessage = `🚨 Budget Exceeded for ${budget.category}!`;
    } else if (budget.spent >= (budget.amount * budget.notificationThreshold) / 100) {
      alertMessage = `⚠️ Nearing Budget Limit for ${budget.category}`;
    }
    budget.alert = alertMessage;
  }

  return { status: 200, data: budgets };
};
