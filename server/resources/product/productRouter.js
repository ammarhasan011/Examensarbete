//Import required modules
const { Router } = require("express");

//Import controller functions for product
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

//Create a new router
const productRouter = Router();

//Define routes for user operations
productRouter
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .post("/products", addProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

//Export productRouter
module.exports = productRouter;
