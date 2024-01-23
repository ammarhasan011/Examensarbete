import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Product {
  productId: string;
  name: string;
  quantity: number;
}

interface OrderData {
  orderNumber: number;
  customerEmail: string;
  products: Product[];
}

const Confirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    // Hämta session_id från URL-parametrarna
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    console.log("sessionId", sessionId);

    // Gör en anrop till servern för att hämta orderinformation baserat på session_id
    // Exempel: /api/orders?session_id=cs_test_a1jnsCFL9dnkbznJNEtUtHrW2kAyJog1XFHOwolXQKqbiABOfRc9Luli7f
    fetch(`/api/orders?session_id=${sessionId}`)
      .then((response) => response.json())
      .then((data: OrderData) => {
        // Uppdatera state med orderinformationen
        setOrderData(data);
        console.log("Order Data:", data);
      })
      .catch((error) => {
        console.error("Error fetching order information:", error);
      });
  }, [location.search]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Customer Email: {orderData.customerEmail}</p>
      <p>Products:</p>
      <ul>
        {orderData.products ? (
          orderData.products.map((product) => (
            <li key={product.productId}>
              {product.name} - Quantity: {product.quantity}
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default Confirmation;
