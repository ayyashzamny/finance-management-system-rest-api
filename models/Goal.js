const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  savedAmount: { type: Number, default: 0 },
  dueDate: { type: Date, required: true },
  autoSavePercentage: { type: Number, default: 0 }, // Auto-save from income
}, { timestamps: true });

module.exports = mongoose.model("Goal", goalSchema);
