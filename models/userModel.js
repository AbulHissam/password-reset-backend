const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  // only hash the password if it is modified or new
  if (!user.isNew || !user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  const user = this;
  return bcrypt.compare(enteredPassword, user.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
