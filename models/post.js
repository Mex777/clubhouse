const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  author: String,
  content: String,
  date: Date,
});

const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;
