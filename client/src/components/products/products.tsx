// Imports
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Interfaces/Product";
import MultiActionAreaCard from "../Cards/Cards";
import "./products.css";
import CartItem from "../Interfaces/CartItem";
import { createCartItem } from "../Utils/CartUtils";

// Products Component Definition
const Products = () => {
  // State hooks to manage products and cart
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initialize cart state from localStorage or an empty array
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Fetch products from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });
  }, []);

  // Function to add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingItem = prevCart.find(
        (item) => item.product === product._id
      );

      if (existingItem) {
        // If the product is already in the cart, increment the quantity if the stock allows
        const updatedCart = prevCart.map((item) =>
          item.product === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + 1 <= product.inStock
                    ? item.quantity + 1
                    : item.quantity,
              }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        // If the product is not in the cart, add it as a new entry if the stock allows
        const newCart: CartItem[] =
          product.inStock > 0
            ? [
                ...prevCart,
                {
                  ...createCartItem(product),
                  quantity: 1,
                },
              ]
            : [...prevCart]; // Do not add if stock is 0
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });

    console.log(`Produkten: ${product.title} är lagt i varukorgen`);
  };
  console.log(cart);

  // Render the Products component with a list of product cards
  return (
    <div>
      <h1 className="Title">Produkter</h1>
      <div className="CardDiv">
        {products.map((product) => (
          <MultiActionAreaCard
            key={product._id}
            product={{
              _id: product._id,
              title: product.title,
              description: product.description,
              image: product.image,
              price: product.price,
              inStock: product.inStock,
            }}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
