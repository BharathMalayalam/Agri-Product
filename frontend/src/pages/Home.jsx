import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Leaf, Truck, Users } from 'lucide-react';

const Home = () => {
    const { t } = useLanguage();

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                color: 'white',
                padding: '120px 0 150px',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                {/* Abstract Background Shapes */}
                <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '20px', right: '10%', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '50px', fontSize: '0.9rem', marginBottom: '20px', backdropFilter: 'blur(5px)' }}>
                        🌿 Connecting Nature to Home
                    </span>
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                        {t('home.hero')}
                    </h1>
                    <p style={{ fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto 2.5rem', opacity: 0.95 }}>
                        {t('home.mission')}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/products" className="btn" style={{ background: 'white', color: '#1b5e20', padding: '16px 36px', fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            {t('home.shopNow')} <ArrowRight size={20} />
                        </Link>
                        <Link to="/signup?role=farmer" className="btn" style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '16px 36px', fontSize: '1.1rem', backdropFilter: 'blur(5px)' }}>
                            {t('home.farmerJoin')}
                        </Link>
                    </div>
                </div>

                {/* Wave Separator */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', lineHeight: 0 }}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '60px', transform: 'rotate(180deg)' }}>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f8f9fa"></path>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" style={{ padding: '80px 0', background: '#f8f9fa' }}>
                <div className="container grid grid-cols-3 gap-4" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
                    <FeatureCard icon={<Leaf size={40} />} title="100% Organic" desc="Fresh produce directly from certified organic farms." color="#4caf50" />
                    <FeatureCard icon={<Users size={40} />} title="Direct to Farmer" desc="Support local farmers by buying directly from them." color="#ff9800" />
                    <FeatureCard icon={<Truck size={40} />} title="Fast Delivery" desc="Get your order delivered fresh within 24 hours." color="#2196f3" />
                </div>
            </section>
        </div>
    );
};

// Internal Component for reusability
const FeatureCard = ({ icon, title, desc, color }) => (
    <div className="card text-center" style={{ padding: '40px 24px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: `${color}20`, width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: color }}>
            {icon}
        </div>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{title}</h3>
        <p className="mt-2" style={{ color: '#666' }}>{desc}</p>
    </div>
);

export default Home;
