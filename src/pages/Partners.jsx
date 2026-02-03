import { Building2 } from 'lucide-react';
import { getTranslation } from '../data/translations';

function Partners({ language }) {
    const t = (key) => getTranslation(key, language);

    return (
        <div className="partners-page" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="text-center mb-3xl animate-fade-in">
                    <h1>{t('partners')}</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '1rem' }}>
                        Our valued partners in making Shivamogga more transparent
                    </p>
                </div>

                <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem', textAlign: 'center' }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        margin: '0 auto 2rem',
                        background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-cyan))',
                        borderRadius: 'var(--radius-xl)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Building2 size={50} />
                    </div>
                    <h2>Shivamogga City Corporation</h2>
                    <p style={{ color: 'var(--gray-600)', margin: '1.5rem 0' }}>
                        Official partner for digitizing civic data and improving citizen engagement in Shivamogga.
                    </p>
                    <div className="badge">Active Partner</div>
                </div>
            </div>
        </div>
    );
}

export default Partners;
