const { UserModel } = require("./userModel");
const bcrypt = require("bcrypt");

async function register(req, res) {
  //check if user already exists
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
  console.log("created user");
}

async function login(req, res) {
  console.log("Before login check:", req.session);
  // Check if username and password is correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    console.log("Before loged in user");
    return res.status(401).json("Wrong password or username");
  }

  //Creates a user object
  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  // Check if user already is logged in
  if (req.session._id) {
    console.log("already logged in");
    console.log(req.session._id);

    return res.status(200).json(user);
  }
  req.session = null;
  // Save info about the user to the session (an encrypted cookie stored on the client)
  req.session = user;
  res.status(200).json(user);
  console.log("Login succeeded");
  console.log("After login check:", req.session);
}

// Logout user & remove cookie & session
async function logout(req, res) {
  console.log("session before logged out:", req.session);
  if (!req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  // res.status(204).json(null);
  res.status(200).json({ message: "User logged out successfully", data: null });
  console.log("session after logged out:", req.session);
}

async function authorize(req, res) {
  if (!req.session._id) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session);
}

module.exports = { register, login, logout, authorize };
