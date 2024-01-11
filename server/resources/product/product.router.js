const express = require("express");
const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./product.controller");

const productRouter = Router();

productRouter
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .post("/products", addProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

module.exports = productRouter;

// //Hämta alla produkter
// Router.get("/products", getAllProducts);

// //Hämta en produkt
// Router.get("products/:id", getProduct);

// //Lägg till produkt
// Router.post("/products", addProduct);

// //Uppdatera en produkt
// Router.put("products/:id", updateProduct);

// //Radera en produkt
// Router.delete("products/:id", deleteProduct);

// module.exports = productRouter;
