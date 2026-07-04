const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Place a new order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Decrease product quantity
        for (const item of order.products) {
            await Product.findByIdAndUpdate(item.product, { $inc: { quantity: -item.quantity } });
        }

        res.status(201).json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Get ALL orders (for Admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('customer').populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch all orders' });
    }
});


// Get orders for a specific customer
router.get('/customer/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.userId }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get orders for a specific farmer (products belonging to farmer)
// This is a bit complex since an order can have mixed products.
// For simplicity, we will fetch ALL orders and let frontend filter, OR
// we can find orders where 'products.product' matches products owned by farmer.
router.get('/farmer/:farmerId', async (req, res) => {
    try {
        // 1. Find all products by this farmer
        const farmerProducts = await Product.find({ farmer: req.params.farmerId }).select('_id');
        const productIds = farmerProducts.map(p => p._id);

        // 2. Find orders that contain ANY of these products
        const orders = await Order.find({ "products.product": { $in: productIds } })
            .populate('products.product')
            .populate('customer', 'name phone address');

        // 3. (Optional) We could filter the returned order.products to only show this farmer's items
        // But sending the full order is okay for now.
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch farmer orders' });
    }
});

// Update order status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update status' });
    }
});

module.exports = router;
