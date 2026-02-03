import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { cities } from '../data/wardData';
import './Feedback.css';

function Feedback({ language }) {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        city: '',
        ward: '',
        issue: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const t = (key) => getTranslation(key, language);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend
        console.log('Feedback submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', mobile: '', city: '', ward: '', issue: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="feedback-page">
            <div className="container">
                <div className="feedback-header animate-fade-in">
                    <h1>{t('feedbackTitle')}</h1>
                    <p className="subtitle">{t('feedbackSubtitle')}</p>
                </div>

                <div className="feedback-content">
                    <div className="warning-card card animate-fade-in">
                        <AlertCircle size={24} />
                        <p><strong>{t('importantNotice')}</strong></p>
                    </div>

                    <form onSubmit={handleSubmit} className="feedback-form card animate-fade-in">
                        <h2>{t('basicInfo')}</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">
                                    {t('name')} <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('enterName')}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mobile">
                                    {t('mobileNumber')} <span className="required">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder={t('enterMobile')}
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">
                                    {t('city')} <span className="required">*</span>
                                </label>
                                <select
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
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
                                    {t('wardNumberOptional')}
                                </label>
                                <input
                                    type="number"
                                    id="ward"
                                    name="ward"
                                    value={formData.ward}
                                    onChange={handleChange}
                                    placeholder={t('selectWard')}
                                    min="1"
                                    max="60"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="issue">
                                {t('issueDescription')} <span className="required">*</span>
                            </label>
                            <textarea
                                id="issue"
                                name="issue"
                                value={formData.issue}
                                onChange={handleChange}
                                placeholder={t('describeIssue')}
                                rows="6"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={submitted}>
                            <Send size={20} />
                            {submitted ? t('success') : t('submitFeedback')}
                        </button>

                        {submitted && (
                            <div className="success-message">
                                ✓ Your feedback has been submitted successfully!
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
