import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Users, Download } from 'lucide-react';
import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeStats,
    initializeEmployeesFromWardData
} from '../data/employeeStorage';
import { complaintsData } from '../data/complaintsData';
import { shivamoggaWards as wardData } from '../data/wardData';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [stats, setStats] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        wardNumber: '',
        department: '',
        name: '',
        nameKn: '',
        designation: '',
        designationKn: '',
        phone: '',
        email: ''
    });
    const [filters, setFilters] = useState({
        department: '',
        ward: '',
        search: ''
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = () => {
        let allEmployees = getAllEmployees();

        // Auto-initialize if storage is empty
        if (allEmployees.length === 0) {
            console.log('Employee storage empty, auto-initializing from ward data...');
            try {
                const initialized = initializeEmployeesFromWardData(wardData);
                if (initialized.length > 0) {
                    allEmployees = initialized;
                    // Force a storage update event or just use the returned data
                }
            } catch (error) {
                console.error('Auto-initialization failed:', error);
            }
        }

        const employeeStats = getEmployeeStats();
        setEmployees(allEmployees);
        setStats(employeeStats);
    };

    const resetForm = () => {
        setFormData({
            wardNumber: '',
            department: '',
            name: '',
            nameKn: '',
            designation: '',
            designationKn: '',
            phone: '',
            email: ''
        });
        setIsAddingNew(false);
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddEmployee = () => {
        if (!formData.name || !formData.department || !formData.wardNumber || !formData.designation || !formData.phone) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            addEmployee(formData);
            loadEmployees();
            resetForm();
            alert('Employee added successfully!');
        } catch (error) {
            alert('Error adding employee: ' + error.message);
        }
    };

    const handleUpdateEmployee = () => {
        if (!formData.name || !formData.department || !formData.wardNumber || !formData.designation || !formData.phone) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            updateEmployee(editingId, formData);
            loadEmployees();
            resetForm();
            alert('Employee updated successfully!');
        } catch (error) {
            alert('Error updating employee: ' + error.message);
        }
    };

    const handleEditClick = (employee) => {
        setFormData({
            wardNumber: employee.wardNumber,
            department: employee.department,
            name: employee.name,
            nameKn: employee.nameKn || '',
            designation: employee.designation,
            designationKn: employee.designationKn || '',
            phone: employee.phone,
            email: employee.email || ''
        });
        setEditingId(employee.id);
        setIsAddingNew(false);
    };

    const handleDeleteEmployee = (employeeId, employeeName) => {
        if (window.confirm(`Are you sure you want to delete ${employeeName}? This action cannot be undone.`)) {
            try {
                deleteEmployee(employeeId);
                loadEmployees();
                alert('Employee deleted successfully!');
            } catch (error) {
                alert('Error deleting employee: ' + error.message);
            }
        }
    };

    const handleInitializeEmployees = () => {
        if (employees.length > 0) {
            if (!window.confirm('Employee data already exists. Do you want to re-initialize and merge with existing data?')) {
                return;
            }
        }

        try {
            const initialized = initializeEmployeesFromWardData(wardData);
            loadEmployees();
            alert(`Successfully initialized ${initialized.length} employees from ward data!`);
        } catch (error) {
            alert('Error initializing employees: ' + error.message);
        }
    };

    const filteredEmployees = employees.filter(emp => {
        if (filters.department && emp.department !== filters.department) return false;
        if (filters.ward && emp.wardNumber !== parseInt(filters.ward)) return false;
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return emp.name.toLowerCase().includes(searchLower) ||
                emp.designation.toLowerCase().includes(searchLower) ||
                emp.phone.includes(searchLower);
        }
        return true;
    });

    return (
        <div className="employee-management">
            <div className="management-header">
                <div>
                    <h2>Employee Management</h2>
                    <p className="subtitle">Manage employees across all wards and departments</p>
                </div>
                <div className="header-actions">
                    <button
                        className="init-btn"
                        onClick={handleInitializeEmployees}
                        title="Import employees from existing ward data"
                    >
                        <Download size={18} />
                        Initialize Data
                    </button>
                    <button
                        className="add-employee-btn"
                        onClick={() => {
                            resetForm();
                            setIsAddingNew(true);
                        }}
                    >
                        <Plus size={18} />
                        Add New Employee
                    </button>
                </div>
            </div>

            {/* Statistics */}
            {stats && (
                <div className="employee-stats">
                    <div className="stat-box">
                        <Users size={24} />
                        <div>
                            <p className="stat-label">Total Employees</p>
                            <h3 className="stat-value">{stats.total}</h3>
                        </div>
                    </div>
                    <div className="stat-box">
                        <Users size={24} />
                        <div>
                            <p className="stat-label">Departments</p>
                            <h3 className="stat-value">{Object.keys(stats.byDepartment).length}</h3>
                        </div>
                    </div>
                    <div className="stat-box">
                        <Users size={24} />
                        <div>
                            <p className="stat-label">Wards Covered</p>
                            <h3 className="stat-value">{Object.keys(stats.byWard).length}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Form */}
            {(isAddingNew || editingId) && (
                <div className="employee-form-card">
                    <div className="form-header">
                        <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
                        <button className="close-btn" onClick={resetForm}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className="employee-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Ward Number *</label>
                                <select
                                    name="wardNumber"
                                    value={formData.wardNumber}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Ward</option>
                                    {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>Ward {num}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Department *</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {Object.entries(complaintsData).map(([key, data]) => (
                                        <option key={key} value={key}>{data.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Name (English) *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter employee name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Name (Kannada)</label>
                                <input
                                    type="text"
                                    name="nameKn"
                                    value={formData.nameKn}
                                    onChange={handleInputChange}
                                    placeholder="ಹೆಸರು"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Designation (English) *</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Sanitation Inspector"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Designation (Kannada)</label>
                                <input
                                    type="text"
                                    name="designationKn"
                                    value={formData.designationKn}
                                    onChange={handleInputChange}
                                    placeholder="ಹುದ್ದೆ"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="9876543210"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="employee@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="cancel-btn" onClick={resetForm}>
                                <X size={18} />
                                Cancel
                            </button>
                            <button
                                className="save-btn"
                                onClick={editingId ? handleUpdateEmployee : handleAddEmployee}
                            >
                                <Save size={18} />
                                {editingId ? 'Update Employee' : 'Add Employee'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="filters-section">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, designation, or phone..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    className="filter-select"
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                >
                    <option value="">All Departments</option>
                    {Object.entries(complaintsData).map(([key, data]) => (
                        <option key={key} value={key}>{data.name}</option>
                    ))}
                </select>
                <select
                    className="filter-select"
                    value={filters.ward}
                    onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                >
                    <option value="">All Wards</option>
                    {Array.from({ length: 60 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>Ward {num}</option>
                    ))}
                </select>
            </div>

            {/* Employee List */}
            <div className="employees-list">
                <table className="employees-table">
                    <thead>
                        <tr>
                            <th>Ward</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="no-data">
                                    No employees found. Click "Add New Employee" to get started.
                                </td>
                            </tr>
                        ) : (
                            filteredEmployees.map(employee => (
                                <tr key={employee.id}>
                                    <td>Ward {employee.wardNumber}</td>
                                    <td>
                                        <div className="employee-name">
                                            {employee.name}
                                            {employee.nameKn && (
                                                <span className="name-kn">{employee.nameKn}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{employee.designation}</td>
                                    <td>
                                        <span className="dept-badge">
                                            {complaintsData[employee.department]?.name || employee.department}
                                        </span>
                                    </td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.email || '-'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEditClick(employee)}
                                                title="Edit Employee"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                                                title="Delete Employee"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManagement;
