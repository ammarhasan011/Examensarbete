// Import required modules
const { UserModel } = require("./userModel");
const bcrypt = require("bcrypt");

// Function to register a user
async function register(req, res) {
  //check if user already exists
  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // Create a new user instance
  const user = new UserModel(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  // Prepare the user data to send in the response
  const jsonUser = user.toJSON();
  jsonUser._id = user._id;
  delete jsonUser.password;

  res.status(201).send(jsonUser);
  console.log("created user");
}

// Function to handle user login
async function login(req, res) {
  console.log("Before login check:", req.session);

  // Check if username & password is correct
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

  // Clear existing session and set a new one
  req.session = null;
  req.session = user;

  // Send user data in the response
  res.status(200).json(user);
  console.log("Login succeeded");
  console.log("After login check:", req.session);
}

// Function to logout a user
async function logout(req, res) {
  console.log("session before logged out:", req.session);
  if (!req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  // Clear session
  req.session = null;

  // Send a success message
  res.status(200).json({ message: "User logged out successfully", data: null });
  console.log("session after logged out:", req.session);
}

// Function to check if a user is authorized (logged in)
async function authorize(req, res) {
  if (!req.session._id) {
    return res
      .status(200)
      .json({ message: "You are not logged in", session: req.session });
  }
  res.status(200).json(req.session);
}

//Exporting register, login, logout, authorize
module.exports = { register, login, logout, authorize };
