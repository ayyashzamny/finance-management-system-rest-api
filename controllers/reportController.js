const financialReportService = require("../services/reportService");

exports.getFinancialReport = async (req, res) => {
  try {
    // Extract filters from query params
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      category: req.query.category,
      // Decode tags and split them by commas
      tags: req.query.tags ? decodeURIComponent(req.query.tags).split(",") : [],
    };

    // Call the service to get the financial report
    const response = await financialReportService.getFinancialReport(req.user.id, filters);

    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }

    // Return the financial report data
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching financial report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
