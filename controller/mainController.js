const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const registerAccount = async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPass,
    member: 0,
    admin: 0,
  });

  await newUser.save();

  res.redirect("/");
};

module.exports = { registerAccount };
