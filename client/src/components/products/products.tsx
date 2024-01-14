import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../inter-faces/product";
import MultiActionAreaCard from "../cards/cards";
import "./product.css";

// Creates a functional component Products using React Hook,
const Products = () => {
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
