import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Users, BarChart3, LogOut,
    TrendingUp, Clock, CheckCircle, AlertCircle, XCircle,
    Search, Filter, ChevronDown, Eye, Edit
} from 'lucide-react';
import {
    getComplaints,
    getComplaintStats,
    getAllEmployeesPerformance,
    getComplaintsByStatus,
    getComplaintsByWard,
    getComplaintsByDepartment
} from '../data/complaintsStorage';
import { complaintsData } from '../data/complaintsData';
import './AdminDashboard.css';

const AdminDashboard = ({ language = 'en' }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [adminDepartment, setAdminDepartment] = useState('all');
    const [adminDepartmentName, setAdminDepartmentName] = useState('Main Admin');
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        ward: '',
        department: ''
    });

    useEffect(() => {
        // Get admin department from localStorage
        const dept = localStorage.getItem('admin_department') || 'all';
        const deptName = localStorage.getItem('admin_department_name') || 'Main Admin';
        setAdminDepartment(dept);
        setAdminDepartmentName(deptName);
        loadData(dept);
    }, []);

    const loadData = (department = 'all') => {
        let allComplaints = getComplaints();

        // Filter complaints by department if not main admin
        if (department !== 'all') {
            allComplaints = allComplaints.filter(c => c.department === department);
        }

        // Calculate stats from filtered complaints
        const calculateStats = (complaints) => {
            const pending = complaints.filter(c => c.status === 'pending').length;
            const inProgress = complaints.filter(c => c.status === 'in-progress').length;
            const resolved = complaints.filter(c => c.status === 'resolved').length;
            const rejected = complaints.filter(c => c.status === 'rejected').length;

            // Calculate average resolution time
            const resolvedComplaints = complaints.filter(c => c.status === 'resolved' && c.resolvedAt);
            let avgResolutionTime = 0;
            if (resolvedComplaints.length > 0) {
                const totalTime = resolvedComplaints.reduce((sum, c) => {
                    const submitted = new Date(c.submittedAt);
                    const resolved = new Date(c.resolvedAt);
                    return sum + (resolved - submitted) / (1000 * 60 * 60); // hours
                }, 0);
                avgResolutionTime = Math.round(totalTime / resolvedComplaints.length);
            }

            // Group by department
            const byDepartment = {};
            complaints.forEach(c => {
                byDepartment[c.department] = (byDepartment[c.department] || 0) + 1;
            });

            // Group by priority
            const byPriority = {
                high: complaints.filter(c => c.priority === 'high').length,
                medium: complaints.filter(c => c.priority === 'medium').length,
                low: complaints.filter(c => c.priority === 'low').length
            };

            return {
                total: complaints.length,
                pending,
                inProgress,
                resolved,
                rejected,
                avgResolutionTime,
                byDepartment,
                byPriority
            };
        };

        const complaintStats = calculateStats(allComplaints);

        // Get all employees and filter by department if needed
        let employeePerformance = getAllEmployeesPerformance();
        if (department !== 'all') {
            // Filter employees to only show those who have complaints in this department
            employeePerformance = employeePerformance.filter(emp => {
                // Check if employee has any complaints in the filtered department
                const empComplaints = allComplaints.filter(c => c.assignedEmployee?.id === emp.id);
                return empComplaints.length > 0;
            });
        }

        setComplaints(allComplaints);
        setStats(complaintStats);
        setEmployees(employeePerformance);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_department');
        localStorage.removeItem('admin_department_name');
        navigate('/');
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'in-progress': return 'status-in-progress';
            case 'resolved': return 'status-resolved';
            case 'rejected': return 'status-rejected';
            default: return '';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'in-progress': return 'In Progress';
            case 'resolved': return 'Resolved';
            case 'rejected': return 'Rejected';
            default: return status;
        }
    };

    const filteredComplaints = complaints.filter(complaint => {
        if (filters.search && !complaint.title.toLowerCase().includes(filters.search.toLowerCase()) &&
            !complaint.id.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        if (filters.status && complaint.status !== filters.status) return false;
        if (filters.ward && complaint.wardNumber !== parseInt(filters.ward)) return false;
        if (filters.department && complaint.department !== filters.department) return false;
        return true;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-content">
                    <div className="admin-logo">
                        <LayoutDashboard size={28} />
                        <div>
                            <h1>Admin Dashboard</h1>
                            {adminDepartment !== 'all' && (
                                <p className="department-badge">{adminDepartmentName}</p>
                            )}
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    <LayoutDashboard size={18} />
                    Overview
                </button>
                <button
                    className={`tab-btn ${activeTab === 'complaints' ? 'active' : ''}`}
                    onClick={() => setActiveTab('complaints')}
                >
                    <FileText size={18} />
                    Complaints
                </button>
                <button
                    className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
                    onClick={() => setActiveTab('employees')}
                >
                    <Users size={18} />
                    Employees
                </button>
                <button
                    className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    <BarChart3 size={18} />
                    Analytics
                </button>
            </nav>

            {/* Main Content */}
            <main className="admin-content">
                {/* Overview Tab */}
                {activeTab === 'overview' && stats && (
                    <div className="overview-tab">
                        <h2>Dashboard Overview</h2>

                        <div className="stats-grid">
                            <div className="stat-card total">
                                <div className="stat-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="stat-details">
                                    <p className="stat-label">Total Complaints</p>
                                    <h3 className="stat-value">{stats.total}</h3>
                                </div>
                            </div>

                            <div className="stat-card pending">
                                <div className="stat-icon">
                                    <Clock size={24} />
                                </div>
                                <div className="stat-details">
                                    <p className="stat-label">Pending</p>
                                    <h3 className="stat-value">{stats.pending}</h3>
                                </div>
                            </div>

                            <div className="stat-card in-progress">
                                <div className="stat-icon">
                                    <AlertCircle size={24} />
                                </div>
                                <div className="stat-details">
                                    <p className="stat-label">In Progress</p>
                                    <h3 className="stat-value">{stats.inProgress}</h3>
                                </div>
                            </div>

                            <div className="stat-card resolved">
                                <div className="stat-icon">
                                    <CheckCircle size={24} />
                                </div>
                                <div className="stat-details">
                                    <p className="stat-label">Resolved</p>
                                    <h3 className="stat-value">{stats.resolved}</h3>
                                </div>
                            </div>
                        </div>

                        {stats.total > 0 && (
                            <div className="overview-metrics">
                                <div className="metric-card">
                                    <TrendingUp size={20} />
                                    <div>
                                        <p className="metric-label">Resolution Rate</p>
                                        <p className="metric-value">
                                            {Math.round((stats.resolved / stats.total) * 100)}%
                                        </p>
                                    </div>
                                </div>
                                <div className="metric-card">
                                    <Clock size={20} />
                                    <div>
                                        <p className="metric-label">Avg Resolution Time</p>
                                        <p className="metric-value">{stats.avgResolutionTime}h</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Complaints */}
                        <div className="recent-complaints">
                            <h3>Recent Complaints</h3>
                            <div className="complaints-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Ward</th>
                                            <th>Department</th>
                                            <th>Assigned To</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.slice(0, 10).map(complaint => (
                                            <tr key={complaint.id}>
                                                <td className="complaint-id">{complaint.id}</td>
                                                <td>{complaint.title}</td>
                                                <td>Ward {complaint.wardNumber}</td>
                                                <td>{complaintsData[complaint.department]?.name || complaint.department}</td>
                                                <td>{complaint.assignedEmployee?.name}</td>
                                                <td>
                                                    <span className={`status-badge ${getStatusBadgeClass(complaint.status)}`}>
                                                        {getStatusLabel(complaint.status)}
                                                    </span>
                                                </td>
                                                <td>{formatDate(complaint.submittedAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Complaints Tab */}
                {activeTab === 'complaints' && (
                    <div className="complaints-tab">
                        <div className="tab-header">
                            <h2>All Complaints</h2>
                            <p className="tab-subtitle">{filteredComplaints.length} complaints found</p>
                        </div>

                        {/* Filters */}
                        <div className="filters-bar">
                            <div className="search-box">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by ID or title..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>

                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                                <option value="rejected">Rejected</option>
                            </select>

                            <select
                                value={filters.ward}
                                onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Wards</option>
                                {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>Ward {num}</option>
                                ))}
                            </select>

                            <select
                                value={filters.department}
                                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                                className="filter-select"
                            >
                                <option value="">All Departments</option>
                                {Object.entries(complaintsData).map(([key, data]) => (
                                    <option key={key} value={key}>{data.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Complaints Table */}
                        <div className="complaints-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Ward</th>
                                        <th>Department</th>
                                        <th>Assigned To</th>
                                        <th>Status</th>
                                        <th>Submitted</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredComplaints.map(complaint => (
                                        <tr key={complaint.id}>
                                            <td className="complaint-id">{complaint.id}</td>
                                            <td className="complaint-title">{complaint.title}</td>
                                            <td>Ward {complaint.wardNumber}</td>
                                            <td>{complaintsData[complaint.department]?.name || complaint.department}</td>
                                            <td>{complaint.assignedEmployee?.name}</td>
                                            <td>
                                                <span className={`status-badge ${getStatusBadgeClass(complaint.status)}`}>
                                                    {getStatusLabel(complaint.status)}
                                                </span>
                                            </td>
                                            <td>{formatDate(complaint.submittedAt)}</td>
                                            <td>
                                                <button className="action-btn" title="View Details">
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Employees Tab */}
                {activeTab === 'employees' && (
                    <div className="employees-tab">
                        <div className="tab-header">
                            <h2>Employee Performance</h2>
                            <p className="tab-subtitle">{employees.length} employees</p>
                        </div>

                        <div className="employees-grid">
                            {employees.map(employee => (
                                <div key={employee.id} className="employee-performance-card">
                                    <div className="employee-header">
                                        <div className="employee-avatar-large">
                                            {employee.name.charAt(0)}
                                        </div>
                                        <div className="employee-info">
                                            <h4>{employee.name}</h4>
                                            <p className="employee-role">{employee.designation}</p>
                                        </div>
                                    </div>

                                    <div className="performance-stats">
                                        <div className="perf-stat">
                                            <span className="perf-label">Total Assigned</span>
                                            <span className="perf-value">{employee.performance.totalAssigned}</span>
                                        </div>
                                        <div className="perf-stat">
                                            <span className="perf-label">Pending</span>
                                            <span className="perf-value pending">{employee.performance.pending}</span>
                                        </div>
                                        <div className="perf-stat">
                                            <span className="perf-label">In Progress</span>
                                            <span className="perf-value in-progress">{employee.performance.inProgress}</span>
                                        </div>
                                        <div className="perf-stat">
                                            <span className="perf-label">Resolved</span>
                                            <span className="perf-value resolved">{employee.performance.resolved}</span>
                                        </div>
                                    </div>

                                    <div className="performance-metrics">
                                        <div className="metric">
                                            <span>Resolution Rate</span>
                                            <strong>{employee.performance.resolutionRate}%</strong>
                                        </div>
                                        <div className="metric">
                                            <span>Avg Time</span>
                                            <strong>{employee.performance.avgResolutionTime}h</strong>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && stats && (
                    <div className="analytics-tab">
                        <h2>Analytics & Reports</h2>

                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <h3>Department-wise Distribution</h3>
                                <div className="chart-placeholder">
                                    {Object.entries(stats.byDepartment).map(([dept, count]) => (
                                        <div key={dept} className="bar-item">
                                            <span className="bar-label">
                                                {complaintsData[dept]?.name || dept}
                                            </span>
                                            <div className="bar-container">
                                                <div
                                                    className="bar-fill"
                                                    style={{ width: `${(count / stats.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="bar-value">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="analytics-card">
                                <h3>Priority Distribution</h3>
                                <div className="priority-stats">
                                    <div className="priority-item high">
                                        <span>High Priority</span>
                                        <strong>{stats.byPriority.high}</strong>
                                    </div>
                                    <div className="priority-item medium">
                                        <span>Medium Priority</span>
                                        <strong>{stats.byPriority.medium}</strong>
                                    </div>
                                    <div className="priority-item low">
                                        <span>Low Priority</span>
                                        <strong>{stats.byPriority.low}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
