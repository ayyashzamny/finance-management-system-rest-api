require("dotenv").config();
const mongoose = require("mongoose");

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to Test Database");
  } catch (error) {
    console.error("❌ Error connecting to Test Database:", error.message);
    process.exit(1);
  }
});
