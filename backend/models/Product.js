const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  image: String,
  category: String,
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  farmerName: String
});

module.exports = mongoose.model('Product', productSchema);
