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
                                Select Ward <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <select
                                id="ward"
                                value={wardNumber}
                                onChange={(e) => setWardNumber(e.target.value)}
                                disabled={!selectedCity}
                                required
                            >
                                <option value="">Select ward number</option>
                                {[...Array(60)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Ward {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="department">
                                Select Department (Optional)
                            </label>
                            <select
                                id="department"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                disabled={!wardNumber}
                            >
                                <option value="">All Departments</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id}>
                                        {language === 'kn' ? dept.nameKn : language === 'hi' ? dept.nameHi : dept.name}
                                    </option>
                                ))}
                            </select>
                            {wardNumber && (
                                <small style={{ color: '#059669', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block' }}>
                                    Filter by specific department or view all
                                </small>
                            )}
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
                <div className="jog-falls-icon-bg">
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Raja - The King (Majestic & Continuous) */}
                        <path d="M50 0 L50 180" stroke="currentColor" strokeWidth="12" strokeLinecap="round" style={{ opacity: 0.9 }} />

                        {/* Roarer - The Violent (Crashes into Raja) */}
                        <path d="M80 0 Q70 60 55 120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ opacity: 0.7 }} />

                        {/* Rocket - The Jet (Fast & Straight) */}
                        <path d="M110 0 L110 160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" style={{ opacity: 0.8 }} />

                        {/* Rani - The Queen (Graceful & Winding) */}
                        <path d="M150 0 Q140 50 160 100 T150 170" stroke="currentColor" strokeWidth="8" strokeLinecap="round" style={{ opacity: 0.6 }} />
                    </svg>
                </div>
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
