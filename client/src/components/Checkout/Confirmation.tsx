import { useEffect, useState } from "react";
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
  const [dataLoaded, setDataLoaded] = useState(false);
  //   const shouldNotRender = useRef(false);
  //     if (!shouldNotRender.current) {
  //     }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const sessionId = searchParams.get("session_id");

        console.log("sessionId", sessionId);

        const response = await fetch(
          `/api/confirm-payment?session_id=${sessionId}`
        );
        const data: { orderData: OrderData } = await response.json();

        setOrderData(data.orderData);
        console.log("Order Data:", data.orderData);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching order information:", error);
      }
    };

    fetchData();
  }, [location.search]);

  console.log("Rendering Order Data:", orderData);

  if (!dataLoaded) {
    return <div>Loading...</div>;
  }

  if (!orderData) {
    return <div>Error loading order data.</div>;
  }

  const orderItems = orderData.products || [];

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order Number: {orderData.orderNumber}</p>
      <p>Customer Email: {orderData.customerId}</p>

      <p>Products:</p>
      <ul>
        {orderItems.map((product, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            Name: {product.name} <br />
            <img
              style={{ maxWidth: "100px", height: "auto" }}
              src={product.image}
              alt={product.name}
            />{" "}
            <br />
            Quantity: {product.quantity} <br />
            Price: {product.price} kr <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Confirmation;
