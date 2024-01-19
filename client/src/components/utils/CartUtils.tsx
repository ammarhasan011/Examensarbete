import CartItem from "../Interfaces/CartItem";
import Product from "../Interfaces/Product";

export const createCartItem = (product: Product): CartItem => ({
  product: product._id,
  quantity: 1,
  image: product.image,
  name: product.title,
  price: product.price,
});
