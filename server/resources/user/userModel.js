//Import required modules
const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

//Mongoose schema
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  // To avoid Mongoose adding a __v field
  { versionKey: false }
);

//Create a Mongoose model based on the schema
const UserModel = models.user || model("user", UserSchema);

//Validation schema for creating users
const UserCreateValidationSchema = Joi.object({
  firstName: Joi.string().strict().required(),
  lastName: Joi.string().strict().required(),
  email: Joi.string().email().strict().required(),
  password: Joi.string().strict().required(),
  isAdmin: Joi.boolean().strict(),
});

//Export UserModel, UserCreateValidationSchema
module.exports = { UserModel, UserCreateValidationSchema };
