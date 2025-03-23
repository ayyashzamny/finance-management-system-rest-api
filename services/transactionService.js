const Transaction = require("../models/Transaction");

const createTransaction = async (data) => {
    return await Transaction.create(data);
};

const getUserTransactions = async (userId) => {
    return await Transaction.find({ userId });
};

const updateTransaction = async (id, data) => {
    return await Transaction.findByIdAndUpdate(id, data, { new: true });
};

const deleteTransaction = async (id) => {
    return await Transaction.findByIdAndDelete(id);
};

const filterTransactionsByTag = async (userId, tag) => {
    return await Transaction.find({
        userId,
        tags: { $in: [tag] } // Use $in to match tag inside the array
    });
};

const getTransactionSummary = async () => {
    try {
        const totalIncome = await Transaction.aggregate([
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalExpense = await Transaction.aggregate([
            { $match: { type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const categorySummary = await Transaction.aggregate([
            { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } }
        ]);

        return {
            totalIncome: totalIncome.length ? totalIncome[0].total : 0,
            totalExpense: totalExpense.length ? totalExpense[0].total : 0,
            categorySummary
        };
    } catch (error) {
        throw new Error("Error fetching transaction summary");
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
    updateTransaction,
    deleteTransaction,
    filterTransactionsByTag,
    getTransactionSummary
};
