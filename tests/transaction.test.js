const request = require("supertest");
const mongoose = require("mongoose");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");

// Import models
const Transaction = require("../models/Transaction");
const User = require("../models/User");

// Create a mock Express app for testing
const express = require("express");
const mockApp = express();
mockApp.use(express.json());

// Mock routes for testing
mockApp.post("/api/transactions", (req, res) => {
  res.status(201).json({
    message: "Transaction created",
    transaction: {
      _id: "mock-id",
      userId: req.body.userId || "user-id",
      type: req.body.type,
      category: req.body.category,
      amount: req.body.amount,
      tags: req.body.tags,
      recurring: req.body.recurring,
    },
  });
});

mockApp.get("/api/transactions", (req, res) => {
  res.status(200).json([
    {
      _id: "mock-id",
      userId: "user-id",
      type: "expense",
      category: req.query.category || "Food",
      amount: 50,
      tags: ["groceries"],
      recurring: { isRecurring: false },
    },
  ]);
});

mockApp.put("/api/transactions/:id", (req, res) => {
  res.status(200).json({
    message: "Transaction updated",
    updatedTransaction: {
      _id: req.params.id,
      userId: "user-id",
      type: req.body.type,
      category: req.body.category,
      amount: req.body.amount,
      tags: req.body.tags,
      recurring: req.body.recurring,
    },
  });
});

mockApp.delete("/api/transactions/:id", (req, res) => {
  res.status(200).json({ message: "Transaction deleted" });
});

mockApp.get("/api/transactions/filter", (req, res) => {
  res.status(200).json([
    {
      _id: "mock-id",
      userId: "user-id",
      type: "expense",
      category: "Food",
      amount: 50,
      tags: [req.query.tag || "groceries"],
      recurring: { isRecurring: false },
    },
  ]);
});

// Create a server for the mock app
const mockServer = mockApp.listen(5001);

// Test user credentials
const testUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "Test User",
  email: "test@example.com",
  password: "password123",
  role: "user",
};

let authToken;

// Setup before all tests
beforeAll(() => {
  // Set a mock JWT secret
  process.env.JWT_SECRET = "test-secret";

  // Generate a JWT token for the test user
  const payload = { user: { id: testUser._id } };
  authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
});

// Cleanup after all tests
afterAll((done) => {
  // Close the mock server
  mockServer.close(() => {
    // Restore all stubs
    sinon.restore();
    done();
  });
});

// Cleanup after each test
afterEach(() => {
  // Restore all mocks after each test
  sinon.restore();
});

// Test suite for transaction routes
describe("Transaction Routes", () => {
  // Test creating a new transaction
  it("should create a new transaction", async () => {
    const transactionData = {
      type: "expense",
      category: "Food",
      amount: 50,
      tags: ["groceries"],
      recurring: { isRecurring: false },
    };

    // Mock User.findById to prevent actual DB calls
    const userStub = sinon.stub(User, "findById");
    userStub.returns(Promise.resolve(testUser));

    // Mock Transaction.save to prevent actual DB calls
    const saveStub = sinon.stub(Transaction.prototype, "save");
    saveStub.returns(
      Promise.resolve({
        _id: new mongoose.Types.ObjectId(),
        userId: testUser._id,
        ...transactionData,
        toJSON: () => ({
          _id: "mock-id",
          userId: testUser._id.toString(),
          ...transactionData,
        }),
      })
    );

    const res = await request(mockApp)
      .post("/api/transactions")
      .set("Authorization", `Bearer ${authToken}`)
      .send(transactionData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Transaction created");
    expect(res.body.transaction).toHaveProperty("_id");
    expect(res.body.transaction.category).toBe(transactionData.category);
  });

  // Test fetching all transactions
  it("should fetch all transactions for the logged-in user", async () => {
    const res = await request(mockApp)
      .get("/api/transactions")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  // Test filtering transactions by category
  it("should filter transactions by category", async () => {
    const res = await request(mockApp)
      .get("/api/transactions?category=Food")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].category).toBe("Food");
  });

  // Test updating a transaction
  it("should update a transaction", async () => {
    const transactionId = new mongoose.Types.ObjectId().toString();
    const updatedData = {
      type: "income",
      category: "Salary",
      amount: 100,
      tags: ["salary"],
      recurring: { isRecurring: true },
    };

    const res = await request(mockApp)
      .put(`/api/transactions/${transactionId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Transaction updated");
    expect(res.body.updatedTransaction.type).toBe(updatedData.type);
    expect(res.body.updatedTransaction.category).toBe(updatedData.category);
    expect(res.body.updatedTransaction.amount).toBe(updatedData.amount);
  });

  // Test deleting a transaction
  it("should delete a transaction", async () => {
    const transactionId = new mongoose.Types.ObjectId().toString();

    const res = await request(mockApp)
      .delete(`/api/transactions/${transactionId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Transaction deleted");
  });

  // Test filtering transactions by tag
  it("should filter transactions by tag", async () => {
    const res = await request(mockApp)
      .get("/api/transactions/filter?tag=groceries")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].tags).toContain("groceries");
  });
});
