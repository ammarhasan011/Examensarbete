const { UserModel } = require("./user.model");
const bcrypt = require("bcrypt");

async function register(req, res) {
  //kolla om user redan finns
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json("Email already registered");
  }
  const user = new UserModel(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const jsonUser = user.toJSON();
  jsonUser._id = user._id;
  delete jsonUser.password;

  res.status(201).send(jsonUser);
}
async function login(req, res) {
  // Check if username and password is correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    return res.status(401).json("Wrong password or username");
  }
}
