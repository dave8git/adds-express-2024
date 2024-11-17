const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, required: true, minlength: 1, maxlength: 10 },
  password: { type: String, required: true, minlength: 8 },
  avatar: { type: String, required: false },
  phone: { type: String, required: false },
    
});

module.exports = mongoose.model("user", userSchema);