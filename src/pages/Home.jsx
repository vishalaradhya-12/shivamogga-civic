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
                    {/* Equestrian Statue SVG (Shivappa Nayaka) */}
                    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M120 250 L160 380 L140 480 M350 250 L380 380 L420 480 M200 400 L250 400 M100 200 Q150 100 250 120 T400 200" stroke="currentColor" strokeWidth="0" />
                        {/* Detailed Silhouette Path */}
                        <path d="M112.9 220.6c-4.5 9-18.4 4.8-19.1-5.2-.6-8-8.2-12.7-14.9-8.4-5.3 3.4-1.6 12 4.4 13.9 6.2 1.9 6.6 9.8 1.1 13.3-8.1 5.1-17.5-6-13.8-14.8 1.8-4.2 8.3-4.6 11.2-.5.5.7 3.8-.5 4.9-3.4 2.8-7.5-6.9-15.1-13.9-11-13.3 7.8-8.4 27.6 7.4 30.5 13.8 2.5 30.6-11.2 25.1-22.9-1.9-4.1-7.1-5.1-11.2-2.3-4.1 2.8-5.3 9.4-1.2 12.2zM448 208c0-17.7-14.3-32-32-32h-35.7c-5.8 0-11.1-3.1-14.2-8.2-3.1-5-3.1-11.3 0-16.4 5.8-9.5 16.2-15.4 27.3-15.4h4.6c17.7 0 32-14.3 32-32s-14.3-32-32-32h-4.6c-35.3 0-68.4 18.2-87.5 48.1-4.7 7.4-12.5 11.9-21.3 11.9H256c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h29.5l-20.9 94.2c-2 9-9.1 16-18.1 17.8l-54.7 10.9-28.7-95.6c-4.4-14.7-19.9-23.1-34.6-18.7-14.7 4.4-23.1 19.9-18.7 34.6l32 106.7c3.1 10.4 12.1 18 22.8 19.3l74.7 9.3c21.8 2.7 39.8-11.7 45.4-32.9l12.4-46.7 44.7 22.4C309.2 411.7 323.5 416 339 416h57c17.7 0 32-14.3 32-32s-14.3-32-32-32h-50.6l-20-40h21.9c15.8 0 29.5-11.2 31.6-26.9l8.6-64.8C391.1 213.1 405.3 208 420.6 208H416c17.7 0 32 14.3 32 32z M272 176c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16z" />
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
