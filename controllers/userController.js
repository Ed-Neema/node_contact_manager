const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields mandatory");
  }

  // chech if user exists in db
  const user = await User.findOne({ email });
  // compare passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      //   secret
      process.env.ACCESS_TOKEN_SECRET,
    //   expiration date
    { expiresIn: '1h' }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401)
    throw new Error("Email or Password invalid ")
  }
});

//@desc Current user info
//@route POST /api/user/current
//@access private
//user has to pass access token to be able to access this route
const currentUser = asyncHandler(async (req, res) => {
    // user that has been decoded
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
