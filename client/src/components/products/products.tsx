//Imports
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Interfaces/Product";
import MultiActionAreaCard from "../Cards/Cards";
import "./product.css";

// Products Component Definition
const Products = () => {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);

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
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
