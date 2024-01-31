// Imports
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";

// Define the Product interface with its properties
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
}

// Define the props interface for the ProductManagementLogic component
interface ProductManagementLogicProps {
  products: Product[];
  newProduct: Product;
  updateFormData: Product;
  addProduct: (event: FormEvent) => void;
  updateProductDynamic: (productId: string) => void;
  handleUpdateFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  deleteProduct: (productId: string) => void;
  handleNewProductChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Custom hook to encapsulate product management logic
const useProductManagementLogic = (): ProductManagementLogicProps => {
  // State to store product data
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    image: "",
    inStock: 0,
  });

  // Effect to fetch product data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products from the server
        const response: AxiosResponse<Product[]> = await axios.get(
          "/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, []); // useEffect dependency array is empty, so it runs only once on mount

  // Function to add a new product
  const addProduct = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Extract relevant properties from newProduct
      const { title, description, price, image, inStock } = newProduct;
      const response: AxiosResponse<Product> = await axios.post(
        "/api/products",
        { title, description, price, image, inStock }
      );

      // Update the local state with the new product
      setProducts([...products, response.data]);

      // Reset the newProduct form, retaining _id as an empty string
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        _id: "", // Reset _id to empty string
      }));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // State for update form data
  const [updateFormData, setUpdateFormData] = useState<Product>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    image: "",
    inStock: 0,
  });

  // Function to update an existing product dynamically
  const updateProductDynamic = async (productId: string) => {
    try {
      // Create a copy of the current state for the update form
      const updatedData = { ...updateFormData, _id: productId };

      // Send a PUT request to update the product with dynamic values
      const response: AxiosResponse<Product> = await axios.put(
        `/api/products/${productId}`,
        updatedData
      );

      // Update the local state with the updated product
      setProducts(
        products.map((product) =>
          product._id === productId ? response.data : product
        )
      );

      // Reset the update form
      setUpdateFormData({
        _id: "",
        title: "",
        description: "",
        price: 0,
        image: "",
        inStock: 0,
      });
    } catch (error) {
      console.error("Fel vid uppdatering av produkt:", error);
    }
  };

  // Function to handle changes in the update form
  const handleUpdateFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Update the updateFormData state with the changed input values
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle changes in the new product form
  const handleNewProductChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Update the newProduct state with the changed input values
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Function to delete a product
  const deleteProduct = async (productId: string) => {
    try {
      // Send a DELETE request to remove the product
      await axios.delete(`/api/products/${productId}`);

      // Update the local state by removing the deleted product
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  };

  // Return the necessary state and functions as props for the component
  return {
    products,
    newProduct,
    updateFormData,
    addProduct,
    updateProductDynamic,
    handleUpdateFormChange,
    deleteProduct,
    handleNewProductChange,
  };
};

// Export the custom hook for use in other components
export default useProductManagementLogic;
