// product nterface defining the structure
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  deleted?: boolean;
}

export default Product;
