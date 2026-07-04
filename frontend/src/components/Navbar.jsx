import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Menu, X, Globe, User, LogOut } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'tm' : 'en');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar" style={{ background: 'white', padding: '15px 0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🌱 Agri-Product
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu flex items-center gap-4" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
                    <Link to="/" className="btn-link">{t('navbar.home')}</Link>

                    {user?.role === 'customer' && (
                        <>
                            <Link to="/products">{t('navbar.products')}</Link>
                            <Link to="/cart" className="flex items-center gap-2">
                                <ShoppingCart size={20} />
                                {t('navbar.cart')}
                            </Link>
                            <Link to="/orders">{t('navbar.orders')}</Link>
                        </>
                    )}

                    {user?.role === 'farmer' && (
                        <>
                            <Link to="/farmer-dashboard">{t('navbar.dashboard')}</Link>
                        </>
                    )}

                    {user?.role === 'admin' && (
                        <Link to="/admin-dashboard">{t('navbar.dashboard')}</Link>
                    )}

                    <button onClick={toggleLanguage} className="btn btn-outline" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>
                        <Globe size={16} /> {language.toUpperCase()}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span style={{ fontWeight: 500 }}>{user.name}</span>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 12px' }}>
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary">
                            <User size={16} /> {t('navbar.login')}
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}>
                    {/* For simplicity in this text-based env, hiding actual responsive JS toggle implementation logic or keeping it simple. 
               In a real app, I'd use a CSS media query to show/hide the menu or state. 
               For now I will just render the button. */}
                    <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="mobile-menu" style={{
                    background: 'white',
                    borderTop: '1px solid #eee',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <Link to="/" onClick={() => setIsOpen(false)}>{t('navbar.home')}</Link>
                    {user?.role === 'customer' && <Link to="/products" onClick={() => setIsOpen(false)}>{t('navbar.products')}</Link>}
                    {user?.role === 'farmer' && <Link to="/farmer-dashboard" onClick={() => setIsOpen(false)}>{t('navbar.dashboard')}</Link>}
                    <button onClick={() => { toggleLanguage(); setIsOpen(false); }}>Change Language ({language.toUpperCase()})</button>
                    {user ? (
                        <button onClick={() => { handleLogout(); setIsOpen(false); }}>{t('navbar.logout')}</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)}>{t('navbar.login')}</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
