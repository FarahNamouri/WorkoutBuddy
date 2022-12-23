const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "ninjadojoshifuyoshimraooluigipeachbowser", {
    expiresIn: "3d",
  });
};
// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body // comes with the post request
  try {
    const user = await User.login(email, password);

    // Create a token :
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // ✨ it will return the new document created inside monogoDB
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ msg: "Login User" });
};

// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    // Create a token :
    const token = createToken(user._id);

    res.status(200).json({ email, token, password }); // ✨ it will return the new document created inside monogoDB
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
