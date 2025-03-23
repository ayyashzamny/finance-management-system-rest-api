const request = require("supertest");
const app = require("../server"); // Import your Express app
const budgetService = require("../services/budgetService");
const budgetController = require("../controllers/budgetController");

// Mock the budgetService module
jest.mock("../services/budgetService");

describe("Budget Controller", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Mock user ID for testing
  const mockUserId = "mockUserId123";

  // Mock request object with user ID
  const mockRequest = (body = {}, params = {}) => ({
    user: { id: mockUserId },
    body,
    params,
  });

  // Mock response object
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("POST /api/budget/set", () => {
    it("should set or update a budget and return success", async () => {
      // Mock the setBudget function to return a success response
      budgetService.setBudget.mockResolvedValue({
        status: 200,
        data: { message: "Budget set successfully" },
      });

      const req = mockRequest({ category: "Food", amount: 500 });
      const res = mockResponse();

      await budgetController.setBudget(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Budget set successfully",
      });
      expect(budgetService.setBudget).toHaveBeenCalledWith(mockUserId, {
        category: "Food",
        amount: 500,
      });
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the setBudget function to throw an error
      budgetService.setBudget.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({ category: "Food", amount: 500 });
      const res = mockResponse();

      await budgetController.setBudget(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("GET /api/budget", () => {
    it("should get all budgets for a user", async () => {
      // Mock the getBudgets function to return a list of budgets
      budgetService.getBudgets.mockResolvedValue({
        status: 200,
        data: [{ category: "Food", amount: 500 }],
      });

      const req = mockRequest();
      const res = mockResponse();

      await budgetController.getBudgets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { category: "Food", amount: 500 },
      ]);
      expect(budgetService.getBudgets).toHaveBeenCalledWith(mockUserId);
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the getBudgets function to throw an error
      budgetService.getBudgets.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest();
      const res = mockResponse();

      await budgetController.getBudgets(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("GET /api/budget/:category", () => {
    it("should get a budget by category", async () => {
      // Mock the getBudgetByCategory function to return a budget
      budgetService.getBudgetByCategory.mockResolvedValue({
        status: 200,
        data: { category: "Food", amount: 500 },
      });

      const req = mockRequest({}, { category: "Food" });
      const res = mockResponse();

      await budgetController.getBudgetByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ category: "Food", amount: 500 });
      expect(budgetService.getBudgetByCategory).toHaveBeenCalledWith(
        mockUserId,
        "Food"
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the getBudgetByCategory function to throw an error
      budgetService.getBudgetByCategory.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({}, { category: "Food" });
      const res = mockResponse();

      await budgetController.getBudgetByCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("DELETE /api/budget/:category", () => {
    it("should delete a budget by category", async () => {
      // Mock the deleteBudget function to return a success response
      budgetService.deleteBudget.mockResolvedValue({
        status: 200,
        data: { message: "Budget deleted successfully" },
      });

      const req = mockRequest({}, { category: "Food" });
      const res = mockResponse();

      await budgetController.deleteBudget(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Budget deleted successfully",
      });
      expect(budgetService.deleteBudget).toHaveBeenCalledWith(
        mockUserId,
        "Food"
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the deleteBudget function to throw an error
      budgetService.deleteBudget.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({}, { category: "Food" });
      const res = mockResponse();

      await budgetController.deleteBudget(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("PUT /api/budget/:category", () => {
    it("should update a budget amount", async () => {
      // Mock the updateBudgetAmount function to return a success response
      budgetService.updateBudgetAmount.mockResolvedValue({
        status: 200,
        data: { message: "Budget amount updated successfully" },
      });

      const req = mockRequest({ amount: 600 }, { category: "Food" });
      const res = mockResponse();

      await budgetController.updateBudgetAmount(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Budget amount updated successfully",
      });
      expect(budgetService.updateBudgetAmount).toHaveBeenCalledWith(
        mockUserId,
        "Food",
        600
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the updateBudgetAmount function to throw an error
      budgetService.updateBudgetAmount.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({ amount: 600 }, { category: "Food" });
      const res = mockResponse();

      await budgetController.updateBudgetAmount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("GET /api/budget/track/:month", () => {
    it("should track spending and get alerts", async () => {
      // Mock the trackSpending function to return spending data
      budgetService.trackSpending.mockResolvedValue({
        status: 200,
        data: { month: "October", totalSpent: 400 },
      });

      const req = mockRequest({}, { month: "October" });
      const res = mockResponse();

      await budgetController.trackSpending(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        month: "October",
        totalSpent: 400,
      });
      expect(budgetService.trackSpending).toHaveBeenCalledWith(
        mockUserId,
        "October"
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the trackSpending function to throw an error
      budgetService.trackSpending.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({}, { month: "October" });
      const res = mockResponse();

      await budgetController.trackSpending(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
