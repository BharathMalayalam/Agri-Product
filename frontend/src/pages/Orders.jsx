import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?._id) {
            axios.get(`/api/orders/customer/${user._id}`)
                .then(res => setOrders(res.data))
                .catch(console.error);
        }
    }, [user]);

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 className="page-title">My Orders</h2>
            <div className="grid gap-4">
                {orders.map(order => (
                    <div key={order._id} className="card">
                        <div className="flex justify-between mb-2" style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>Order #{order._id.slice(-6)}</span>
                            <span className={`status-badge ${order.status}`} style={{ textTransform: 'capitalize', color: order.status === 'delivered' ? 'green' : 'orange' }}>
                                {order.status}
                            </span>
                        </div>
                        <div>
                            {order.products.map((item, idx) => (
                                <div key={idx} className="flex justify-between" style={{ fontSize: '0.9rem', color: '#555' }}>
                                    <span>{item.product?.name || 'Item'} x {item.quantity}</span>
                                    <span>₹{item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 pt-2" style={{ borderTop: '1px solid #eee' }}>
                            <span>Total</span>
                            <span style={{ fontWeight: 'bold' }}>₹{order.totalAmount}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                            Date: {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
