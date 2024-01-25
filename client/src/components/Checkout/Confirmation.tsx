// Import
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Define interfaces for better type checking
interface Product {
  product: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

interface OrderData {
  orderNumber: number;
  customerId: string;
  orderItems: Product[];
}

const Confirmation = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();
  // State to store order data
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  //Step rendering useEffect
  const shouldNotRender = useRef(false);

  // useEffect to fetch order information when the component mounts or when the location.search changes
  useEffect(() => {
    // Extract session_id from the query parameters
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get("session_id");

    console.log("sessionId", sessionId);
    //check to render or not
    if (!shouldNotRender.current) {
      // Fetch order information using the session_id
      // fetch(`/api/confirm-payment?session_id=${sessionId}`)
      //   .then((response) => response.json())
      //   .then((data: OrderData) => {
      //     // Set the order data in the state
      //     setOrderData(data);
      //     console.log("Order Data:", data);
      //     console.log("OrderData:", OrderData);
      fetch(`/api/confirm-payment?session_id=${sessionId}`)
        .then((response) => response.json())
        .then((data) => {
          // Anpassa strukturen för att matcha din förväntade struktur
          const adaptedData = {
            orderNumber: data.orderNumber,
            customerId: data.customerId,
            orderItems: data.orderItems.map((item: Product) => ({
              name: item.name,
              image: item.image,
              quantity: item.quantity,
              price: item.price,
            })),
          };

          // Set the order data in the state
          setOrderData(adaptedData);
          console.log("Order Data:", adaptedData);
          shouldNotRender.current = true;
          // Set shouldNotRender.current to true after the first render
        })
        .catch((error) => {
          console.error("Error fetching order information:", error);
        });
    }
  }, [location.search]);

  // If orderData is not available yet, display a loading message
  if (!orderData) {
    return <div>Loading...</div>;
  }
  const orderItems = orderData?.orderItems || [];
  // Render the order confirmation details
  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Customer ID: {orderData.customerId}</p>
      {/* <p>Customer Email: {orderData.customerId}</p> */}

      <p>Products:</p>
      <ul>
        {orderItems.map((product) => (
          <li key={orderData.orderNumber}>
            Name:{product.name} <br />
            Image: {product.name} <br />
            {/* Id:{product.product} <br /> */}
            Quantity: {product.quantity} <br />
            Price {product.price}
            {"kr "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Confirmation;
