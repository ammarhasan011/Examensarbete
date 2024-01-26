import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface Product {
  _id: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface OrderData {
  orderNumber: number;
  customerId: string;
  products: Product[];
}

const Confirmation = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const shouldNotRender = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    console.log("sessionId", sessionId);

    if (!shouldNotRender.current) {
      fetch(`/api/confirm-payment?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data: OrderData) => {
          setOrderData(data);
          console.log("Order Data:", data);
          shouldNotRender.current = true;
        })
        .catch((error) => {
          console.error("Error fetching order information:", error);
        });
    }
  }, [location.search]);
  console.log("Rendering Order Data:", orderData);
  if (!orderData) {
    return <div>Loading...</div>;
  }

  const orderItems = orderData?.products || [];

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Customer ID: {orderData.customerId}</p>

      <p>Products:</p>
      <ul>
        {orderItems.map((product) => (
          <li key={product._id}>
            Name: {product.name} <br />
            Image: {product.image} <br />
            Quantity: {product.quantity} <br />
            Price: {product.price} kr <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Confirmation;
