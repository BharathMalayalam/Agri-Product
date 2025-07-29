const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: 'Signup successful!', role: user.role });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ userid: req.body.userid, password: req.body.password });
  if (!user) return res.status(401).json({ message: 'Login failed' });
  res.json({ message: 'Login successful!', role: user.role });
});

module.exports = router;