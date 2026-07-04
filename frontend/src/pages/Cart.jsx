import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();
    const { user } = useAuth();
    const [address, setAddress] = useState(user?.address || '');
    const [isOrdering, setIsOrdering] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        if (!address) return alert('Please enter delivery address');

        setIsOrdering(true);
        try {
            const orderData = {
                customer: user._id, // stored in user object within auth context
                products: cart.map(item => ({
                    product: item._id,
                    quantity: item.qty,
                    price: item.price
                })),
                totalAmount,
                address,
                customerPhone: user.phone
            };

            await axios.post('/api/orders', orderData);
            clearCart();
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            console.error(err);
            alert('Failed to place order');
        } finally {
            setIsOrdering(false);
        }
    };

    if (cart.length === 0) return <div className="container mt-4 text-center">Your cart is empty.</div>;

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 className="page-title">Shopping Cart</h2>

            <div className="grid grid-cols-3 gap-4">
                <div style={{ gridColumn: 'span 2' }}>
                    {cart.map(item => (
                        <div key={item._id} className="card flex justify-between items-center mb-4">
                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price} x {item.qty}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="btn btn-secondary">-</button>
                                <span>{item.qty}</span>
                                <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="btn btn-secondary">+</button>
                                <button onClick={() => removeFromCart(item._id)} className="btn" style={{ color: '#ef4444' }}><Trash2 size={20} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ height: 'fit-content' }}>
                    <h3>Order Summary</h3>
                    <div className="flex justify-between mt-4">
                        <span>Total:</span>
                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>₹{totalAmount}</span>
                    </div>

                    <div className="mt-4">
                        <label className="form-label">Delivery Address</label>
                        <textarea
                            className="form-input"
                            rows="3"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isOrdering}
                        className="btn btn-primary mt-4"
                        style={{ width: '100%' }}
                    >
                        {isOrdering ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
