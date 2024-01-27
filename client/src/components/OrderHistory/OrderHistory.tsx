import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  orderNumber: number;
  total: number;
  createdAt: string; // Anpassa typen baserat på hur createdAt är formatterad
  // Lägg till andra fält om det behövs
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders"); // Använd rätt endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // Ladda användarens ordrar när komponenten monteras
    getOrders();
  }, []); // Använd en tom beroendelista för att köra effekten bara en gång när komponenten monteras

  return (
    <div>
      <h2>Orderhistorik</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {/* Visa information om varje order här */}
            OrderNumber: {order.orderNumber}, Total: {order.total}, Datum:{" "}
            {order.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
