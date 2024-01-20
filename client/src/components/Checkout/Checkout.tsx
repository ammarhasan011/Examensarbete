import CartItem from "../Interfaces/CartItem";
interface CheckoutProps {
  cartItems: CartItem[];
  customerId: string;
}
// Checkout Component Definition
const Checkout: React.FC<CheckoutProps> = ({ cartItems, customerId }) => {
  async function handlePayment() {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, customerId }),
      });

      if (!response.ok) {
        console.error("The request failed");
        console.log(cartItems);
        return;
      }
      console.log("The request is good");
      const { url } = await response.json();
      window.location.href = url;
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
