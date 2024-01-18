//Imports
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Interfaces/Product";
import MultiActionAreaCard from "../Cards/Cards";
import "./products.css";

// Products Component Definition
const Products = () => {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // Use storedCart within useState to initialize cart
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  //Products from database
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
      const newCart = [...prevCart, product];
      // Spara varukorgen i localStorage
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    console.log(`Lägg till ${product.title} i varukorgen`);
  };
  return (
    // Render component
    <div>
      {/* Renders a list of products using MultiActionAreaCard */}
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
      {/* <h2>Varukorg</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Products;
