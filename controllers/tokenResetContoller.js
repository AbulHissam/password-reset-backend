const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const Token = require("../models/tokenModel");
const User = require("../models/userModel");
const { use } = require("../routes/user");

const requestPasswordReset = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    res.json(400);
    throw new Error("email or password is missing");
  }

  // check if a user exist or not
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error(`user doesnt exists with mail ${email}`);
  }

  // check if a token already exists for user
  const token = await Token.findOne({ user: user._id });

  // if a token already exists delete it,because we are going to create a new token
  if (token) await Token.deleteOne({ user: user._id });

  // generating resetToken,hashing it
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 10);
  // creating new token
  await Token.create({
    user: user._id,
    token: hash,
    createdAt: Date.now(),
  });

  //sending reset link
  res.status(200).send({
    url: `http://localhost:5000/api/auth/resetPassword?token=${resetToken}`,
  });
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.query;

  const { email, password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("password is missing");
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("invalid user");
  }

  // if user exists find token for that user
  const storedToken = await Token.findOne({ user: user._id });

  if (!storedToken) {
    res.status(400);
    throw new Error("token expired or invalid");
  }

  // token is hashed and stored in db,so compare it whether it is correct
  const isValid = await bcrypt.compare(token, storedToken.token);

  if (!isValid) {
    res.status(200);
    throw new Error("Invalid or expired password reset token");
  }

  // has the new password
  const hashedNewPassword = await bcrypt.hash(password, 10);

  // update the password
  await User.findByIdAndUpdate(
    user._id,
    { $set: { password: hashedNewPassword } },
    { new: true }
  );

  //  delete the token after password reset was successful
  await Token.deleteOne({ user: user._id });

  res.sendStatus(200);
});

module.exports = { requestPasswordReset, resetPassword };
