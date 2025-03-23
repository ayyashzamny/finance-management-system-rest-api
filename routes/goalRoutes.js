const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");

// ✅ Create a New Goal
router.post("/", goalController.createGoal);

// ✅ Get All Goals for a User
router.get("/", goalController.getGoals);

// ✅ Get a Single Goal by ID
router.get("/:goalId", goalController.getGoalById);

// ✅ Update a Goal
router.put("/:goalId", goalController.updateGoal);

// ✅ Delete a Goal
router.delete("/:goalId", goalController.deleteGoal);

module.exports = router;
