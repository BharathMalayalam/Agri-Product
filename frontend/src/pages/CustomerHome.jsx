import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CustomerHome = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('All');
    const { t } = useLanguage();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'All' || p.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <div className="page-header">
                <h2 className="mb-0" style={{ fontSize: '2rem', color: '#1b5e20' }}>{t('navbar.products')}</h2>

                <div className="flex gap-4 items-center" style={{ flexWrap: 'wrap' }}>
                    <div className="relative" style={{ minWidth: '300px' }}>
                        <input
                            type="text"
                            placeholder="Search farm fresh products..."
                            className="form-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '3rem' }}
                        />
                        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    </div>

                    <div className="relative">
                        <Filter size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#999', zIndex: 1 }} />
                        <select
                            className="form-input"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ paddingLeft: '3rem', width: '180px' }}
                        >
                            <option value="All">All Items</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center mt-4 p-8 card">
                    <h3 style={{ color: '#666' }}>No products found matching your criteria.</h3>
                </div>
            )}
        </div>
    );
};

export default CustomerHome;
