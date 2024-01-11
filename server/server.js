const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

//databas
async function connectionDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  app.listen(process.env.PORT || 4001, () =>
    console.log("Database is up and runninnn...port4000")
  );
}

connectionDB();

app.listen(3000, () => console.log("Server is up and runninnn...port3000"));
