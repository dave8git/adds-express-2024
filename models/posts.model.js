const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 1000 },
  date: { type: String, required: true },
  image: { type: String, required: false },
  price: { type: String, required: true },
  location: { type: String, required: true },
  seller: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true } // Added author field
});

module.exports = mongoose.model("post", postSchema);