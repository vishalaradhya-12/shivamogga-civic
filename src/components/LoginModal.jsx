import { useState } from 'react';
import { X, Phone, User, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
    const { sendOtp, verifyOtp, login } = useAuth();
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Details
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        if (phoneNumber.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await sendOtp(phoneNumber);
            setStep(2);
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length !== 4) {
            setError('Please enter the 4-digit OTP');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await verifyOtp(phoneNumber, otpValue);
            setStep(3);
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        if (!userDetails.name) {
            setError('Please enter your name');
            return;
        }

        // Complete registration/login
        const user = {
            phone: phoneNumber,
            name: userDetails.name,
            email: userDetails.email,
            id: Date.now().toString()
        };

        login(user);
        if (onSuccess) onSuccess();
        onClose();
        // Reset state after close
        setTimeout(() => {
            setStep(1);
            setPhoneNumber('');
            setOtp(['', '', '', '']);
            setUserDetails({ name: '', email: '' });
        }, 500);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple chars

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-advance
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>
                        {step === 1 && 'Login or Register'}
                        {step === 2 && 'Verify Phone'}
                        {step === 3 && 'Basic Details'}
                    </h2>
                    <button className="close-button" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="step-indicator">
                        <div className={`step-dot ${step === 1 ? 'active' : ''}`}></div>
                        <div className={`step-dot ${step === 2 ? 'active' : ''}`}></div>
                        <div className={`step-dot ${step === 3 ? 'active' : ''}`}></div>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handlePhoneSubmit}>
                            <div className="input-group">
                                <label>Phone Number</label>
                                <div className="input-wrapper">
                                    <Phone size={18} className="input-icon" />
                                    <input
                                        type="tel"
                                        className="form-input"
                                        placeholder="+91 99999 99999"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            {error && <p className="error-text text-red-500 text-sm mb-4">{error}</p>}
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit}>
                            <div className="text-center mb-6">
                                <p className="text-gray-600 dark:text-gray-400">
                                    Enter the code sent to <br />
                                    <strong>+91 {phoneNumber}</strong>
                                </p>
                            </div>
                            <div className="otp-container">
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        className="otp-input"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !digit && idx > 0) {
                                                document.getElementById(`otp-${idx - 1}`).focus();
                                            }
                                        }}
                                    />
                                ))}
                            </div>
                            {error && <p className="error-text text-red-500 text-sm mb-4 text-center">{error}</p>}
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify'}
                                {!loading && <ArrowRight size={18} />}
                            </button>
                            <button type="button" className="back-button" onClick={() => setStep(1)}>
                                Change Phone Number
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleDetailsSubmit}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <User size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter your name"
                                        value={userDetails.name}
                                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Email (Optional)</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">@</span>
                                    <input
                                        type="email"
                                        className="form-input"
                                        placeholder="Enter your email"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            {error && <p className="error-text text-red-500 text-sm mb-4">{error}</p>}
                            <button type="submit" className="btn-primary">
                                Complete Registration
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
