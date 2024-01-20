// Imports
import { useState, useEffect } from "react";
import CartItem from "../Interfaces/CartItem";
import Checkout from "../Checkout/Checkout";

// Cart Component Definition
const Cart = () => {
  // State hook to manage the cart items
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Use effect to initialize the cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  console.log("Cart:", cart);

  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to increase the quantity of a product in the cart
  const increaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.product === productId) {
          // Check if there is enough stock before increasing the quantity
          const newQuantity = item.quantity + 1;
          if (newQuantity <= item.inStock) {
            return { ...item, quantity: newQuantity };
          } else {
            // If stock is insufficient, return the existing item without modifying it
            return item;
          }
        } else {
          return item;
        }
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Function to decrease the quantity of a product in the cart
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

  // Function to remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.product !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Effect to check login status
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await fetch("/api/users/authorize");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setIsLoggedIn(data.loggedIn);
  //         console.log("User is logged in:", data.loggedIn);
  //       } else {
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       setIsLoggedIn(false);
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  // Render the Cart component with a list of cart items
  return (
    <div>
      <h1>Varukorg</h1>
      {cart.map((item) => (
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
      {/* {isLoggedIn === true ? ( */}
      <Checkout />
      {/* ) : (
        <p>Logga in för att kunna betala</p>
      )} */}
    </div>
  );
};

export default Cart;
