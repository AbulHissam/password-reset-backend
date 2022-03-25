const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("name or email or password is missing");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(`user with email ${email} already exists`);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken({ id: user._id, email }),
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("email or password is missing");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("invalid email");
  }

  const passwordMatches = await user.comparePassword(password);

  if (!passwordMatches) {
    res.status(400);
    throw new Error("invalid credentials");
  }

  res.status(200).send({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken({ id: user._id, email }),
  });
});

module.exports = { signup, login };
