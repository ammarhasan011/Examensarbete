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
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
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

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      // Kontrollerar om produkten redan finns i varukorgen
      const existingItem = prevCart.find(
        (item) => item.product === product._id
      );

      if (existingItem) {
        // Om produkten redan finns, öka bara kvantiteten
        const updatedCart = prevCart.map((item) =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        // Om produkten inte finns, lägg till som ny post
        const newCart: CartItem[] = [...prevCart, createCartItem(product)];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });

    console.log(`Produkten: ${product.title} är lagt i varukorgen`);
  };
  console.log(cart);

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
