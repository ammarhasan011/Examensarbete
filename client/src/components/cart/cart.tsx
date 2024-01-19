// Imports
import { useState, useEffect } from "react";
import Product from "../Interfaces/Product";
import CartItem from "../Interfaces/CartItem";

// Cart Component Definition
const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const newCart: CartItem[] = [
        ...prevCart,
        {
          product: product._id,
          quantity: 1,
          image: product.image,
          name: product.title,
          price: product.price,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    console.log(`Lagt till ${product.title} i varukorgen`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <div>
      <h1>Varukorg</h1>
      {cart.map((item) => (
        <div key={item.product}>
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} style={{ width: "100px" }} />
          <p>Pris: {item.price} kr</p>
          <button onClick={() => removeFromCart(item.product)}>
            Ta bort från varukorgen
          </button>
        </div>
      ))}
      <p>Totalt pris: {calculateTotalPrice()} kr</p>
    </div>
  );
};

export default Cart;
