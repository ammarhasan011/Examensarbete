const { model, Schema, models } = require("mongoose");
const Joi = require("joi");

// Define the schema for individual order items
const OrderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { _id: false }
);

// Define the main order schema
const OrderSchema = new Schema({
  orderNumber: {
    type: Number,
    required: true,
    default: Math.floor(Math.random() * 1000000),
  },
  customerId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  orderItems: { type: [OrderItemSchema], required: true },
});

// Create or retrieve the OrderModel based on the presence of an existing model
const OrderModel = models.order || model("order", OrderSchema);

// Define validation schemas for order creation and update
const OrderCreateValidationSchema = Joi.object({
  orderItems: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().strict().required(),
        quantity: Joi.number().strict().required(),
        price: Joi.number(),
      })
    )
    .strict()
    .required(),
});

const OrderUpdateValidationSchema = OrderCreateValidationSchema.keys({
  _id: Joi.string().strict().required(),
});

module.exports = {
  OrderModel,
  OrderCreateValidationSchema,
  OrderUpdateValidationSchema,
};
