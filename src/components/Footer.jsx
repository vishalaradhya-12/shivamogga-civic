import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { getTranslation } from '../data/translations';
import './Footer.css';

function Footer({ language }) {
    const t = (key) => getTranslation(key, language);

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* About Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <div className="logo-icon">
                                <span className="logo-text">SC</span>
                            </div>
                            <span className="logo-name">ShivaCivic</span>
                        </div>
                        <p className="footer-tagline">
                            {t('footerTagline')}
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>{t('quickLinks')}</h4>
                        <ul className="footer-links">
                            <li><Link to="/">{t('home')}</Link></li>
                            <li><Link to="/about">{t('about')}</Link></li>
                            <li><Link to="/partners">{t('partners')}</Link></li>
                            <li><Link to="/team">{t('team')}</Link></li>
                            <li><Link to="/collaborate">{t('collaborate')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h4>{t('contact')}</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <Mail size={18} />
                                <span>contact@shivacivic.in</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} />
                                <span>+91 70199 21579 (Helpline)</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} />
                                <span>08182-278455 (City Corp)</span>
                            </div>
                            <div className="contact-item">
                                <Phone size={18} />
                                <span>08182-220001 (Control Room)</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={18} />
                                <span>Shivamogga, Karnataka</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} ShivaCivic. {t('allRightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
