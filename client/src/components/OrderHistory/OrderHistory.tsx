import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  orderNumber: number;
  // Ta bort total och createdAt här
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h2>Orderhistorik</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            OrderNumber: {order.orderNumber}
            {/* Ta bort total och createdAt här */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
