const mongoose = require("mongoose");

async function connectToDatabase(uri) {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

module.exports = connectToDatabase;
