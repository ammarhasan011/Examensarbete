import { useState, useEffect } from "react";
import Product from "../Interfaces/Product";

const Cart = () => {
  // Hämta varukorgen från localStorage vid komponentens första render
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState<Product[]>(initialCart);

  // Uppdatera localStorage varje gång varukorgen ändras
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div>
      <h1>Varukorg</h1>
      {cart.map((product, index) => (
        <div key={index}>
          <p>{product.title}</p>
          <p>Pris: {product.price} kr</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
