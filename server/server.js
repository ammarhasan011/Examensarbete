const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");

const productRouter = require("./resources/product/product.router");
const { userRouter } = require("./resources/user/user.router");

const app = express();
// Middleware för att tolka JSON
app.use(express.json());
app.use(cors());

//koppling till databas som kör på port 4000
async function connectionDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  app.listen(process.env.PORT || 4001, () =>
    console.log("Database is up and runninnn...port4000")
  );
}
connectionDB();

app.use(
  cookieSession({
    secret: "s3cr3t",
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: false,
  })
);

// Add routers
app.use("/api", productRouter);
app.use("/api", userRouter);

// server
app.listen(3000, () => console.log("Server is up and runninnn...port3000"));
