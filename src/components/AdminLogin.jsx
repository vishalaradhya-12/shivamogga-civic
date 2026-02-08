import { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import './LoginModal.css';

const AdminLogin = ({ isOpen, onClose, onSuccess }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple authentication (in production, this should be a proper backend call)
        // Default admin credentials: admin / admin123
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            // Store auth token
            localStorage.setItem('admin_auth', 'true');
            localStorage.setItem('admin_user', credentials.username);

            setTimeout(() => {
                setLoading(false);
                onSuccess();
                onClose();
            }, 500);
        } else {
            setTimeout(() => {
                setLoading(false);
                setError('Invalid username or password');
            }, 500);
        }
    };

    const handleClose = () => {
        setCredentials({ username: '', password: '' });
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Admin Login</h2>
                    <button className="close-button" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Username</label>
                            <div className="input-wrapper">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter username"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="Enter password"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <p className="admin-note">
                            Default credentials: admin / admin123
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
