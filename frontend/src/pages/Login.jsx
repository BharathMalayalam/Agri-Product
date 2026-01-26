import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
    const [formData, setFormData] = useState({ userid: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(formData.userid, formData.password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <h2 className="text-center mb-4" style={{ fontSize: '2rem', color: '#1b5e20', fontWeight: '800' }}>{t('navbar.login')}</h2>

                {error && <div style={{ background: '#fee2e2', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">User ID / Phone</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.userid}
                            onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t('navbar.login')}</button>
                </form>

                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/signup" style={{ color: '#2ecc71', fontWeight: '600' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
