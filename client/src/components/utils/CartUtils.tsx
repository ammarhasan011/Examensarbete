import CartItem from "../Interfaces/CartItem";
import Product from "../Interfaces/Product";

export const createCartItem = (product: Product): CartItem => ({
  product: product._id,
  quantity: 1,
  image: product.image,
  name: product.title,
  price: product.price,
});

// export const updateCartQuantity = (
//   cart: CartItem[],
//   productId: string,
//   newQuantity: number
// ): CartItem[] => {
//   return cart
//     .map((item) =>
//       item.product === productId ? { ...item, quantity: newQuantity } : item
//     )
//     .filter((item) => item.quantity > 0);
// };
