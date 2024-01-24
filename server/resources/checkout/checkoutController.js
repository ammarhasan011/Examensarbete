// Import
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { addOrder } = require("../order/orderController");
// Temporary storage for session IDs
const activeSessions = [];
// Create a checkout session when initiating a payment
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
      metadata: {
        cartItems: JSON.stringify(cartItems), // Add this line to include cartItems in metadata
      },
    });

    // Send the session URL and ID in the response
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    // Send an error response if the checkout session creation fails
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};

// Confirm payment and add order to the database
const confirmPayment = async (req, res) => {
  try {
    // Check if the session ID is already in the activeSessions array
    if (activeSessions.includes(req.session.id)) {
      return res
        .status(400)
        .json({ error: "Checkout session already in progress" });
    }

    // Add the session ID to activeSessions
    activeSessions.push(req.session.id);

    // Extract session_id and orderNumber from the query parameters
    const { session_id, orderNumber } = req.query;
    // Retrieve Stripe session information
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    console.log("sessiosId är:", session_id);
    // console.log("orderNumber är:", orderNumber);
    console.log("stripeSession är:", stripeSession);

    // Extract cartItems from Stripe session metadata
    const cartItems = JSON.parse(stripeSession.metadata.cartItems || "[]").map(
      (item) => ({
        product: item.product,
        quantity: item.quantity,
      })
    );

    // Send information to addOrder to create the order
    await addOrder(
      {
        body: { orderItems: cartItems },
        session: req.session,
      },
      res
    );
    console.log("cartItems som skickas till order:", cartItems);

    // Prepare order data for response
    const orderData = {
      orderNumber: orderNumber,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
      })),
    };

    // Respond with a success message and order data
    if (!res.headersSent) {
      return res
        .status(200)
        .json({ message: "Payment confirmed successfully!", orderData });
    }
    console.log("orderdata är ", orderData);
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  } finally {
    // Remove the session ID from activeSessions after creating the session
    const index = activeSessions.indexOf(req.session.id);
    if (index !== -1) {
      activeSessions.splice(index, 1);
    }
  }
};

module.exports = { createCheckoutSession, confirmPayment };
