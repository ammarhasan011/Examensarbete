import { useEffect, useState } from "react";
import axios from "axios";

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
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("/api/orders");
      setOrders(response.data);
      console.log("response.data", response.data);
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
            Ordernummer: {order.orderNumber}
            <ul>
              {order.orderItems.map((orderItem, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  Produkt: {orderItem.product.title} <br />
                  <img
                    src={orderItem.product.image}
                    style={{ maxWidth: "100px", height: "auto" }}
                  />{" "}
                  <br />
                  Antal:{orderItem.quantity}
                  {" St"} <br />
                  Pris: {orderItem.product.price}
                  {" Kr"}
                  <br />
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
