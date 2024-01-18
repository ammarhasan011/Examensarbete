import { useState } from "react";
import Product from "../Interfaces/Product";

const Cart = () => {
  // State för varukorgen
  const [cart, setCart] = useState([Product]);

  // Funktion för att lägga till en produkt i varukorgen
  const addToCart = (product: Product) => {
    // Skapa en kopia av den befintliga varukorgen och lägg till den nya produkten
    const newCart = [...cart, product];
    setCart(newCart);
  };

  return (
    <div>
      <h1>Varukorg</h1>
      {/* Loopa igenom varukorgen och visa produkter */}
      {cart.map((product, index) => (
        <div key={index}>
          <p>{product.title}</p>
          <p>Pris: {product.price} kr</p>
          {/* Eventuellt annan information om produkten */}
        </div>
      ))}
    </div>
  );
};

export default Cart;
