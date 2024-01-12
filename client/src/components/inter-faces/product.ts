interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  deleted?: boolean;
}
export default Product;
