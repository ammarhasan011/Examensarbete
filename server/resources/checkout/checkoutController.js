const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        price: item.product,
        quantity: item.quantity,
      })),

      mode: "payment",
      success_url: "http://localhost:5173/CONFIRMATION",
      cancel_url: "http://localhost:5173",
    });
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};

module.exports = { createCheckoutSession };
