//Import required modules
const mongoose = require("mongoose");

//Connection to database running on port 4000
async function connectToDatabase() {
  // Enable strict query mode for Mongoose
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  console.log("Database is up and running on port 4000");
}

// Exporting connectToDatabase
module.exports = { connectToDatabase };
