const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { addOrder } = require("../order/orderController");
const { OrderModel } = require("../order/orderModel");

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
        "http://localhost:5173/confirmation?session_id={CHECKOUT_SESSION_ID}&orderNumber={ORDER_NUMBER}",
      cancel_url: "http://localhost:5173/cart",
      metadata: {
        cartItems: JSON.stringify(cartItems), // Lägger till denna rad för att inkludera cartItems i metadata
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

const confirmPayment = async (req, res) => {
  try {
    const { session_id, orderNumber } = req.query;
    const stripeSession = await stripe.checkout.sessions.retrieve(session_id);

    console.log("sessiosId är:", session_id);
    console.log("orderNumber är:", orderNumber); //får undefined
    // console.log("stripeSession är:", stripeSession);

    const cartItems = JSON.parse(stripeSession.metadata.cartItems || "[]").map(
      (item) => ({
        product: item.product,
        quantity: item.quantity,
      })
    );

    const deliveryAddress = {
      street: "Sample Street",
      zipcode: "12345",
      city: "Sample City",
      country: "Sample Country",
    };

    // Skicka informationen till addOrder för att skapa ordern
    await addOrder(
      {
        body: { orderItems: cartItems, deliveryAddress },
        session: req.session,
      },
      res
    );
    console.log("cartItems som skickas till order:", cartItems);

    const orderData = {
      orderNumber: orderNumber,
      products: cartItems.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
      })),
    };
    if (!res.headersSent) {
      return res
        .status(200)
        .json({ message: "Payment confirmed successfully!", data: orderData });
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  }
};

module.exports = { createCheckoutSession, confirmPayment };
