// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
// import axios, { AxiosResponse } from "axios";

// // Define the Product interface
// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   inStock: number;
// }

// const ProductManagement = () => {
//   // State to store product data
//   const [products, setProducts] = useState<Product[]>([]);
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     description: "",
//     price: 0,
//     image: "",
//     inStock: 0,
//   });

//   // Effect to fetch product data on component mount
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Fetch all products from the server
//         const response: AxiosResponse<Product[]> = await axios.get(
//           "/api/products"
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Fel vid hämtning av produkter:", error);
//       }
//     };

//     // Call the fetchProducts function
//     fetchProducts();
//   }, []); // useEffect dependency array is empty, so it runs only once on mount

//   // Function to add a new product
//   const addProduct = async (event: FormEvent) => {
//     event.preventDefault();

//     try {
//       // Send a POST request to add the product
//       const response: AxiosResponse<Product> = await axios.post(
//         "/api/products",
//         newProduct
//       );

//       // Update the local state with the new product
//       setProducts([...products, response.data]);

//       // Reset the form
//       setNewProduct({
//         title: "",
//         description: "",
//         price: 0,
//         image: "",
//         inStock: 0,
//       });
//     } catch (error) {
//       console.error("Fel vid tillägg av produkt:", error);
//     }
//   };

//   // State for update form data
//   const [updateFormData, setUpdateFormData] = useState({
//     title: "",
//     description: "",
//     price: 0,
//     image: "",
//     inStock: 0,
//   });

//   // Function to update an existing product
//   const updateProductDynamic = async (productId: string) => {
//     try {
//       // Create a copy of the current state for the update form
//       const updatedData = { ...updateFormData, _id: productId };

//       // Send a PUT request to update the product with dynamic values
//       const response: AxiosResponse<Product> = await axios.put(
//         `/api/products/${productId}`,
//         updatedData
//       );

//       // Update the local state with the updated product
//       setProducts(
//         products.map((product) =>
//           product._id === productId ? response.data : product
//         )
//       );

//       // Reset the update form
//       setUpdateFormData({
//         title: "",
//         description: "",
//         price: 0,
//         image: "",
//         inStock: 0,
//       });
//     } catch (error) {
//       console.error("Fel vid uppdatering av produkt:", error);
//     }
//   };

//   // Function to handle changes in the update form
//   const handleUpdateFormChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setUpdateFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Funktion för att ta bort en produkt
//   const deleteProduct = async (productId: string) => {
//     try {
//       // Send a DELETE request to remove the product
//       await axios.delete(`/api/products/${productId}`);

//       // Update the local state by removing the deleted product
//       setProducts(products.filter((product) => product._id !== productId));
//     } catch (error) {
//       console.error("Fel vid borttagning av produkt:", error);
//     }
//   };

//   // Function to handle changes in the new product form
//   const handleNewProductChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
//   };

//   // Render product data and provide a user interface for product management
//   return (
//     <div>
//       <h1>Produkthantering</h1>
//       <form onSubmit={addProduct}>
//         <h2>Lägg till produkt</h2>
//         <label>
//           Titel:
//           <input
//             type="text"
//             name="title"
//             value={newProduct.title}
//             onChange={handleNewProductChange}
//           />
//         </label>{" "}
//         <br />
//         <label>
//           Beskrivning:
//           <input
//             type="text"
//             name="description"
//             value={newProduct.description}
//             onChange={handleNewProductChange}
//           />{" "}
//           <br />
//         </label>
//         <label>
//           Pris:
//           <input
//             type="number"
//             name="price"
//             value={newProduct.price}
//             onChange={handleNewProductChange}
//           />{" "}
//           <br />
//         </label>
//         <label>
//           Bild (URL):
//           <input
//             type="text"
//             name="image"
//             value={newProduct.image}
//             onChange={handleNewProductChange}
//           />{" "}
//           <br />
//         </label>
//         <label>
//           Antal i lager:
//           <input
//             type="number"
//             name="inStock"
//             value={newProduct.inStock}
//             onChange={handleNewProductChange}
//           />
//         </label>{" "}
//         <br />
//         <button type="submit">Lägg till produkt</button>
//       </form>
//       <br />
//       <h2> Ändra produkt</h2>
//       {/* uppdateringsformulär */}
//       <label>
//         Ny titel:
//         <input
//           type="text"
//           name="title"
//           value={updateFormData.title}
//           onChange={handleUpdateFormChange}
//         />
//       </label>
//       <br />
//       <label>
//         Ny beskrivning:
//         <input
//           type="text"
//           name="description"
//           value={updateFormData.description}
//           onChange={handleUpdateFormChange}
//         />
//       </label>
//       <br />
//       <label>
//         Nytt pris:
//         <input
//           type="number"
//           name="price"
//           value={updateFormData.price}
//           onChange={handleUpdateFormChange}
//         />
//       </label>
//       <br />
//       <label>
//         Ny bild (URL):
//         <input
//           type="text"
//           name="image"
//           value={updateFormData.image}
//           onChange={handleUpdateFormChange}
//         />
//       </label>
//       <br />
//       <label>
//         Nytt antal i lager:
//         <input
//           type="number"
//           name="inStock"
//           value={updateFormData.inStock}
//           onChange={handleUpdateFormChange}
//         />
//       </label>
//       <h2>Radera eller ändra produkt</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <p>{product.title}</p>
//             <img
//               src={product.image}
//               alt={product.title}
//               style={{ maxWidth: "100px", height: "auto" }}
//             />
//             <p>Beskrivning: {product.description} </p>
//             <p>Pris: {product.price} Kr</p>
//             <p>Antal: {product.inStock} St</p>

//             <button onClick={() => updateProductDynamic(product._id)}>
//               Uppdatera
//             </button>

//             <button onClick={() => deleteProduct(product._id)}>Ta bort</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductManagement;

import React from "react";
import useProductManagementLogic from "./ProductManagementLogic";

// Define the ProductManagement component
const ProductManagement: React.FC = () => {
  // Destructure values and functions from the custom hook
  const {
    products,
    newProduct,
    updateFormData,
    addProduct,
    updateProductDynamic,
    handleUpdateFormChange,
    deleteProduct,
    handleNewProductChange,
  } = useProductManagementLogic();

  // Render the ProductManagement component
  return (
    <div>
      <h1>Produkthantering</h1>
      {/* Form for adding a new product */}
      <form onSubmit={addProduct}>
        <h2>Lägg till produkt</h2>
        <label>
          Titel:
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleNewProductChange}
          />
        </label>{" "}
        <br />
        <label>
          Beskrivning:
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
          />{" "}
          <br />
        </label>
        <label>
          Pris:
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
          />{" "}
          <br />
        </label>
        <label>
          Bild (URL):
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleNewProductChange}
          />{" "}
          <br />
        </label>
        <label>
          Antal i lager:
          <input
            type="number"
            name="inStock"
            value={newProduct.inStock}
            onChange={handleNewProductChange}
          />
        </label>{" "}
        <br />
        <button type="submit">Lägg till produkt</button>
      </form>
      <br />
      <h2> Ändra produkt</h2>
      {/* uppdateringsformulär */}
      <label>
        Ny titel:
        <input
          type="text"
          name="title"
          value={updateFormData.title}
          onChange={handleUpdateFormChange}
        />
      </label>
      <br />
      <label>
        Ny beskrivning:
        <input
          type="text"
          name="description"
          value={updateFormData.description}
          onChange={handleUpdateFormChange}
        />
      </label>
      <br />
      <label>
        Nytt pris:
        <input
          type="number"
          name="price"
          value={updateFormData.price}
          onChange={handleUpdateFormChange}
        />
      </label>
      <br />
      <label>
        Ny bild (URL):
        <input
          type="text"
          name="image"
          value={updateFormData.image}
          onChange={handleUpdateFormChange}
        />
      </label>
      <br />
      <label>
        Nytt antal i lager:
        <input
          type="number"
          name="inStock"
          value={updateFormData.inStock}
          onChange={handleUpdateFormChange}
        />
      </label>
      <h2>Radera eller ändra produkt</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.title}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100px", height: "auto" }}
            />
            <p>Beskrivning: {product.description}</p>
            <p>Pris: {product.price} Kr</p>
            <p>Antal: {product.inStock} St</p>

            <button onClick={() => updateProductDynamic(product._id)}>
              Uppdatera
            </button>
            <button onClick={() => deleteProduct(product._id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
