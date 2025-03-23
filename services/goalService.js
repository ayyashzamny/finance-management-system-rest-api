const Goal = require("../models/Goal");

exports.createGoal = async (userId, goalData) => {
  const goal = new Goal({ userId, ...goalData });
  await goal.save();
  return { status: 201, data: goal };
};

exports.getGoals = async (userId) => {
  const goals = await Goal.find({ userId });
  return { status: 200, data: goals };
};

exports.getGoalById = async (userId, goalId) => {
  const goal = await Goal.findOne({ userId, _id: goalId });
  if (!goal) return { status: 404, data: { message: "Goal not found" } };
  return { status: 200, data: goal };
};

exports.updateGoal = async (userId, goalId, goalData) => {
  const goal = await Goal.findOneAndUpdate({ userId, _id: goalId }, goalData, { new: true });
  if (!goal) return { status: 404, data: { message: "Goal not found" } };
  return { status: 200, data: goal };
};

exports.deleteGoal = async (userId, goalId) => {
  const goal = await Goal.findOneAndDelete({ userId, _id: goalId });
  if (!goal) return { status: 404, data: { message: "Goal not found" } };
  return { status: 200, data: { message: "Goal deleted successfully" } };
};
