// import { useEffect } from "react";

// const Confirmation = () => {
//   // Extract session_id from the URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const sessionId = urlParams.get("session_id");

//   // Confirm the payment on the client side
//   const confirmPayment = async () => {
//     try {
//       const response = await fetch(
//         `/api/confirm-payment?session_id=${sessionId}`
//       );
//       if (response.ok) {
//         const orderData = await response.json();
//         console.log("Payment confirmed successfully!", orderData);
//         // Perform additional actions as needed (e.g., show confirmation message)
//         console.log("sessionId", sessionId);
//       } else {
//         console.error("Failed to confirm payment.");
//       }
//     } catch (error) {
//       console.error("Error confirming payment:", error);
//     }
//   };

//   // Call the function to confirm payment when the component mounts
//   useEffect(() => {
//     confirmPayment();
//   }, []);

//   return (
//     <div>
//       <h1>Betalning genomförd</h1>
//       {/* Add additional content or components for the confirmation page */}
//     </div>
//   );
// };

// export default Confirmation;

import { useEffect, useState } from "react";

interface OrderData {
  orderNumber: string; // eller annan relevant datatyp
  products: {
    productId: string;
    name: string;
    quantity: number;
  }[];
  // Lägg till andra egenskaper om det finns ytterligare information om ordern
}
const Confirmation = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Extract session_id from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");

  // Confirm the payment on the client side
  const confirmPayment = async () => {
    try {
      const response = await fetch(
        `/api/confirm-payment?session_id=${sessionId}`
      );
      if (response.ok) {
        // const orderData = await response.json();
        console.log("Payment confirmed successfully!", orderData);
        console.log("orderData!", orderData);

        setOrderData(orderData);
      } else {
        console.error("Failed to confirm payment.");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };

  // Call the function to confirm payment when the component mounts
  useEffect(() => {
    confirmPayment();
  }, []);

  return (
    <div>
      <h1>Betalning genomförd</h1>
      {orderData && orderData.products ? (
        <div>
          <h2>Tack för ditt köp!</h2>
          <p>Ordernummer: {orderData.orderNumber}</p>
          <h3>Produkter:</h3>
          <ul>
            {orderData.products.map((product) => (
              <li key={product.productId}>
                {product.name} - {product.quantity} st
              </li>
            ))}
          </ul>
          <p>handla mer?</p>
        </div>
      ) : (
        <p>Ingen information om ordern hittades.</p>
      )}
    </div>
  );
};

export default Confirmation;
