import { useEffect, useState } from "react";
import axios from "axios";

// Define the types for Order and OrderItem
interface Order {
  _id: string;
  orderNumber: number;
  orderItems: OrderItem[];
}

interface OrderItem {
  product: {
    _id: string;
    title: string;
    price: number;
    image: string;
  };
  quantity: number;
}

const OrderHistory = () => {
  // State to store orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to fetch orders from the server
  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      console.log("response.data", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // useEffect to fetch orders when the component mounts
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h2>Orderhistorik</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Ordernummer: {order.orderNumber}
            <ul>
              {order.orderItems.map((orderItem, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  {/* Use optional chaining to avoid errors */}
                  Produkt:{" "}
                  {orderItem.product?.title || "Produkten finns ej kvar"} <br />
                  {orderItem.product && (
                    <>
                      <img
                        src={orderItem.product.image}
                        style={{ maxWidth: "100px", height: "auto" }}
                        alt={orderItem.product.title}
                      />
                      <br />
                      Antal:{orderItem.quantity} St <br />
                      Pris: {orderItem.product.price} Kr
                      <br />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
