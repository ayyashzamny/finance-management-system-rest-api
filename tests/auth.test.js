const request = require("supertest");
const app = require("../server"); // Import your Express app
const { registerUser, loginUser } = require("../services/authService");

// Mock the authService module
jest.mock("../services/authService");

describe("Auth Controller", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should register a user and return a token", async () => {
      // Mock the registerUser function to return a token
      registerUser.mockResolvedValue("mockToken123");

      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: "User registered successfully",
        token: "mockToken123",
      });
      expect(registerUser).toHaveBeenCalledWith(
        "testuser",
        "test@example.com",
        "password123",
        "user"
      );
    });

    it("should return 400 if registration fails", async () => {
      // Mock the registerUser function to throw an error
      registerUser.mockRejectedValue(new Error("Registration failed"));

      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        role: "user",
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Registration failed" });
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login a user and return a token", async () => {
      // Mock the loginUser function to return a token
      loginUser.mockResolvedValue("mockToken123");

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: "Login successful",
        token: "mockToken123",
      });
      expect(loginUser).toHaveBeenCalledWith("test@example.com", "password123");
    });

    it("should return 400 if login fails", async () => {
      // Mock the loginUser function to throw an error
      loginUser.mockRejectedValue(new Error("Invalid credentials"));

      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: "Invalid credentials" });
    });
  });
});
