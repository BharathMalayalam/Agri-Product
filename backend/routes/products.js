const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const router = express.Router();

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// POST route to add product with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : '';

    const newProduct = new Product({
      name,
      quantity,
      price,
      image: imageUrl
    });

    await newProduct.save();
    res.json({ message: 'Product saved successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// GET route to fetch products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
