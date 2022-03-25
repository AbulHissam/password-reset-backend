const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;
