// Employee Storage and Management System
// Handles employee CRUD operations across all wards and departments

/**
 * Generate unique employee ID
 * @returns {string} Employee ID in format EMP-XXXX
 */
export function generateEmployeeId() {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `EMP-${random}`;
}

/**
 * Get all employees from localStorage
 * @returns {Array} Array of employee objects
 */
export function getAllEmployees() {
    const employeesJson = localStorage.getItem('civic_employees');
    return employeesJson ? JSON.parse(employeesJson) : [];
}

/**
 * Save employees to localStorage
 * @param {Array} employees - Array of employee objects
 */
function saveEmployees(employees) {
    localStorage.setItem('civic_employees', JSON.stringify(employees));
}

/**
 * Get employees by ward number
 * @param {number} wardNumber - Ward number (1-60)
 * @returns {Array} Array of employees in the ward
 */
export function getEmployeesByWard(wardNumber) {
    const employees = getAllEmployees();
    return employees.filter(emp => emp.wardNumber === wardNumber);
}

/**
 * Get employees by department
 * @param {string} department - Department key
 * @returns {Array} Array of employees in the department
 */
export function getEmployeesByDepartment(department) {
    const employees = getAllEmployees();
    return employees.filter(emp => emp.department === department);
}

/**
 * Get employee by ID
 * @param {string} employeeId - Employee ID
 * @returns {Object|null} Employee object or null
 */
export function getEmployeeById(employeeId) {
    const employees = getAllEmployees();
    return employees.find(emp => emp.id === employeeId) || null;
}

/**
 * Add a new employee
 * @param {Object} employeeData - Employee details
 * @returns {Object} Created employee
 */
export function addEmployee(employeeData) {
    const {
        wardNumber,
        department,
        name,
        nameKn = '',
        nameHi = '',
        designation,
        designationKn = '',
        designationHi = '',
        phone,
        email = ''
    } = employeeData;

    const employee = {
        id: generateEmployeeId(),
        wardNumber: parseInt(wardNumber),
        department,
        name,
        nameKn,
        nameHi,
        designation,
        designationKn,
        designationHi,
        phone,
        email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const employees = getAllEmployees();
    employees.push(employee);
    saveEmployees(employees);

    return employee;
}

/**
 * Update an existing employee
 * @param {string} employeeId - Employee ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated employee or null
 */
export function updateEmployee(employeeId, updates) {
    const employees = getAllEmployees();
    const index = employees.findIndex(emp => emp.id === employeeId);

    if (index === -1) return null;

    employees[index] = {
        ...employees[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    saveEmployees(employees);
    return employees[index];
}

/**
 * Delete an employee
 * @param {string} employeeId - Employee ID
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteEmployee(employeeId) {
    const employees = getAllEmployees();
    const index = employees.findIndex(emp => emp.id === employeeId);

    if (index === -1) return false;

    employees.splice(index, 1);
    saveEmployees(employees);
    return true;
}

/**
 * Initialize employees from ward data (one-time migration)
 * This should be called once to migrate existing ward employee data to the new system
 */
export function initializeEmployeesFromWardData(wardData) {
    const existingEmployees = getAllEmployees();

    // Only initialize if no employees exist
    if (existingEmployees.length > 0) {
        return existingEmployees;
    }

    const allEmployees = [];

    // Extract employees from all wards
    Object.values(wardData).forEach(ward => {
        if (ward.employees && Array.isArray(ward.employees)) {
            ward.employees.forEach(emp => {
                allEmployees.push({
                    id: emp.id || generateEmployeeId(),
                    wardNumber: ward.number,
                    department: emp.department,
                    name: emp.name,
                    nameKn: emp.nameKn || '',
                    nameHi: emp.nameHi || '',
                    designation: emp.designation,
                    designationKn: emp.designationKn || '',
                    designationHi: emp.designationHi || '',
                    phone: emp.phone,
                    email: emp.email || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
            });
        }
    });

    saveEmployees(allEmployees);
    return allEmployees;
}

/**
 * Get employee statistics
 * @returns {Object} Statistics about employees
 */
export function getEmployeeStats() {
    const employees = getAllEmployees();

    const stats = {
        total: employees.length,
        byDepartment: {},
        byWard: {}
    };

    employees.forEach(emp => {
        stats.byDepartment[emp.department] = (stats.byDepartment[emp.department] || 0) + 1;
        stats.byWard[emp.wardNumber] = (stats.byWard[emp.wardNumber] || 0) + 1;
    });

    return stats;
}
