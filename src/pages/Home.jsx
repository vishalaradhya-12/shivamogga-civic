import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, FileText, Globe2, CheckCircle } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { cities } from '../data/wardData';
import './Home.css';

function Home({ language }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [wardNumber, setWardNumber] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const navigate = useNavigate();

    const t = (key) => getTranslation(key, language);

    // Department options
    const departments = [
        { id: 'health', name: 'Health & Sanitation', nameKn: 'ಆರೋಗ್ಯ ಮತ್ತು ನೈರ್ಮಲ್ಯ', nameHi: 'स्वास्थ्य और स्वच्छता' },
        { id: 'water', name: 'Water Supply', nameKn: 'ನೀರು ಪೂರೈಕೆ', nameHi: 'जल आपूर्ति' },
        { id: 'roads', name: 'Roads & Infrastructure', nameKn: 'ರಸ್ತೆಗಳು ಮತ್ತು ಮೂಲಸೌಕರ್ಯ', nameHi: 'सड़कें और बुनियादी ढांचा' },
        { id: 'education', name: 'Education', nameKn: 'ಶಿಕ್ಷಣ', nameHi: 'शिक्षा' },
        { id: 'streetlights', name: 'Street Lights', nameKn: 'ರಸ್ತೆ ದೀಪಗಳು', nameHi: 'सड़क की बत्तियां' },
        { id: 'parks', name: 'Parks & Gardens', nameKn: 'ಉದ್ಯಾನವನಗಳು', nameHi: 'पार्क और उद्यान' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedCity && wardNumber) {
            // Navigate to ward details with optional department filter
            const path = selectedDepartment
                ? `/ward/${wardNumber}?dept=${selectedDepartment}`
                : `/ward/${wardNumber}`;
            navigate(path);
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
            {/* Hero Section - Gateway of Malnad */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-subtitle">{t('gatewayOfMalnad')}</div>
                    <h1>{t('shivaCivic')}</h1>
                    <p>
                        {t('heroDescription')}
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-primary" onClick={() => navigate('/about')}>
                            <CheckCircle size={20} />
                            {t('learnMore')}
                        </button>
                        <button className="btn btn-outline" onClick={() => navigate('/feedback')}>
                            <FileText size={20} />
                            {t('submitFeedback')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="search-section">
                <div className="search-container">
                    <h2>{t('findWardData')}</h2>
                    <p>{t('enterWardDetails')}</p>

                    <form onSubmit={handleSearch} className="search-form">
                        <div className="form-group">
                            <label htmlFor="city">
                                {t('selectYourCity')} <span style={{ color: '#ef4444' }}>*</span>
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
                                {t('selectWardLabel')} <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <select
                                id="ward"
                                value={wardNumber}
                                onChange={(e) => setWardNumber(e.target.value)}
                                disabled={!selectedCity}
                                required
                            >
                                <option value="">{t('selectWardNumber')}</option>
                                {[...Array(60)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {t('ward')} {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">
                                {t('selectDepartmentOptional')}
                            </label>
                            <select
                                id="department"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                disabled={!wardNumber}
                            >
                                <option value="">{t('allDepartments')}</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {language === 'kn' ? dept.nameKn : language === 'hi' ? dept.nameHi : dept.name}
                                    </option>
                                ))}
                            </select>
                            {wardNumber && (
                                <small style={{ color: '#059669', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                                    {t('filterByDepartment')}
                                </small>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={!selectedCity || !wardNumber}>
                            <Search size={20} />
                            {t('searchWard')}
                        </button>
                    </form>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>{t('whyShivaCivic')}</h2>
                <p className="features-subtitle">
                    {t('featuresSubtitle')}
                </p>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="process-section">
                <h2>{t('howItWorks')}</h2>
                <div className="process-timeline">
                    {processSteps.map((step) => (
                        <div key={step.number} className="process-step">
                            <div className="step-number">
                                {step.number}
                            </div>
                            <div className="step-content">
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>{t('joinMovement')}</h2>
                <p>
                    {t('joinDescription')}
                </p>
                <div className="cta-buttons">
                    <button className="btn btn-white" onClick={() => navigate('/collaborate')}>
                        {t('partnerWithUs')}
                    </button>
                    <button className="btn btn-outline-white" onClick={() => navigate('/feedback')}>
                        {t('shareFeedback')}
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;
