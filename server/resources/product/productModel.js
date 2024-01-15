// Här har vi Mongoose schema för produkter, och en valideringsscheman med Joi
const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

//Mongoose schema
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    inStock: { type: Number, required: true, default: 0 },
    deleted: { type: Boolean, required: false, default: false },
  },
  // för att undvika att Mongoose lägger till ett __V för versionsinformation
  { versionKey: false }
);

//Här skapas en Mongoose modell
const ProductModel = models.product || model("product", ProductSchema);
// console.log("modell");

//valideringsscheman för skapande produkter/validera inkommande data
const ProductCreateValidationSchema = Joi.object({
  title: Joi.string().strict().required(),
  description: Joi.string().strict().required(),
  price: Joi.number().strict().required(),
  image: Joi.string().uri().allow("image/png", "image/jpeg").required(),
  inStock: Joi.number().strict().required(),
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
