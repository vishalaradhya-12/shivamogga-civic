import { useState, useEffect } from 'react';
import { X, Check, Building, FileText, Send, ChevronDown, MapPin, Phone, Mail, User } from 'lucide-react';
import { complaintsData } from '../data/complaintsData';
import { submitComplaint } from '../data/complaintsStorage';
import { shivamoggaWards } from '../data/wardData';
import './LoginModal.css'; // Reuse basic modal styles
import './ComplaintModal.css'; // Specific styles

const ComplaintModal = ({ isOpen, onClose, initialDepartment, initialWard, language = 'en' }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        wardNumber: initialWard || '',
        department: initialDepartment || '',
        title: '',
        description: '',
        citizenName: '',
        citizenPhone: ''
    });

    const [submittedComplaint, setSubmittedComplaint] = useState(null);

    // Update formData when initial props change
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            department: initialDepartment || prev.department,
            wardNumber: initialWard || prev.wardNumber
        }));
    }, [initialDepartment, initialWard]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Submit complaint with auto-assignment
            const complaint = submitComplaint({
                wardNumber: parseInt(formData.wardNumber),
                department: formData.department,
                title: formData.title,
                description: formData.description,
                submittedBy: {
                    name: formData.citizenName || 'Anonymous',
                    phone: formData.citizenPhone || 'Not provided'
                },
                priority: 'medium'
            });

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmittedComplaint(complaint);
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Error submitting complaint. Please try again.');
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (success) {
            setSuccess(false);
            setFormData({
                wardNumber: initialWard || '',
                department: initialDepartment || '',
                title: '',
                description: '',
                citizenName: '',
                citizenPhone: ''
            });
            setSubmittedComplaint(null);
        }
        onClose();
    };

    const getTranslatedName = (obj, field) => {
        if (language === 'kn') return obj[`${field}Kn`] || obj[field];
        if (language === 'hi') return obj[`${field}Hi`] || obj[field];
        return obj[field];
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{success ? 'Submission Successful' : 'New Complaint'}</h2>
                    <button className="close-button" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    {success && submittedComplaint ? (
                        <div className="success-animation">
                            <div className="success-icon">
                                <Check size={40} />
                            </div>
                            <h3 className="success-title">Complaint Registered!</h3>
                            <p className="success-message">
                                Your complaint has been submitted successfully.
                            </p>

                            <div className="complaint-details-box">
                                <div className="detail-row">
                                    <strong>Reference ID:</strong>
                                    <span className="reference-id">{submittedComplaint.id}</span>
                                </div>

                                <div className="detail-divider"></div>

                                <h4 className="assigned-title">Assigned To:</h4>
                                <div className="assigned-employee-card">
                                    <div className="employee-avatar-small">
                                        {getTranslatedName(submittedComplaint.assignedEmployee, 'name').charAt(0)}
                                    </div>
                                    <div className="employee-details">
                                        <p className="employee-name">
                                            {getTranslatedName(submittedComplaint.assignedEmployee, 'name')}
                                        </p>
                                        <p className="employee-designation">
                                            {getTranslatedName(submittedComplaint.assignedEmployee, 'designation')}
                                        </p>
                                        <div className="employee-contacts">
                                            <a href={`tel:${submittedComplaint.assignedEmployee.phone}`} className="contact-badge">
                                                <Phone size={14} />
                                                {submittedComplaint.assignedEmployee.phone}
                                            </a>
                                            <a href={`mailto:${submittedComplaint.assignedEmployee.email}`} className="contact-badge">
                                                <Mail size={14} />
                                                {submittedComplaint.assignedEmployee.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <p className="resolution-note">
                                    Expected resolution: 3-5 business days
                                </p>
                            </div>

                            <button className="btn-primary" onClick={handleClose}>
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Ward <span className="required">*</span></label>
                                <div className="select-wrapper input-wrapper">
                                    <MapPin size={18} className="input-icon" />
                                    <select
                                        className="select-input"
                                        value={formData.wardNumber}
                                        onChange={(e) => setFormData({ ...formData, wardNumber: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Ward</option>
                                        {shivamoggaWards.map((ward) => (
                                            <option key={ward.wardNumber} value={ward.wardNumber}>
                                                Ward {ward.wardNumber} - {getTranslatedName(ward, 'wardName')}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="select-arrow" />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Department <span className="required">*</span></label>
                                <div className="select-wrapper input-wrapper">
                                    <Building size={18} className="input-icon" />
                                    <select
                                        className="select-input"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {Object.entries(complaintsData).map(([key, data]) => (
                                            <option key={key} value={key}>
                                                {language === 'kn' ? (data.nameKn || data.name) :
                                                    language === 'hi' ? (data.nameHi || data.name) :
                                                        data.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="select-arrow" />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Your Name (Optional)</label>
                                <div className="input-wrapper">
                                    <User size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Your name"
                                        value={formData.citizenName}
                                        onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Your Phone (Optional)</label>
                                <div className="input-wrapper">
                                    <Phone size={18} className="input-icon" />
                                    <input
                                        type="tel"
                                        className="form-input"
                                        placeholder="+91 98765 43210"
                                        value={formData.citizenPhone}
                                        onChange={(e) => setFormData({ ...formData, citizenPhone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Complaint Title <span className="required">*</span></label>
                                <div className="input-wrapper">
                                    <FileText size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Brief title of the issue"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Description <span className="required">*</span></label>
                                <textarea
                                    className="complaint-textarea"
                                    placeholder="Please describe the issue in detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit Complaint'}
                                {!loading && <Send size={18} />}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComplaintModal;
