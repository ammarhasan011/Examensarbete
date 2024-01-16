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
  // email: Joi.string().email().strict().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .strict()
    .required()
    .messages({
      "string.email": "Email måste vara en giltig e-postadress",
      "any.required": "Email är obligatoriskt",
    }),
  // password: Joi.string().strict().min(5).required(),
  password: Joi.string().strict().min(5).required().messages({
    "string.min": "Lösenordet måste vara minst 5 tecken långt",
    "any.required": "Lösenord är obligatoriskt",
  }),
  isAdmin: Joi.boolean().strict(),
});

//Export UserModel, UserCreateValidationSchema
module.exports = { UserModel, UserCreateValidationSchema };
