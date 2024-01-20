const Checkout = () => {
  async function handlePayment() {
    try {
      const respons = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      //  svar
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }

    return (
      <div>
        <button onClick={handlePayment}>Betala</button>
      </div>
    );
  }
};
export default Checkout;
