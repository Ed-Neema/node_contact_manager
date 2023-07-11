const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
//@desc Register a user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  //check if email adddress already exists
  const userAvailable = await User.findOne({
    // email:email
    email,
  });
  console.log(userAvailable);
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //   create new user if email address doesn't exit

  // Hash Password
  //raw password, number of salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);
//   console.log("Hashed Password: ", hashedPassword);
 
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User created ${user}`);
  // if user has been created successfully
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User not created");
  }
});


//@desc Login a user
//@route POST /api/user/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});

//@desc Current user info
//@route POST /api/user/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user info" });
});

module.exports = { registerUser, loginUser, currentUser };
