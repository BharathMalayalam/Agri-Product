import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    const { t, language } = useLanguage();
    const { addToCart } = useCart();

    // Format price based on locale if needed, for now simple number
    const formattedPrice = `₹${product.price}`;

    return (
        <div className="card product-card">
            <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '15px', overflow: 'hidden' }}>
                <img
                    src={product.image || 'https://via.placeholder.com/300?text=Fresh+Produce'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className="flex justify-between items-start">
                <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{product.name}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Farmer: {product.farmerName || 'Local Farmer'}</p>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary-dark)' }}>
                    {formattedPrice}/kg
                </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <span className={`badge ${product.category === 'Vegetables' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}
                    style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', background: '#e8f5e9', color: '#2e7d32' }}>
                    {product.category || 'Fresh'}
                </span>
                <button onClick={() => addToCart(product)} className="btn btn-outline" style={{ padding: '8px 12px' }}>
                    <ShoppingCart size={16} /> {t('navbar.cart')}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
