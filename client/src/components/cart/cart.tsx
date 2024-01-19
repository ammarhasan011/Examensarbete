// Imports
import { useState, useEffect } from "react";
import Product from "../Interfaces/Product";

// Cart Component Definition
const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    console.log(`Lagt till ${product.title} i varukorgen`);
  };

  return (
    <div>
      <h1>Varukorg</h1>
      {cart.map((product) => (
        <div key={product._id}>
          <p>{product.title}</p>
          <p>Pris: {product.price} kr</p>
        </div>
      ))}
      <p>Totalt pris: {calculateTotalPrice()} kr</p>
    </div>
  );
};

export default Cart;
