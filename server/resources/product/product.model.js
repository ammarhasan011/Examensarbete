// Här har vi Mongoose schema för produkter, och en valideringsscheman med Joi
const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

//Mongoose schema
const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    inStock: { type: Number, require: true, default: 0 },
    deleted: { type: Boolean, required: false, default: false },
  },
  // för att undvika att Mongoose lägger till ett __V för versionsinformation
  { versionKey: false }
);

//Här skapas en Mongoose modell
const ProductModel = models.product || model("product", ProductSchema);

//valideringsscheman för skapande produkter/validera inkommande data
const ProductCreateValidationSchema = Joi.object({
  title: Joi.String().strict().required(),
  description: Joi.String().strict().required(),
  price: Joi.Number().strict().required(),
  inStock: Joi.Number().strict().required(),
});
// En schema för uppdateringar av produkter, men lägger krav på id & delete
const ProductUpdateValidationSchema = ProductCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
  deleted: Joi.boolean().strict().required(),
});

module.exports = {
  ProductSchema,
  ProductModel,
  ProductCreateValidationSchema,
  ProductUpdateValidationSchema,
};
