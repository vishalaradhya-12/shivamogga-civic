import { getTranslation } from '../data/translations';

function About({ language }) {
    const t = (key) => getTranslation(key, language);

    return (
        <div className="about-page" style={{ padding: '4rem 0', minHeight: '80vh' }}>
            <div className="container">
                <div className="text-center mb-3xl animate-fade-in">
                    <h1>{t('aboutTitle')}</h1>
                </div>

                <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem' }}>
                    <h2 className="text-gradient mb-xl">{t('aboutMission')}</h2>
                    <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                        {t('aboutVision')}
                    </p>

                    <div style={{ marginTop: '3rem' }}>
                        <h3>Our Commitment</h3>
                        <p>
                            ShivaCivic is dedicated to bringing transparency and accessibility to civic governance in Shivamogga.
                            We believe that every citizen deserves easy access to information about their local representatives
                            and the ability to engage meaningfully with their government.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
