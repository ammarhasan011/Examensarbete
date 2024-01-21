const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;
    console.log("Received cartItems for checkout:", cartItems);
    const customerEmail = req.session.email;
    console.log("Received customerEmail for checkout:", customerEmail);

    // Skapa checkout-session med customerId
    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "sek",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },

        quantity: item.quantity,
      })),
      customer_email: customerEmail,
      mode: "payment",
      success_url:
        "http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });

    // await addOrder(req, res);

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};

module.exports = { createCheckoutSession };
