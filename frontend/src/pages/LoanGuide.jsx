import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, CheckCircle, FileText, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanGuide = () => {
    const { t } = useLanguage();

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <Link to="/farmer-dashboard" className="btn btn-outline mb-4">
                <ArrowLeft size={16} /> Back to Dashboard
            </Link>

            <div className="card" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <h2 className="page-title text-center" style={{ marginBottom: '1rem', color: '#2ecc71' }}>
                    🌾 Agriculture Loan Application Guide
                </h2>
                <p className="text-center" style={{ maxWidth: '700px', margin: '0 auto 40px', color: '#666' }}>
                    Government and private support schemes to help you grow your business. Follow these simple steps to apply.
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#2c3e50' }}>Eligibility</h3>
                        <ul style={{ listStyle: 'none' }}>
                            {[
                                'Must be a registered farmer',
                                'Own cultivable land or have a lease agreement',
                                'Good credit history (CIBIL score > 650)',
                                'Age between 18 and 70 years',
                                'No previous loan defaults'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 mb-2">
                                    <CheckCircle size={20} color="#2ecc71" /> {item}
                                </li>
                            ))}
                        </ul>

                        <h3 style={{ fontSize: '1.5rem', margin: '30px 0 20px', color: '#2c3e50' }}>Required Documents</h3>
                        <ul style={{ listStyle: 'none' }}>
                            {[
                                'Aadhar Card / Voter ID',
                                'Land Ownership Documents (Patta/Chitta)',
                                'Bank Passbook Copy',
                                'Passport Size Photos',
                                'Income Certificate'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 mb-2">
                                    <FileText size={20} color="#3498db" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '12px' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Application Process</h3>

                        <div className="step" style={{ borderLeft: '3px solid #ddd', paddingLeft: '20px', paddingBottom: '30px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-11px', top: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#2ecc71' }}></div>
                            <h4 style={{ fontWeight: 600 }}>Step 1: Gather Documents</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Prepare all the necessary documents listed.</p>
                        </div>

                        <div className="step" style={{ borderLeft: '3px solid #ddd', paddingLeft: '20px', paddingBottom: '30px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-11px', top: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#2ecc71' }}></div>
                            <h4 style={{ fontWeight: 600 }}>Step 2: Vist Nearest Bank / Co-operative</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Go to your local SBI, NABARD, or KCC center.</p>
                        </div>

                        <div className="step" style={{ borderLeft: '3px solid #ddd', paddingLeft: '20px', paddingBottom: '30px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-11px', top: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#2ecc71' }}></div>
                            <h4 style={{ fontWeight: 600 }}>Step 3: Submit Application</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Fill out the application form with the help of the bank officer.</p>
                        </div>

                        <div className="step" style={{ paddingLeft: '20px', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-11px', top: 0, width: '20px', height: '20px', borderRadius: '50%', background: '#2ecc71' }}></div>
                            <h4 style={{ fontWeight: 600 }}>Step 4: Verification & Disbursal</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Bank will verify your land and documents. Loan is usually credited in 7-15 days.</p>
                        </div>

                        <div className="mt-4 p-4" style={{ background: '#e3f2fd', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <Phone size={24} color="#2196f3" />
                            <div>
                                <strong>Need Help? Helpline:</strong>
                                <div style={{ fontSize: '1.2rem', color: '#1565c0' }}>1800-180-1551</div>
                                <div style={{ fontSize: '0.8rem' }}>(Kisan Call Center)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanGuide;
