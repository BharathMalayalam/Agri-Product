const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: String,
  aadhar: String,
  amount: Number,
  purpose: String,
  duration: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', loanSchema);
