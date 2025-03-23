const request = require("supertest");
const app = require("../server"); // Import the Express app
const financialReportController = require("../controllers/reportController"); // Import the controller
const financialReportService = require("../services/reportService"); // Import the service

// Mock the financialReportService module
jest.mock("../services/reportService");

describe("Financial Report Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  // Mock user ID for testing
  const mockUserId = "mockUserId123";

  // Mock request object with user ID and query parameters
  const mockRequest = (query = {}) => ({
    user: { id: mockUserId },
    query,
  });

  // Mock response object
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("GET /api/financial-report", () => {
    it("should return a financial report with filters", async () => {
      // Mock the getFinancialReport function to return a success response
      financialReportService.getFinancialReport.mockResolvedValue({
        success: true,
        data: {
          totalIncome: 5000,
          totalExpenses: 3000,
          netSavings: 2000,
        },
      });

      const req = mockRequest({
        startDate: "2023-01-01",
        endDate: "2023-12-31",
        category: "Food",
        tags: "groceries,dining",
      });
      const res = mockResponse();

      await financialReportController.getFinancialReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalIncome: 5000,
        totalExpenses: 3000,
        netSavings: 2000,
      });
      expect(financialReportService.getFinancialReport).toHaveBeenCalledWith(
        mockUserId,
        {
          startDate: "2023-01-01",
          endDate: "2023-12-31",
          category: "Food",
          tags: ["groceries", "dining"],
        }
      );
    });

    it("should return 400 if the service returns an error", async () => {
      // Mock the getFinancialReport function to return an error response
      financialReportService.getFinancialReport.mockResolvedValue({
        success: false,
        message: "Invalid date range",
      });

      const req = mockRequest({
        startDate: "2023-12-31",
        endDate: "2023-01-01", // Invalid date range
      });
      const res = mockResponse();

      await financialReportController.getFinancialReport(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid date range" });
    });

    it("should return 500 if an internal server error occurs", async () => {
      // Mock the getFinancialReport function to throw an error
      financialReportService.getFinancialReport.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({
        startDate: "2023-01-01",
        endDate: "2023-12-31",
      });
      const res = mockResponse();

      await financialReportController.getFinancialReport(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
      });
    });

    it("should handle missing filters gracefully", async () => {
      // Mock the getFinancialReport function to return a success response
      financialReportService.getFinancialReport.mockResolvedValue({
        success: true,
        data: {
          totalIncome: 5000,
          totalExpenses: 3000,
          netSavings: 2000,
        },
      });

      const req = mockRequest(); // No filters provided
      const res = mockResponse();

      await financialReportController.getFinancialReport(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalIncome: 5000,
        totalExpenses: 3000,
        netSavings: 2000,
      });
      expect(financialReportService.getFinancialReport).toHaveBeenCalledWith(
        mockUserId,
        {
          startDate: undefined,
          endDate: undefined,
          category: undefined,
          tags: [],
        }
      );
    });
  });
});
