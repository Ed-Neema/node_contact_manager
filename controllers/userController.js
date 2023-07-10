const asyncHandler = require("express-async-handler");

//@desc Register a user
//@route POST /api/user/register
//@access public

const registerUser = asyncHandler(async(req, res) => {
  res.json({ message: "Register the user" });
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

const currentUser = asyncHandler(async(req, res) => {
  res.json({ message: "current user info" });
});

module.exports = { registerUser, loginUser, currentUser };
