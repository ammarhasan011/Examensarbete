const { Router } = require("express");
const { register, login, logout } = require("./user.controller");
// const { UserCreateValidationSchema } = require("./user.model");

const userRouter = Router();

userRouter
  .post("/users/register", register)
  .post("/users/login", login)
  .delete("/users/logout", logout);

module.exports = { userRouter };
