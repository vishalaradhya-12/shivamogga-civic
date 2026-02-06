import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTranslation } from '../data/translations';
import { shivamoggaWards } from '../data/wardData';
import { getAllDepartmentIds, getComplaintsByDepartment } from '../data/complaintsData';
import './WardComplaint.css';

function WardComplaint({ language }) {
    const { wardNumber } = useParams();
    const navigate = useNavigate();
    const t = (key) => getTranslation(key, language);

    const [ward, setWard] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        department: '',
        description: '',
        photo: null
    });
    const [submitted, setSubmitted] = useState(false);
    const [trackingId, setTrackingId] = useState('');

    useEffect(() => {
        // Find the ward by number
        const foundWard = shivamoggaWards.find(w => w.wardNumber === parseInt(wardNumber));
        if (foundWard) {
            setWard(foundWard);
        } else {
            // Invalid ward number, redirect to home
            navigate('/');
        }
    }, [wardNumber, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                photo: file
            }));
        }
    };

    const generateTrackingId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `SHV-${wardNumber}-${timestamp}-${random}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate tracking ID
        const id = generateTrackingId();
        setTrackingId(id);

        // In a real app, this would send data to backend
        console.log('Complaint submitted:', {
            ...formData,
            wardNumber,
            wardName: ward?.wardName,
            trackingId: id,
            submittedAt: new Date().toISOString(),
            submittedVia: 'qr-code'
        });

        // Show success message
        setSubmitted(true);

        // Reset form
        setFormData({
            name: '',
            phone: '',
            email: '',
            department: '',
            description: '',
            photo: null
        });
    };

    const handleNewComplaint = () => {
        setSubmitted(false);
        setTrackingId('');
    };

    if (!ward) {
        return (
            <div className="ward-complaint-page loading">
                <div className="container">
                    <p>Loading ward information...</p>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="ward-complaint-page success">
                <div className="container">
                    <div className="success-card">
                        <div className="success-icon">✓</div>
                        <h1>{t('complaintSubmitted') || 'Complaint Submitted Successfully!'}</h1>
                        <p className="success-message">
                            {t('complaintSubmittedMessage') || 'Your complaint has been registered and will be forwarded to the concerned department.'}
                        </p>

                        <div className="tracking-id-section">
                            <h3>{t('trackingId') || 'Tracking ID'}</h3>
                            <div className="tracking-id">#{trackingId}</div>
                            <p className="tracking-note">
                                {t('trackingNote') || 'Please save this ID to track your complaint status'}
                            </p>
                        </div>

                        <div className="success-actions">
                            <button className="btn-primary" onClick={handleNewComplaint}>
                                {t('submitAnother') || 'Submit Another Complaint'}
                            </button>
                            <button className="btn-secondary" onClick={() => navigate(`/ward/${wardNumber}`)}>
                                {t('viewWard') || 'View Ward Details'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ward-complaint-page">
            <div className="container">
                {/* Ward Header */}
                <div className="ward-header-compact">
                    <div className="ward-info">
                        <h1>
                            {language === 'kn' ? ward.wardNameKn :
                                language === 'hi' ? ward.wardNameHi :
                                    ward.wardName}
                        </h1>
                        <div className="ward-meta">
                            <span className="badge">Ward {ward.wardNumber}</span>
                            <span>{ward.population.toLocaleString()} {t('residents')}</span>
                        </div>
                    </div>
                </div>

                {/* Complaint Form */}
                <div className="complaint-form-card">
                    <div className="form-header">
                        <h2>{t('submitComplaint') || 'Submit Your Complaint'}</h2>
                        <p>{t('complaintFormDesc') || 'Fill in the details below to report an issue in your ward'}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Contact Information */}
                        <div className="form-section">
                            <h3>{t('contactInfo') || 'Contact Information'} <span className="optional">({t('optional')})</span></h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">{t('name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder={t('enterName') || 'Enter your name'}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">{t('phone')}</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t('email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        {/* Complaint Details */}
                        <div className="form-section">
                            <h3>{t('complaintDetails') || 'Complaint Details'} <span className="required">*</span></h3>

                            <div className="form-group">
                                <label htmlFor="department">{t('selectDepartment')} *</label>
                                <select
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">{t('chooseDepartment') || 'Choose a department'}</option>
                                    {getAllDepartmentIds().map(deptId => {
                                        const dept = getComplaintsByDepartment(deptId);
                                        return (
                                            <option key={deptId} value={deptId}>
                                                {language === 'kn' ? dept.nameKn :
                                                    language === 'hi' ? dept.nameHi :
                                                        dept.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">{t('description')} *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="6"
                                    placeholder={t('describeIssue') || 'Describe the issue in detail...'}
                                    required
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="photo">{t('uploadPhoto')} <span className="optional">({t('optional')})</span></label>
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="file-input"
                                />
                                {formData.photo && (
                                    <p className="file-name">Selected: {formData.photo.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Important Notice */}
                        <div className="alert alert-warning">
                            <strong>{t('important') || 'IMPORTANT'}:</strong> {t('fakeComplaintWarning') || 'All complaints will be reviewed and appropriate action will be taken against those leaving fake complaints.'}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn-submit">
                            {t('submitComplaint') || 'Submit Complaint'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default WardComplaint;
