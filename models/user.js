const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  password: String,
  admin: Number,
  member: Number,
});

const userModel = mongoose.model("User", User);
module.exports = userModel;
