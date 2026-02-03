import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, FileText, Globe2, CheckCircle } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { cities } from '../data/wardData';
import './Home.css';

function Home({ language }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [wardNumber, setWardNumber] = useState('');
    const navigate = useNavigate();

    const t = (key) => getTranslation(key, language);

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedCity && wardNumber) {
            navigate(`/ward/${wardNumber}`);
        }
    };

    const features = [
        {
            icon: <MapPin size={32} />,
            title: t('feature1Title'),
            description: t('feature1Desc')
        },
        {
            icon: <Users size={32} />,
            title: t('feature2Title'),
            description: t('feature2Desc')
        },
        {
            icon: <FileText size={32} />,
            title: t('feature3Title'),
            description: t('feature3Desc')
        },
        {
            icon: <Globe2 size={32} />,
            title: t('feature4Title'),
            description: t('feature4Desc')
        }
    ];

    const processSteps = [
        {
            number: 1,
            title: t('step1Title'),
            description: t('step1Desc')
        },
        {
            number: 2,
            title: t('step2Title'),
            description: t('step2Desc')
        },
        {
            number: 3,
            title: t('step3Title'),
            description: t('step3Desc')
        },
        {
            number: 4,
            title: t('step4Title'),
            description: t('step4Desc')
        },
        {
            number: 5,
            title: t('step5Title'),
            description: t('step5Desc')
        },
        {
            number: 6,
            title: t('step6Title'),
            description: t('step6Desc')
        }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero grid-bg">
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <div className="badge mb-lg">{t('welcome')}</div>
                        <h1 className="hero-title">{t('heroTitle')}</h1>
                        <p className="hero-subtitle">{t('heroSubtitle')}</p>
                    </div>

                    {/* Ward Search Card */}
                    <div className="ward-search-card animate-fade-in">
                        <h2>{t('findWardData')}</h2>
                        <p className="search-subtitle">{t('enterDetails')}</p>

                        <form onSubmit={handleSearch} className="search-form">
                            <div className="form-group">
                                <label htmlFor="city">
                                    {t('enterCity')} <span className="required">*</span>
                                </label>
                                <select
                                    id="city"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    required
                                >
                                    <option value="">{t('selectCity')}</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                            {language === 'kn' ? city.nameKn : language === 'hi' ? city.nameHi : city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ward">
                                    {t('enterWard')}
                                </label>
                                <input
                                    type="number"
                                    id="ward"
                                    placeholder={t('wardPlaceholder')}
                                    value={wardNumber}
                                    onChange={(e) => setWardNumber(e.target.value)}
                                    min="1"
                                    max="60"
                                    disabled={!selectedCity}
                                />
                                {!selectedCity && (
                                    <small className="form-hint">{t('pleaseSelectCity')}</small>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={!selectedCity || !wardNumber}>
                                <Search size={20} />
                                {t('search')}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title text-center">{t('features')}</h2>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section grid-bg">
                <div className="container">
                    <h2 className="section-title text-center">{t('howItWorks')}</h2>
                    <p className="section-subtitle text-center">{t('processTitle')}</p>

                    <div className="process-timeline">
                        {processSteps.map((step, index) => (
                            <div key={step.number} className="process-step">
                                <div className="step-number">
                                    <span>{step.number}</span>
                                </div>
                                <div className="step-content card">
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                                {index < processSteps.length - 1 && (
                                    <div className="step-connector"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card card">
                        <h2>{t('collaborateTitle')}</h2>
                        <p>{t('collaborateSubtitle')}</p>
                        <div className="cta-buttons">
                            <button className="btn btn-primary" onClick={() => navigate('/collaborate')}>
                                {t('collaborate')}
                            </button>
                            <button className="btn btn-outline" onClick={() => navigate('/about')}>
                                {t('about')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
