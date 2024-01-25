// Importing interfaces
import CartItem from "../Interfaces/CartItem";
import Product from "../Interfaces/Product";

// Utility function to create a CartItem from a Product
export const createCartItem = (product: Product): CartItem => ({
  // Creating a CartItem object using information from the provided Product
  product: product._id,
  quantity: 1,
  image: product.image,
  name: product.title,
  price: product.price,
  inStock: product.inStock,
});
