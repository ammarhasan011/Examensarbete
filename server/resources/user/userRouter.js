//Import required modules
const { Router } = require("express");

//Import controller functions for user
const { register, login, logout } = require("./userController");

//Import user valedation for user
// const { UserCreateValidationSchema } = require("./user.model");

//Create a new router
const userRouter = Router();

//Define routes for user operations
userRouter
  .post("/users/register", register)
  .post("/users/login", login)
  .delete("/users/logout", logout);

//Export userRouter
module.exports = { userRouter };
