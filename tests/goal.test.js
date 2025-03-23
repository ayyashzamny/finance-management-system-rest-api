const request = require("supertest");
const app = require("../server"); // Import the Express app
const goalController = require("../controllers/goalController"); // Import the controller
const goalService = require("../services/goalService"); // Import the service

// Mock the goalService module
jest.mock("../services/goalService");

describe("Goal Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
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

  describe("POST /api/goals", () => {
    it("should create a goal and return success", async () => {
      // Mock the createGoal function to return a success response
      goalService.createGoal.mockResolvedValue({
        status: 201,
        data: { message: "Goal created successfully", goal: {} },
      });

      const req = mockRequest({ title: "Save $1000", targetAmount: 1000 });
      const res = mockResponse();

      await goalController.createGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Goal created successfully",
        goal: {},
      });
      expect(goalService.createGoal).toHaveBeenCalledWith(mockUserId, {
        title: "Save $1000",
        targetAmount: 1000,
      });
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the createGoal function to throw an error
      goalService.createGoal.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({ title: "Save $1000", targetAmount: 1000 });
      const res = mockResponse();

      await goalController.createGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("GET /api/goals", () => {
    it("should get all goals for a user", async () => {
      // Mock the getGoals function to return a list of goals
      goalService.getGoals.mockResolvedValue({
        status: 200,
        data: [{ title: "Save $1000", targetAmount: 1000 }],
      });

      const req = mockRequest();
      const res = mockResponse();

      await goalController.getGoals(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { title: "Save $1000", targetAmount: 1000 },
      ]);
      expect(goalService.getGoals).toHaveBeenCalledWith(mockUserId);
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the getGoals function to throw an error
      goalService.getGoals.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest();
      const res = mockResponse();

      await goalController.getGoals(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("GET /api/goals/:goalId", () => {
    it("should get a goal by ID", async () => {
      // Mock the getGoalById function to return a goal
      goalService.getGoalById.mockResolvedValue({
        status: 200,
        data: { title: "Save $1000", targetAmount: 1000 },
      });

      const req = mockRequest({}, { goalId: "mockGoalId123" });
      const res = mockResponse();

      await goalController.getGoalById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        title: "Save $1000",
        targetAmount: 1000,
      });
      expect(goalService.getGoalById).toHaveBeenCalledWith(
        mockUserId,
        "mockGoalId123"
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the getGoalById function to throw an error
      goalService.getGoalById.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({}, { goalId: "mockGoalId123" });
      const res = mockResponse();

      await goalController.getGoalById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("PUT /api/goals/:goalId", () => {
    it("should update a goal", async () => {
      // Mock the updateGoal function to return a success response
      goalService.updateGoal.mockResolvedValue({
        status: 200,
        data: { message: "Goal updated successfully", goal: {} },
      });

      const req = mockRequest(
        { title: "Save $2000" },
        { goalId: "mockGoalId123" }
      );
      const res = mockResponse();

      await goalController.updateGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Goal updated successfully",
        goal: {},
      });
      expect(goalService.updateGoal).toHaveBeenCalledWith(
        mockUserId,
        "mockGoalId123",
        { title: "Save $2000" }
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the updateGoal function to throw an error
      goalService.updateGoal.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest(
        { title: "Save $2000" },
        { goalId: "mockGoalId123" }
      );
      const res = mockResponse();

      await goalController.updateGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("DELETE /api/goals/:goalId", () => {
    it("should delete a goal", async () => {
      // Mock the deleteGoal function to return a success response
      goalService.deleteGoal.mockResolvedValue({
        status: 200,
        data: { message: "Goal deleted successfully" },
      });

      const req = mockRequest({}, { goalId: "mockGoalId123" });
      const res = mockResponse();

      await goalController.deleteGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Goal deleted successfully",
      });
      expect(goalService.deleteGoal).toHaveBeenCalledWith(
        mockUserId,
        "mockGoalId123"
      );
    });

    it("should return 500 if an error occurs", async () => {
      // Mock the deleteGoal function to throw an error
      goalService.deleteGoal.mockRejectedValue(
        new Error("Internal Server Error")
      );

      const req = mockRequest({}, { goalId: "mockGoalId123" });
      const res = mockResponse();

      await goalController.deleteGoal(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
