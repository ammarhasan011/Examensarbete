const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const { connectToDatabase } = require("./resources/db/db");

const productRouter = require("./resources/product/product.router");
const { userRouter } = require("./resources/user/user.router");

const app = express();
// Middleware för att tolka JSON
app.use(express.json());
app.use(cors());
connectToDatabase();

app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, //24H
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

// Add routers
app.use("/api", productRouter);
app.use("/api", userRouter);

// server
app.listen(3000, () => console.log("Server is up and runninnn...port3000"));
