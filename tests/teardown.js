const mongoose = require("mongoose");

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log("🔴 Test Database connection closed.");
  } catch (error) {
    console.error("❌ Error closing Test Database:", error.message);
  }
});
