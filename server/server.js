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
