// Imports
import { useState, useEffect } from "react";
// import Product from "../Interfaces/Product";
import CartItem from "../Interfaces/CartItem";
// import { createCartItem, updateCartQuantity } from "../Utils/CartUtils";

// Cart Component Definition
const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    // console.log("Stored Cart:", storedCart);
  }, []);

  console.log("Cart:", cart);
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // const addToCart = (product: Product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find(
  //       (item) => item.product === product._id
  //     );
  //     if (existingItem) {
  //       const updatedCart = updateCartQuantity(
  //         prevCart,
  //         product._id,
  //         existingItem.quantity + 1
  //       );
  //       localStorage.setItem("cart", JSON.stringify(updatedCart));
  //       return updatedCart;
  //     } else {
  //       const newCart: CartItem[] = [...prevCart, createCartItem(product)];
  //       localStorage.setItem("cart", JSON.stringify(newCart));
  //       return newCart;
  //     }
  //   });

  //   console.log(`Lagt till ${product.title} i varukorgen`);
  // };

  const increaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.product === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.product === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
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
        // <div key={item.product}>
        <div key={`${item.product}-${item.quantity}`}>
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} style={{ width: "100px" }} />
          <p>Antal: {item.quantity}</p>
          <p>Pris: {item.price} kr</p>
          <button onClick={() => increaseQuantity(item.product)}>+</button>
          <button onClick={() => decreaseQuantity(item.product)}>-</button>
          <button onClick={() => removeFromCart(item.product)}>Ta bort</button>
        </div>
      ))}
      <p>Totalt pris: {calculateTotalPrice()} kr</p>
    </div>
  );
};

export default Cart;
