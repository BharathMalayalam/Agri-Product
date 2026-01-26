import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); // users, orders
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]); // All orders

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('/api/auth/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOrders = async () => {
        // We need a route for ALL orders. 
        // In orders.js we have /customer/:id and /farmer/:id. 
        // We should add GET /api/orders/all or just GET /api/orders (if protected).
        // For now I'll use the existing patterns but create a new route if needed. 
        // Actually, I didn't create a 'get all orders' route. 
        // I will add a GET /api/orders/all route quickly or just simulate it.
        // Let's assume I'll add GET /api/orders to list all.
        try {
            const res = await axios.get('/api/orders'); // I need to implement this in backend
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 className="page-title">Admin Dashboard</h2>

            <div className="flex gap-4 mb-4">
                <button className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('users')}>Users</button>
                <button className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('orders')}>Orders</button>
            </div>

            {activeTab === 'users' && (
                <div className="card">
                    <table style={{ width: '100%', textAlign: 'left' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Phone</th>
                                <th>UserID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '10px 0' }}>{u.name}</td>
                                    <td>{u.role}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.userid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="grid gap-4">
                    {orders.map(order => (
                        <div key={order._id} className="card">
                            <h4>Order #{order._id}</h4>
                            <p>Customer: {order.customer?.name}</p>
                            <p>Total: ₹{order.totalAmount}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
