const { Router } = require("express");
const { getAllOrders, getOrder, addOrder } = require("./orderController");
const { adminOnly, auth, exists, validate } = require("../middleWeares");
const { OrderModel, OrderCreateValidationSchema } = require("./orderModel");

// Create an instance of Express Router // Define routes with middleware functions
const orderRouter = Router()
  .get("/orders", auth, getAllOrders)
  .get("/orders/:id", auth, exists(OrderModel), getOrder)
  .post("/orders", auth, validate(OrderCreateValidationSchema), addOrder);

module.exports = { orderRouter };
