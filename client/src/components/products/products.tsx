import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../inter-faces/product";
import MultiActionAreaCard from "../cards/cards";

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
      <h1>Produkter</h1>
      {/* Renders a list of products using MultiActionAreaCard */}
      <div style={{ display: "flex", gap: "16px" }}>
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
