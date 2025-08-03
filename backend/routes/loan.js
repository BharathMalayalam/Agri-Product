const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

router.post('/apply', async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json({ message: 'Loan application submitted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting application' });
  }
});

router.get('/', async (req, res) => {
  const loans = await Loan.find();
  res.json(loans);
});

module.exports = router;
