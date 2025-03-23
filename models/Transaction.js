const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }], // Custom labels (e.g., #vacation, #utilities)
  date: { type: Date, default: Date.now },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: null },
    endDate: { type: Date, default: null },
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
