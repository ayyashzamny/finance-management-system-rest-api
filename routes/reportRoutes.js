const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Route to get financial report
router.get("/financial", reportController.getFinancialReport);

module.exports = router;
