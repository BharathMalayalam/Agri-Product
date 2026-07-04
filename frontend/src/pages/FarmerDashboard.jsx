import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Cloud, Sun, Droplets, Sprout, FileText, PlusCircle, List, ArrowUpRight } from 'lucide-react';

const FarmerDashboard = () => {
    const { user } = useAuth();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('add'); // add, orders
    const [productForm, setProductForm] = useState({
        name: '', quantity: '', price: '', category: 'Vegetables', image: null
    });
    const [orders, setOrders] = useState([]);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (activeTab === 'orders' && user?._id) {
            fetchOrders();
        }
        fetchWeather();
    }, [activeTab, user]);

    const fetchWeather = async () => {
        try {
            const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=13.08&longitude=80.27&current_weather=true');
            setWeather(res.data.current_weather);
        } catch (err) {
            console.error("Weather fetch failed", err);
        }
    };

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`/api/orders/farmer/${user._id}`);
            setOrders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status });
            fetchOrders();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productForm.name);
        formData.append('quantity', productForm.quantity);
        formData.append('price', productForm.price);
        formData.append('category', productForm.category);
        formData.append('farmer', user._id);
        formData.append('farmerName', user.name);
        if (productForm.image) {
            formData.append('image', productForm.image);
        }

        try {
            await axios.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Product Added!');
            setProductForm({ name: '', quantity: '', price: '', category: 'Vegetables', image: null });
        } catch (err) {
            alert('Failed to add product');
        }
    };

    const recommendations = [
        { crop: 'Tomato', season: 'Winter', tip: 'Water daily' },
        { crop: 'Brinjal', season: 'Summer', tip: 'Use organic manure' },
        { crop: 'Chilli', season: 'All', tip: 'Avoid water logging' }
    ];

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 className="page-title mb-8">{t('navbar.dashboard')}</h2>

            {/* Widgets Section */}
            <div className="grid grid-cols-3 gap-8 mb-8">
                {/* Weather Widget */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', border: 'none' }}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="flex items-center gap-2" style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>
                            <Cloud size={20} /> {t('dashboard.weather')}
                        </h3>
                        <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Chennai</span>
                    </div>
                    {weather ? (
                        <div className="flex items-center gap-4">
                            <Sun size={48} />
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>{weather.temperature}°C</div>
                                <div style={{ opacity: 0.9 }}>Wind: {weather.windspeed} km/h</div>
                            </div>
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>

                {/* Crop Recommendation Widget */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: '#0d3811', border: 'none' }}>
                    <h3 className="flex items-center gap-2 mb-4" style={{ fontSize: '1.1rem', margin: 0, color: '#0d3811' }}>
                        <Sprout size={20} /> {t('dashboard.crops')}
                    </h3>
                    <ul style={{ fontSize: '0.9rem' }}>
                        {recommendations.map((r, i) => (
                            <li key={i} className="flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '8px 0' }}>
                                <strong style={{ fontSize: '1rem' }}>{r.crop}</strong>
                                <span style={{ background: 'rgba(255,255,255,0.4)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{r.season}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Loans Widget */}
                <div className="card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white', border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                        <h3 className="flex items-center gap-2 mb-2" style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>
                            <FileText size={20} /> {t('dashboard.loans')}
                        </h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Access government schemes and financial support.</p>
                    </div>
                    <Link to="/loan-guide" className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '10px', fontSize: '0.9rem', justifyContent: 'center', marginTop: '1rem', backdropFilter: 'blur(5px)' }}>
                        View Guide <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="flex gap-4 mb-8 border-b pb-4" style={{ borderColor: '#eee' }}>
                <button
                    className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('add')}
                >
                    <PlusCircle size={18} /> {t('dashboard.addProduct')}
                </button>
                <button
                    className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('orders')}
                >
                    <List size={18} /> {t('dashboard.viewOrders')}
                </button>
            </div>

            {activeTab === 'add' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card">
                        <h3 className="mb-4">Add New Product</h3>
                        <form onSubmit={handleProductSubmit}>
                            <div className="form-group">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text" className="form-input" required
                                    placeholder="e.g., Ooty Carrots"
                                    value={productForm.name}
                                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label className="form-label">Price (₹ per kg)</label>
                                    <input
                                        type="number" className="form-input" required
                                        placeholder="0.00"
                                        value={productForm.price}
                                        onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Quantity (kg)</label>
                                    <input
                                        type="number" className="form-input" required
                                        placeholder="Available stock"
                                        value={productForm.quantity}
                                        onChange={e => setProductForm({ ...productForm, quantity: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-input"
                                    value={productForm.category}
                                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                >
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Product Image</label>
                                <div style={{ border: '2px dashed #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', background: '#fafafa' }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setProductForm({ ...productForm, image: e.target.files[0] })}
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                    />
                                    <label htmlFor="file-upload" className="btn btn-secondary cursor-pointer">
                                        Choose Image
                                    </label>
                                    {productForm.image && <div className="mt-2 text-sm text-green-600">{productForm.image.name}</div>}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">Post Product</button>
                        </form>
                    </div>

                    {/* Preview / Tips Section */}
                    <div>
                        <div className="card" style={{ background: '#e8f5e9', border: 'none' }}>
                            <h3 style={{ color: '#1b5e20' }}>Tips for Selling</h3>
                            <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                                <li className="mb-2 flex gap-2"><div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#2ecc71', marginTop: '8px' }}></div> Provide clear photos of your produce.</li>
                                <li className="mb-2 flex gap-2"><div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#2ecc71', marginTop: '8px' }}></div> Set competitive prices based on market rates.</li>
                                <li className="mb-2 flex gap-2"><div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#2ecc71', marginTop: '8px' }}></div> Update stock quantity regularly.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'orders' && (
                <div className="grid grid-cols-1 gap-4">
                    {orders.length === 0 && <div className="text-center p-8 card">No orders received yet.</div>}
                    {orders.map(order => (
                        <div key={order._id} className="card flex justify-between items-center flex-wrap gap-4">
                            <div>
                                <h4 className="mb-2">Order #{order._id.slice(-6)}</h4>
                                <div className="text-sm text-muted">
                                    <div><strong>Customer:</strong> {order.customer?.name}</div>
                                    <div><strong>Phone:</strong> {order.customer?.phone}</div>
                                    <div><strong>Address:</strong> {order.address}</div>
                                </div>
                            </div>

                            <div style={{ flex: 1, minWidth: '200px' }}>
                                <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                                    {order.products.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm mb-1">
                                            <span>{item.product?.name}</span>
                                            <strong>{item.quantity} kg</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{ fontSize: '0.8rem' }}>Update Status</label>
                                <select
                                    className="form-input"
                                    style={{ width: '150px', padding: '8px' }}
                                    value={order.status}
                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="ready">Ready</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FarmerDashboard;
