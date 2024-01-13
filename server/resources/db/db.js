// db.js
const mongoose = require("mongoose");

//connection to database running on port 4000
async function connectToDatabase() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

  console.log("Database is up and running on port 4000");
}

module.exports = { connectToDatabase };
