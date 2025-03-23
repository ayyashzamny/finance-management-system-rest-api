const Transaction = require("../models/Transaction");

exports.getFinancialReport = async (userId, filters) => {
  try {
    const query = { userId };

    // Apply filters for date range
    if (filters.startDate && filters.endDate) {
      query.date = {
        $gte: new Date(filters.startDate),
        $lte: new Date(filters.endDate),
      };
    }

    // Apply category filter
    if (filters.category) {
      query.category = filters.category;
    }

    // Apply tag filters (if provided)
    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    // Fetch transactions matching the filters
    const transactions = await Transaction.find(query);

    // Calculate total income & expenses
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    // Generate spending trends grouped by month
    const monthlyTrends = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          totalIncome: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          totalExpense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return {
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense,
        transactions,
        monthlyTrends,
      },
    };
  } catch (error) {
    console.error("Error generating financial report:", error);
    return { success: false, message: "Error generating report" };
  }
};
