import CartItem from "../Interfaces/CartItem";

interface CheckoutProps {
  cartItems: CartItem[];
}
// Checkout Component Definition
const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  // Function to handle the payment process
  async function handlePayment() {
    try {
      // Send a POST request to create a checkout session on the server
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
        }),
      });

      // Check if the server request was successful
      if (!response.ok) {
        console.error("The request failed");
        console.log(cartItems);
        return;
      }
      console.log("The request is good");
      // Extract session information from the server response
      const { url, sessionId } = await response.json();
      // Store the session ID in local storage for reference
      localStorage.setItem("session-id", sessionId);
      console.log("sessionId", sessionId);

      // Redirect the user to the Stripe Checkout page
      window.location.href = url;
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  }

  return (
    <div>
      <button onClick={handlePayment}>Betala</button>
    </div>
  );
};

export default Checkout;
