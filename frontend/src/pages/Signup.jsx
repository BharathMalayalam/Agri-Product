import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') || 'customer';

    const [formData, setFormData] = useState({
        name: '',
        userid: '',
        password: '',
        email: '',
        phone: '',
        role: initialRole
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(formData);
        if (res.success) {
            alert('Signup successful! Please login.');
            navigate('/login');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="container flex items-center justify-center" style={{ minHeight: '80vh', padding: '40px 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '520px', padding: '40px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '2rem', color: '#1b5e20', fontWeight: '800' }}>Create Account</h2>

                {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">User ID (Login)</label>
                            <input type="text" className="form-input" required onChange={(e) => setFormData({ ...formData, userid: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-input" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-input" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input type="tel" className="form-input" required onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">I am a...</label>
                        <select className="form-input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                            <option value="customer">Customer</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" style={{ color: '#2ecc71', fontWeight: '600' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
