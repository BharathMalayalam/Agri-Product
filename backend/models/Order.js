const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number // Snapshot of price at time of order
    }],
    totalAmount: Number,
    status: { type: String, default: 'pending' }, // pending, accepted, ready, delivered
    address: String,
    customerPhone: String,
    paymentMethod: String,
    orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
