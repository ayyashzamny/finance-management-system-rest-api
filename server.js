require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const reportRoutes = require("./routes/reportRoutes");
const goalRoutes = require("./routes/goalRoutes");
const userRoutes = require('./routes/userRoutes');
const { authenticate } = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());

// Public Routes (No Authentication Required)
app.use("/api/auth", authRoutes);

// Middleware for authentication
app.use(authenticate);

// Protected Routes (Require Authentication)
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/goals", goalRoutes);
app.use('/api/users', userRoutes);

// Connect to MongoDB (only in normal runtime, not in tests)
if (process.env.NODE_ENV !== "test") {
    connectDB();
    app.listen(5050, () => console.log("🚀 Server running on port 5050"));
}

module.exports = app; // Export app for testing
