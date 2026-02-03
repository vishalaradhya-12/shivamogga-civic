import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { getTranslation } from '../data/translations';
import './Navbar.css';

function Navbar({ darkMode, toggleDarkMode, language, changeLanguage }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
    const location = useLocation();

    const t = (key) => getTranslation(key, language);

    const navLinks = [
        { path: '/', label: t('home') },
        { path: '/partners', label: t('partners') },
        { path: '/data-review', label: t('dataReview') },
        { path: '/feedback', label: t('feedback') },
        { path: '/about', label: t('about') },
        { path: '/team', label: t('team') },
        { path: '/collaborate', label: t('collaborate') }
    ];

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
        { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' }
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon">
                            <span className="logo-text">SC</span>
                        </div>
                        <span className="logo-name">ShivaCivic</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links desktop-only">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="navbar-actions">
                        {/* Language Selector */}
                        <div className="language-selector">
                            <button
                                className="icon-btn"
                                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                                aria-label="Change language"
                            >
                                <Globe size={20} />
                                <span className="desktop-only">{currentLanguage?.nativeName}</span>
                            </button>

                            {languageMenuOpen && (
                                <div className="language-menu">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            className={`language-option ${language === lang.code ? 'active' : ''}`}
                                            onClick={() => {
                                                changeLanguage(lang.code);
                                                setLanguageMenuOpen(false);
                                            }}
                                        >
                                            {lang.nativeName}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            className="icon-btn"
                            onClick={toggleDarkMode}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="icon-btn mobile-only"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
