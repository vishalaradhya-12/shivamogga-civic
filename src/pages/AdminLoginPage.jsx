import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
    const navigate = useNavigate();
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
                navigate('/admin/dashboard');
            }, 500);
        } else {
            setTimeout(() => {
                setLoading(false);
                setError('Invalid username or password');
            }, 500);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-icon">
                            <Lock size={32} />
                        </div>
                        <h1>Admin Login</h1>
                        <p>Shivamogga Civic Engagement Platform</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="error-message">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="username">
                                <User size={18} />
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <Lock size={18} />
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        <div className="login-info">
                            <p>Default credentials: admin / admin123</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
