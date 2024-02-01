import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Define the types for Product and OrderData
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
  // Get the current URL location
  const location = useLocation();
  // State to store order data
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  // State to track if data is loaded
  const [dataLoaded, setDataLoaded] = useState(false);
  // Ref to determine whether to render or not
  const shouldNotRender = useRef(false);

  useEffect(() => {
    // Check if rendering is allowed
    if (!shouldNotRender.current) {
      // Fetch order data when the component mounts
      const fetchData = async () => {
        try {
          // Extract session_id from URL search parameters
          const searchParams = new URLSearchParams(location.search);
          const sessionId = searchParams.get("session_id");

          console.log("sessionId", sessionId);

          // Fetch order data from the server
          const response = await fetch(
            `/api/confirm-payment?session_id=${sessionId}`
          );
          const data: { orderData: OrderData } = await response.json();

          // Update state with the fetched order data
          setOrderData(data.orderData);
          console.log("Order Data:", data.orderData);

          // Set dataLoaded to true to indicate that data has been loaded
          setDataLoaded(true);
        } catch (error) {
          console.error("Error fetching order information:", error);
        }
      };
      // Call the fetchData function
      fetchData();
      // Update shouldNotRender ref to prevent further rendering
      shouldNotRender.current = true;
    }
  }, [location.search]);

  console.log("Rendering Order Data:", orderData);

  // Display loading message while data is being fetched
  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  // Display error message if order data is not available
  if (!orderData) {
    return <div>Error loading order data.</div>;
  }
  // Extract order items from orderData
  const orderItems = orderData.products || [];

  return (
    <div>
      <h2>Orderbekräftelse</h2>
      <p>Ordernummer: {orderData.orderNumber}</p>
      <p>Kundens E-post: {orderData.customerId}</p>
      <p>Köpta produkter:</p>
      <ul>
        {orderItems.map((product, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            Namn: {product.name} <br />
            <img
              style={{ maxWidth: "100px", height: "auto" }}
              src={product.image}
              alt={product.name}
            />{" "}
            <br />
            Antal: {product.quantity} <br />
            Pris: {product.price} kr <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Confirmation;
