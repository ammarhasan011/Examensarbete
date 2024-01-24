//Import required modules
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieSession = require("cookie-session");
const { connectToDatabase } = require("./resources/db/dataBase");

//Import routers
const productRouter = require("./resources/product/productRouter");
const { userRouter } = require("./resources/user/userRouter");
const { orderRouter } = require("./resources/order/orderRouter");
const { checkoutRouter } = require("./resources/checkout/checkoutRouter");

//Create an Express application
const app = express();

//Middleware to parse JSON data
app.use(express.json());

//Enable Cross
app.use(cors());

//Connect to the database
connectToDatabase();

//Configure cookie session middleware for user sessions
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

//Use routers
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", checkoutRouter);

//Starting server
app.listen(3000, () => console.log("Server is up and runninnn...port3000"));
