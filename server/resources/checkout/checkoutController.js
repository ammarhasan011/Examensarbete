const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const express = require("express");
// const app = express();
// app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:5173";

const createCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: cart.map(item => ({
      price: item.price_id,
      quantity: item.quantity,
    }))
    
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = {createCheckoutSession}
