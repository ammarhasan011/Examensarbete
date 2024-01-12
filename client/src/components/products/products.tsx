import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../inter-faces/product";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

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
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price:{product.price} Kr</p>
            <img src={product.image} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
