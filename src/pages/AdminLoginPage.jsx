import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, Building2 } from 'lucide-react';
import './AdminLoginPage.css';

// Department credentials configuration
const DEPARTMENT_CREDENTIALS = {
    'all': {
        username: 'admin',
        password: 'admin123',
        department: 'all',
        name: 'Main Admin'
    },
    'health': {
        username: 'garbage_admin',
        password: 'garbage123',
        department: 'health',
        name: 'Garbage And Sanitation'
    },
    'streetlights': {
        username: 'streetlight_admin',
        password: 'light123',
        department: 'streetlights',
        name: 'Street Light'
    },
    'roads': {
        username: 'roads_admin',
        password: 'roads123',
        department: 'roads',
        name: 'Road Maintenance'
    },
    'water': {
        username: 'water_admin',
        password: 'water123',
        department: 'water',
        name: 'Water Supply'
    },
    'drainage': {
        username: 'drainage_admin',
        password: 'drainage123',
        department: 'drainage',
        name: 'Underground Drainage'
    },
    'permissions': {
        username: 'permissions_admin',
        password: 'permissions123',
        department: 'permissions',
        name: 'Road Cutting Permissions'
    },
    'electrical': {
        username: 'electrical_admin',
        password: 'electrical123',
        department: 'electrical',
        name: 'Electrical'
    }
};

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        department: 'all',
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate credentials against department configuration
        const deptConfig = DEPARTMENT_CREDENTIALS[credentials.department];

        if (deptConfig &&
            credentials.username === deptConfig.username &&
            credentials.password === deptConfig.password) {

            // Store auth token and department info
            localStorage.setItem('admin_auth', 'true');
            localStorage.setItem('admin_user', credentials.username);
            localStorage.setItem('admin_department', credentials.department);
            localStorage.setItem('admin_department_name', deptConfig.name);

            setTimeout(() => {
                setLoading(false);
                navigate('/admin/dashboard');
            }, 500);
        } else {
            setTimeout(() => {
                setLoading(false);
                setError('Invalid username or password for selected department');
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
                            <label htmlFor="department">
                                <Building2 size={18} />
                                Department
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={credentials.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="all">Main Admin (All Departments)</option>
                                <option value="health">Garbage And Sanitation</option>
                                <option value="streetlights">Street Light</option>
                                <option value="roads">Road Maintenance</option>
                                <option value="water">Water Supply</option>
                                <option value="drainage">Underground Drainage</option>
                                <option value="permissions">Road Cutting Permissions</option>
                                <option value="electrical">Electrical</option>
                            </select>
                        </div>

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
                            <p>
                                <strong>{DEPARTMENT_CREDENTIALS[credentials.department].name}</strong>
                                <br />
                                Username: {DEPARTMENT_CREDENTIALS[credentials.department].username}
                                <br />
                                Password: {DEPARTMENT_CREDENTIALS[credentials.department].password}
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;
