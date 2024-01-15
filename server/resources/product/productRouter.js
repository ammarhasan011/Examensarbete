const { Router } = require("express");
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("./productController");

const productRouter = Router();

productRouter
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .post("/products", addProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

module.exports = productRouter;
