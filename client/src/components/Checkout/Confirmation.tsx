import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Product {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderNumber: number;
  customerId: string;
  orderItems: Product[];
}

const Confirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    console.log("sessionId", sessionId);

    fetch(`/api/confirm-payment?session_id=${sessionId}`)
      .then((response) => response.json())
      .then((data: OrderData) => {
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
      <p>Customer ID: {orderData.customerId}</p>
      <p>Products:</p>
      <ul>
        {orderData.orderItems.map((product) => (
          <li key={product.productId}>
            {product.productId}
            <br /> - Quantity: {product.quantity}
            <br />- Price:
            {product.price}
            {"kr "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Confirmation;
