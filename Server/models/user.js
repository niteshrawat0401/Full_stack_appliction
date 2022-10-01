const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: String,
  passWord: String,
  email: String,
  mobile: String,
});

const User = model("User", userSchema);
module.exports = User;
