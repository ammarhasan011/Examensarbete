const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    // Extract cartItems and customerEmail from the request body and session
    const { cartItems } = req.body;
    console.log("Received cartItems for checkout:", cartItems);
    const customerEmail = req.session.email;
    console.log("Received customerEmail for checkout:", customerEmail);

    // Create a checkout session with the Stripe API
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

    // Send the session URL and ID in the response
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    // Send an error response if the checkout session creation fails
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    const orderData = {
      orderNumber: "123456",
      products: [
        { productId: "1", name: "Product A", quantity: 2 },
        { productId: "2", name: "Product B", quantity: 1 },
      ],
    };
    // Gör vad du behöver göra för att bekräfta betalningen och uppdatera databasen här
    console.log(orderData);
    res
      .status(200)
      .json({ message: "Payment confirmed successfully!", data: orderData });
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  }
};

module.exports = { createCheckoutSession, confirmPayment };
