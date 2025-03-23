const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalIncome: { type: Number, default: 0 },
  totalExpenses: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
