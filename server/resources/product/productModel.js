//Import required modules
const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

//Mongoose schema, products
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
    deleted: { type: Boolean, required: false, default: false },
  },
  // To avoid Mongoose adding a __v field
  { versionKey: false }
);

// Creating a Mongoose model, products
const ProductModel = models.product || model("product", ProductSchema);

// Validation schema for creating products/validating incoming data
const ProductCreateValidationSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
  price: Joi.number().strict().required(),
  image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
  inStock: Joi.number().strict().required(),
});
// Schema for updating products, with additional requirements for id & delete
const ProductUpdateValidationSchema = ProductCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
  deleted: Joi.boolean().strict().required(),
});

// Exporting the schemas and model
module.exports = {
  ProductSchema,
  ProductModel,
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
};
