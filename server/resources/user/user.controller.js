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

  //spara till json eller server
}
