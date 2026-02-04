import { useState } from 'react';
import { X, Check, Building, FileText, Send, ChevronDown } from 'lucide-react';
import { complaintsData } from '../data/complaintsData';
import './LoginModal.css'; // Reuse basic modal styles
import './ComplaintModal.css'; // Specific styles

const ComplaintModal = ({ isOpen, onClose, initialDepartment }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        department: initialDepartment || '',
        title: '',
        description: ''
    });

    if (!isOpen) return null;

    const [referenceId, setReferenceId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Generate ID
        const newId = `#SHV-${Math.floor(1000 + Math.random() * 9000)}`;
        setReferenceId(newId);

        // Create complaint object
        const newComplaint = {
            id: newId,
            ...formData,
            status: 'In Progress',
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Save to localStorage
        const existingComplaints = JSON.parse(localStorage.getItem('civic_complaints') || '[]');
        localStorage.setItem('civic_complaints', JSON.stringify([newComplaint, ...existingComplaints]));

        setLoading(false);
        setSuccess(true);
    };

    const handleClose = () => {
        if (success) {
            setSuccess(false);
            setFormData({
                department: initialDepartment || '',
                title: '',
                description: ''
            });
            setReferenceId('');
        }
        onClose();
    };

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
                    {success ? (
                        <div className="success-animation">
                            <div className="success-icon">
                                <Check size={40} />
                            </div>
                            <h3 className="success-title">Complaint Registered!</h3>
                            <p className="success-message">
                                Your complaint has been submitted successfully. <br />
                                Reference ID: <strong>{referenceId}</strong>
                            </p>
                            <button className="btn-primary" onClick={handleClose}>
                                Done
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Department</label>
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
                                                {data.name}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="select-arrow" />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Complaint Title</label>
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
                                <label>Description</label>
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
