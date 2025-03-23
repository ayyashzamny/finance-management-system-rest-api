const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 }, // Track spending
  notificationThreshold: { type: Number, default: 80 }, // Alert at 80% usage
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);
