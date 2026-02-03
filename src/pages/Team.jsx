import { Linkedin } from 'lucide-react';
import { getTranslation } from '../data/translations';

function Team({ language }) {
    const t = (key) => getTranslation(key, language);

    const team = [
        { name: 'Dr. Rajesh Kumar', role: 'Project Lead', linkedin: '#' },
        { name: 'Priya Sharma', role: 'Technical Lead', linkedin: '#' },
        { name: 'Arun Gowda', role: 'Community Manager', linkedin: '#' },
        { name: 'Lakshmi Devi', role: 'Research Associate', linkedin: '#' }
    ];

    return (
        <div className="team-page" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="text-center mb-3xl animate-fade-in">
                    <h1>{t('teamTitle')}</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '1rem' }}>
                        {t('teamSubtitle')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {team.map((member, index) => (
                        <div key={index} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-cyan))',
                                margin: '0 auto 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '2.5rem',
                                fontWeight: '700'
                            }}>
                                {member.name.charAt(0)}
                            </div>
                            <h3>{member.name}</h3>
                            <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>{member.role}</p>
                            <a href={member.linkedin} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                                <Linkedin size={18} />
                                LinkedIn
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Team;
