import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  inStock: number;
}

const ProductManagement = () => {
  // State för att lagra produktdata
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    inStock: 0,
  });

  // Effekt för att hämta produktdata vid montering av komponenten
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Hämta alla produkter från servern
        const response: AxiosResponse<Product[]> = await axios.get(
          "/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    // Anropa funktionen fetchProducts
    fetchProducts();
  }, []); // useEffects beroendearray är tom, så den körs endast en gång vid montering

  // Funktion för att lägga till en ny produkt
  const addProduct = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Skicka en POST-förfrågan för att lägga till produkten
      const response: AxiosResponse<Product> = await axios.post(
        "/api/products",
        newProduct
      );

      // Uppdatera det lokala tillståndet med den nya produkten
      setProducts([...products, response.data]);

      // Återställ formuläret
      setNewProduct({
        title: "",
        description: "",
        price: 0,
        image: "",
        inStock: 0,
      });
    } catch (error) {
      console.error("Fel vid tillägg av produkt:", error);
    }
  };

  // Funktion för att uppdatera en befintlig produkt
  const updateProduct = async (
    productId: string,
    updatedData: Partial<Product>
  ) => {
    try {
      // Skicka en PUT-förfrågan för att uppdatera produkten
      const response: AxiosResponse<Product> = await axios.put(
        `/api/products/${productId}`,
        updatedData
      );

      // Uppdatera det lokala tillståndet med den uppdaterade produkten
      setProducts(
        products.map((product) =>
          product._id === productId ? response.data : product
        )
      );
    } catch (error) {
      console.error("Fel vid uppdatering av produkt:", error);
    }
  };

  // Funktion för att ta bort en produkt
  const deleteProduct = async (productId: string) => {
    try {
      // Skicka en DELETE-förfrågan för att ta bort produkten
      await axios.delete(`/api/products/${productId}`);

      // Uppdatera det lokala tillståndet genom att ta bort den borttagna produkten
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
    }
  };

  // Funktion för att hantera ändringar i formuläret för ny produkt
  const handleNewProductChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  // Rendera produktdata och ge användargränssnitt för produktadministration
  return (
    <div>
      <h1>Produkthantering</h1>
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
      <h2>radera eller ändra produkt</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.title}</p>
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: "100px", height: "auto" }}
            />
            <p>Beskrivning: {product.description} </p>
            <p>Pris: {product.price} Kr</p>
            <p>Antal: {product.inStock} St</p>

            <button
              onClick={() =>
                updateProduct(product._id, { title: "Uppdaterad produkt" })
              }
            >
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
