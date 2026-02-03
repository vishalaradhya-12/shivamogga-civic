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
            {/* Hero Section - Gateway of Malnad */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-subtitle">Gateway of Malnad 🌿 Cultural Capital of Karnataka</div>
                    <h1>ShivaCivic</h1>
                    <p>
                        Connecting citizens of Shivamogga with their local representatives.
                        Transparent access to ward information, corporator details, and civic services
                        for all 60 wards of our beautiful city.
                    </p>
                    <div className="hero-cta">
                        <button className="btn btn-primary" onClick={() => navigate('/about')}>
                            <CheckCircle size={20} />
                            Learn More
                        </button>
                        <button className="btn btn-outline" onClick={() => navigate('/feedback')}>
                            <FileText size={20} />
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </section>

            {/* Search Section */}
            <section className="search-section">
                <div className="search-container">
                    <h2>Find Your Ward Data</h2>
                    <p>Enter your ward details to find your local corporator and civic information</p>

                    <form onSubmit={handleSearch} className="search-form">
                        <div className="form-group">
                            <label htmlFor="city">
                                Select Your City <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <select
                                id="city"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                required
                            >
                                <option value="">Select your city</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {language === 'kn' ? city.nameKn : language === 'hi' ? city.nameHi : city.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ward">
                                Enter Ward Number (1-60)
                            </label>
                            <input
                                type="number"
                                id="ward"
                                placeholder="Ex: 12"
                                value={wardNumber}
                                onChange={(e) => setWardNumber(e.target.value)}
                                min="1"
                                max="60"
                                disabled={!selectedCity}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={!selectedCity || !wardNumber}>
                            <Search size={20} />
                            Search Ward
                        </button>
                    </form>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why ShivaCivic?</h2>
                <p className="features-subtitle">
                    Empowering Shivamogga citizens with transparent, accessible civic information
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
                <h2>How It Works</h2>
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
                <h2>Join the Movement for Transparent Governance</h2>
                <p>
                    Be part of Shivamogga's journey towards better civic engagement.
                    Together, we can build a more connected and responsive community.
                </p>
                <div className="cta-buttons">
                    <button className="btn-white" onClick={() => navigate('/collaborate')}>
                        Partner With Us
                    </button>
                    <button className="btn-outline-white" onClick={() => navigate('/feedback')}>
                        Share Feedback
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Home;
