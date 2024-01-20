const express = require("express");
const { Router } = require("express");
const { createCheckoutSession } = require("./checkoutController");

const checkoutRouter = Router();

checkoutRouter.post("/create-checkout-session", createCheckoutSession);

//Export checkoutRouter
module.exports = { checkoutRouter };
