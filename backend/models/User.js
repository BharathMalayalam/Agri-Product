const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  name: String,
  userid: String,
  password: String,
  phone: String,
  email: String,
  role: String
}));