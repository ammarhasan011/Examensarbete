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

    // Generate a unique cart ID
    const cartId = generateUniqueCartId();

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
        cartId: cartId,
        // cartItems: JSON.stringify(cartItems), // Add this line to include cartItems in metadata
      },
    });
    // Save the cartItems with cartId in activeSessions
    activeSessions[cartId] = cartItems;
    console.log("cartId", cartId);

    // Send the session URL and ID in the response
    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    // Send an error response if the checkout session creation fails
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Could not create checkout session" });
  }
};

const confirmPayment = async (req, res) => {
  let cartId;
  try {
    // Extract session_id and orderNumber from the query parameters
    const { session_id, orderNumber } = req.query;
    console.log("60");
    // Retrieve Stripe session information
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    // Extract cartId from Stripe session metadata
    const cartId = stripeSession.metadata.cartId;

    // Check if the cartId is in activeSessions
    if (!activeSessions[cartId]) {
      // res.status(400).json({ error: "Cart not found in activeSessions" });
      console.error("Cart not found in activeSessions");
    }

    // Extract cartItems from activeSessions using cartId
    const cartItems = activeSessions[cartId];

    try {
      // Send information to addOrder to create the order
      await addOrder({
        body: { orderItems: cartItems },
        session: req.session,
      });
      console.log("Order created successfully");
    } catch (error) {
      console.error("Error creating order:", error);
    }

    // Fortsätt med resten av koden...

    // Prepare order data for response
    const orderData = {
      orderNumber: orderNumber, // får undefiend
      customerId: req.session.email,
      products: cartItems.map((item) => ({
        productId: item._id, // får undefiend
        image: item.image,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // // Respond with a success message and order data
    res
      .status(200)
      .json({ message: "Payment confirmed successfully!", orderData });

    console.log("orderdata är ", orderData);
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  } finally {
    // Remove the cartId from activeSessions after creating the session
    delete activeSessions[cartId];
  }
};

function generateUniqueCartId() {
  return Math.random().toString(36).substring(7);
}
module.exports = { createCheckoutSession, confirmPayment };
