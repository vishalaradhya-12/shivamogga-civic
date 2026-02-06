import { Building, Users as UsersIcon, GraduationCap, Mail } from 'lucide-react';
import { getTranslation } from '../data/translations';

function Collaborate({ language }) {
    const t = (key) => getTranslation(key, language);

    const pathways = [
        {
            icon: <Building size={40} />,
            title: t('forGovernment'),
            description: t('forGovernmentDesc'),
            action: t('contactUs')
        },
        {
            icon: <GraduationCap size={40} />,
            title: t('forResearchers'),
            description: t('forResearchersDesc'),
            action: t('getInvolved')
        },
        {
            icon: <UsersIcon size={40} />,
            title: t('forCitizens'),
            description: t('forCitizensDesc'),
            action: t('joinUs')
        }
    ];

    return (
        <div className="collaborate-page" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="text-center mb-3xl animate-fade-in">
                    <h1>{t('collaborateTitle')}</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '1rem' }}>
                        {t('collaborateSubtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                    {pathways.map((pathway, index) => (
                        <div key={index} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                margin: '0 auto 1.5rem',
                                background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-cyan))',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                {pathway.icon}
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>{pathway.title}</h3>
                            <p style={{ color: 'var(--gray-600)', marginBottom: '1.5rem' }}>{pathway.description}</p>
                            <button className="btn btn-primary">{pathway.action}</button>
                        </div>
                    ))}
                </div>

                <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))' }}>
                    <Mail size={32} style={{ margin: '0 auto 1rem', color: 'var(--primary-blue)' }} />
                    <h3>{t('contactUs')}</h3>
                    <p style={{ marginTop: '1rem' }}>
                        <a href="mailto:contact@shivacivic.in" style={{ color: 'var(--primary-blue)', fontSize: '1.125rem' }}>
                            contact@shivacivic.in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Collaborate;
