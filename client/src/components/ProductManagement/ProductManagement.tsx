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
