const express = require("express");
const { Router } = require("express");
const {
  createCheckoutSession,
  confirmPayment,
} = require("./checkoutController");

// Create an instance of Express Router // Define routes for checkout
const checkoutRouter = Router();

checkoutRouter
  .post("/create-checkout-session", createCheckoutSession)
  .get("/confirm-payment", confirmPayment);

//Export checkoutRouter
module.exports = { checkoutRouter };
