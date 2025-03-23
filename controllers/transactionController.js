const transactionService = require("../services/transactionService");

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await transactionService.getUserTransactions(req.user.id);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const { type, amount, category, tags, recurring } = req.body;

        const transaction = await transactionService.createTransaction({
            userId: req.user.id,
            type,
            amount,
            category,
            tags,
            recurring
        });

        res.status(201).json({ message: "Transaction created", transaction });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.updateTransaction(req.params.id, req.body);

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json({ message: "Transaction updated", transaction });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransaction(req.params.id);

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.filterTransactionsByTag = async (req, res) => {
    try {
        const { tag } = req.query;

        if (!tag) {
            return res.status(400).json({ error: "Tag is required for filtering" });
        }

        const transactions = await transactionService.filterTransactionsByTag(req.user.id, tag);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.getTransactionSummary = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied" });
        }

        const summary = await transactionService.getTransactionSummary();
        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
