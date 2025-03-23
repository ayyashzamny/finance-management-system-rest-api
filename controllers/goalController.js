const goalService = require("../services/goalService");

exports.createGoal = async (req, res) => {
  try {
    const response = await goalService.createGoal(req.user.id, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const response = await goalService.getGoals(req.user.id);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const response = await goalService.getGoalById(req.user.id, req.params.goalId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const response = await goalService.updateGoal(req.user.id, req.params.goalId, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const response = await goalService.deleteGoal(req.user.id, req.params.goalId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
