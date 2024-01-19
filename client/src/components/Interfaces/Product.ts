// product interface defining the structure
interface Product {
  title: string;
  _id: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
  deleted?: boolean;
  quantity?: number;
}

export default Product;
