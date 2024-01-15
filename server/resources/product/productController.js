//Import required modules
const { ProductModel } = require("./productModel");

// Function get all products
async function getAllProducts(req, res) {
  const products = await ProductModel.find({ deleted: false });
  res.status(200).json(products);
}

// Function get one products
async function getProduct(req, res) {
  const product = await ProductModel.findOne({
    _id: req.params.id,
    deleted: false,
  });
  res.status(200).json(product);
}

// Function create a products
async function addProduct(req, res, next) {
  try {
    console.log("Request Body:", req.body);

    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// Function to update a product
async function updateProduct(req, res) {
  if (req.body._id !== req.params.id) {
    return res.status(400).json("Body and param id are not the same");
  }

  // Find and update the product
  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(product);
}

// Function to delete a product
async function deleteProduct(req, res) {
  try {
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedProduct) {
      return res.status(404).json("Product not found");
    }
    res.status(200).json("The product has been deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Export getAllProducts, getProduct, addProduct,updateProduct, deleteProduct
module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
