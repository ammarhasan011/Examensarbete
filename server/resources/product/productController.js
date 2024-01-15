const { ProductModel } = require("./productModel");

//Hämta alla produkter
async function getAllProducts(req, res) {
  const products = await ProductModel.find({ deleted: false });
  res.status(200).json(products);
}

//Hämta en produkt
async function getProduct(req, res) {
  const product = await ProductModel.findOne({
    _id: req.params.id,
    deleted: false,
  });
  res.status(200).json(product);
}

//Lägg till produkt
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

//Uppdatera en produkt
async function updateProduct(req, res) {
  if (req.body._id !== req.params.id) {
    return res.status(400).json("Body and param id are not the same");
  }
  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(product);
}

//Radera en produkt
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

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
