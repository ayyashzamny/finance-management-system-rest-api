const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const DB_URI = process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

        const conn = await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host} (${process.env.NODE_ENV === "test" ? "Test DB" : "Production DB"})`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// Disconnect function for test teardown
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("🔴 MongoDB Disconnected");
    } catch (error) {
        console.error("❌ Error disconnecting MongoDB:", error.message);
    }
};

module.exports = { connectDB, disconnectDB };
