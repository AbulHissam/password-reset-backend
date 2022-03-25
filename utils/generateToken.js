const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  try {
    return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = generateToken;
