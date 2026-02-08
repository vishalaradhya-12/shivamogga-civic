// Complaint Storage and Management System
// Handles complaint submission, assignment, and tracking

import { getWardByNumber } from './wardData';

/**
 * Auto-assign complaint to appropriate ward employee
 * @param {number} wardNumber - Ward number (1-60)
 * @param {string} department - Department key (health, streetlights, etc.)
 * @returns {Object} Assigned employee object
 */
export function autoAssignComplaint(wardNumber, department) {
    const ward = getWardByNumber(wardNumber);

    if (!ward || !ward.employees) {
        console.error('Ward or employees not found');
        return null;
    }

    // Filter employees by department
    const departmentEmployees = ward.employees.filter(emp => emp.department === department);

    if (departmentEmployees.length === 0) {
        // Fallback: assign to first available employee in the ward
        console.warn(`No employees found for department ${department} in ward ${wardNumber}`);
        return ward.employees[0] || null;
    }

    // Get complaint counts for load balancing
    const complaints = getComplaints();
    const employeeCounts = {};

    // Count pending/in-progress complaints per employee
    departmentEmployees.forEach(emp => {
        employeeCounts[emp.id] = complaints.filter(
            c => c.assignedEmployee?.id === emp.id &&
                (c.status === 'pending' || c.status === 'in-progress')
        ).length;
    });

    // Assign to employee with least complaints (load balancing)
    const assignedEmployee = departmentEmployees.reduce((prev, curr) => {
        return (employeeCounts[curr.id] || 0) < (employeeCounts[prev.id] || 0) ? curr : prev;
    });

    return assignedEmployee;
}

/**
 * Generate unique complaint ID
 * @returns {string} Complaint ID in format SHV-XXXX
 */
export function generateComplaintId() {
    const timestamp = Date.now();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `SHV-${random}`;
}

/**
 * Submit a new complaint
 * @param {Object} complaintData - Complaint details
 * @returns {Object} Created complaint with assignment
 */
export function submitComplaint(complaintData) {
    const {
        wardNumber,
        department,
        title,
        description,
        submittedBy,
        priority = 'medium',
        images = []
    } = complaintData;

    // Auto-assign to employee
    const assignedEmployee = autoAssignComplaint(wardNumber, department);

    if (!assignedEmployee) {
        throw new Error('Unable to assign complaint - no employees available');
    }

    // Create complaint object
    const complaint = {
        id: generateComplaintId(),
        wardNumber,
        department,
        title,
        description,
        assignedEmployee: {
            id: assignedEmployee.id,
            name: assignedEmployee.name,
            nameKn: assignedEmployee.nameKn,
            nameHi: assignedEmployee.nameHi,
            designation: assignedEmployee.designation,
            designationKn: assignedEmployee.designationKn,
            designationHi: assignedEmployee.designationHi,
            phone: assignedEmployee.phone,
            email: assignedEmployee.email
        },
        status: 'pending',
        priority,
        submittedBy,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        resolvedAt: null,
        timeline: [
            {
                status: 'pending',
                timestamp: new Date().toISOString(),
                note: 'Complaint submitted and assigned',
                updatedBy: 'system'
            }
        ],
        images,
        adminNotes: ''
    };

    // Save to localStorage
    const complaints = getComplaints();
    complaints.unshift(complaint); // Add to beginning
    localStorage.setItem('civic_complaints', JSON.stringify(complaints));

    return complaint;
}

/**
 * Get all complaints from localStorage
 * @returns {Array} Array of complaint objects
 */
export function getComplaints() {
    const complaintsJson = localStorage.getItem('civic_complaints');
    return complaintsJson ? JSON.parse(complaintsJson) : [];
}

/**
 * Get complaint by ID
 * @param {string} complaintId - Complaint ID
 * @returns {Object|null} Complaint object or null
 */
export function getComplaintById(complaintId) {
    const complaints = getComplaints();
    return complaints.find(c => c.id === complaintId) || null;
}

/**
 * Get complaints by employee ID
 * @param {string} employeeId - Employee ID
 * @returns {Array} Array of complaints assigned to employee
 */
export function getComplaintsByEmployee(employeeId) {
    const complaints = getComplaints();
    return complaints.filter(c => c.assignedEmployee?.id === employeeId);
}

/**
 * Get complaints by ward number
 * @param {number} wardNumber - Ward number
 * @returns {Array} Array of complaints in ward
 */
export function getComplaintsByWard(wardNumber) {
    const complaints = getComplaints();
    return complaints.filter(c => c.wardNumber === wardNumber);
}

/**
 * Get complaints by department
 * @param {string} department - Department key
 * @returns {Array} Array of complaints in department
 */
export function getComplaintsByDepartment(department) {
    const complaints = getComplaints();
    return complaints.filter(c => c.department === department);
}

/**
 * Get complaints by status
 * @param {string} status - Status (pending, in-progress, resolved, rejected)
 * @returns {Array} Array of complaints with status
 */
export function getComplaintsByStatus(status) {
    const complaints = getComplaints();
    return complaints.filter(c => c.status === status);
}

/**
 * Update complaint status
 * @param {string} complaintId - Complaint ID
 * @param {string} newStatus - New status
 * @param {string} note - Optional note about the update
 * @param {string} updatedBy - Who updated (admin name or 'system')
 * @returns {Object|null} Updated complaint or null
 */
export function updateComplaintStatus(complaintId, newStatus, note = '', updatedBy = 'admin') {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === complaintId);

    if (index === -1) return null;

    const complaint = complaints[index];
    complaint.status = newStatus;
    complaint.updatedAt = new Date().toISOString();

    if (newStatus === 'resolved' || newStatus === 'rejected') {
        complaint.resolvedAt = new Date().toISOString();
    }

    // Add to timeline
    complaint.timeline.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: note || `Status changed to ${newStatus}`,
        updatedBy
    });

    complaints[index] = complaint;
    localStorage.setItem('civic_complaints', JSON.stringify(complaints));

    return complaint;
}

/**
 * Reassign complaint to different employee
 * @param {string} complaintId - Complaint ID
 * @param {Object} newEmployee - New employee object
 * @param {string} reason - Reason for reassignment
 * @returns {Object|null} Updated complaint or null
 */
export function reassignComplaint(complaintId, newEmployee, reason = '') {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === complaintId);

    if (index === -1) return null;

    const complaint = complaints[index];
    const previousEmployee = complaint.assignedEmployee;

    complaint.assignedEmployee = {
        id: newEmployee.id,
        name: newEmployee.name,
        nameKn: newEmployee.nameKn,
        nameHi: newEmployee.nameHi,
        designation: newEmployee.designation,
        designationKn: newEmployee.designationKn,
        designationHi: newEmployee.designationHi,
        phone: newEmployee.phone,
        email: newEmployee.email
    };

    complaint.updatedAt = new Date().toISOString();

    // Add to timeline
    complaint.timeline.push({
        status: complaint.status,
        timestamp: new Date().toISOString(),
        note: `Reassigned from ${previousEmployee.name} to ${newEmployee.name}. ${reason}`,
        updatedBy: 'admin'
    });

    complaints[index] = complaint;
    localStorage.setItem('civic_complaints', JSON.stringify(complaints));

    return complaint;
}

/**
 * Add admin note to complaint
 * @param {string} complaintId - Complaint ID
 * @param {string} note - Admin note
 * @returns {Object|null} Updated complaint or null
 */
export function addAdminNote(complaintId, note) {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === complaintId);

    if (index === -1) return null;

    const complaint = complaints[index];
    complaint.adminNotes = note;
    complaint.updatedAt = new Date().toISOString();

    complaints[index] = complaint;
    localStorage.setItem('civic_complaints', JSON.stringify(complaints));

    return complaint;
}

/**
 * Get complaint statistics
 * @returns {Object} Statistics object
 */
export function getComplaintStats() {
    const complaints = getComplaints();

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'pending').length,
        inProgress: complaints.filter(c => c.status === 'in-progress').length,
        resolved: complaints.filter(c => c.status === 'resolved').length,
        rejected: complaints.filter(c => c.status === 'rejected').length,
        byDepartment: {},
        byWard: {},
        byPriority: {
            low: complaints.filter(c => c.priority === 'low').length,
            medium: complaints.filter(c => c.priority === 'medium').length,
            high: complaints.filter(c => c.priority === 'high').length
        },
        avgResolutionTime: 0
    };

    // Calculate department-wise stats
    complaints.forEach(c => {
        stats.byDepartment[c.department] = (stats.byDepartment[c.department] || 0) + 1;
        stats.byWard[c.wardNumber] = (stats.byWard[c.wardNumber] || 0) + 1;
    });

    // Calculate average resolution time (in hours)
    const resolvedComplaints = complaints.filter(c => c.resolvedAt);
    if (resolvedComplaints.length > 0) {
        const totalTime = resolvedComplaints.reduce((sum, c) => {
            const submitted = new Date(c.submittedAt);
            const resolved = new Date(c.resolvedAt);
            return sum + (resolved - submitted);
        }, 0);
        stats.avgResolutionTime = Math.round(totalTime / resolvedComplaints.length / (1000 * 60 * 60)); // Convert to hours
    }

    return stats;
}

/**
 * Get employee performance metrics
 * @param {string} employeeId - Employee ID
 * @returns {Object} Performance metrics
 */
export function getEmployeePerformance(employeeId) {
    const complaints = getComplaintsByEmployee(employeeId);

    const performance = {
        totalAssigned: complaints.length,
        pending: complaints.filter(c => c.status === 'pending').length,
        inProgress: complaints.filter(c => c.status === 'in-progress').length,
        resolved: complaints.filter(c => c.status === 'resolved').length,
        rejected: complaints.filter(c => c.status === 'rejected').length,
        resolutionRate: 0,
        avgResolutionTime: 0
    };

    // Calculate resolution rate
    const completedComplaints = performance.resolved + performance.rejected;
    if (complaints.length > 0) {
        performance.resolutionRate = Math.round((completedComplaints / complaints.length) * 100);
    }

    // Calculate average resolution time
    const resolvedComplaints = complaints.filter(c => c.resolvedAt);
    if (resolvedComplaints.length > 0) {
        const totalTime = resolvedComplaints.reduce((sum, c) => {
            const submitted = new Date(c.submittedAt);
            const resolved = new Date(c.resolvedAt);
            return sum + (resolved - submitted);
        }, 0);
        performance.avgResolutionTime = Math.round(totalTime / resolvedComplaints.length / (1000 * 60 * 60)); // Hours
    }

    return performance;
}

/**
 * Get all employees with their performance metrics
 * @returns {Array} Array of employees with performance data
 */
export function getAllEmployeesPerformance() {
    const complaints = getComplaints();
    const employeeMap = new Map();

    // Collect all unique employees from complaints
    complaints.forEach(complaint => {
        if (complaint.assignedEmployee) {
            const empId = complaint.assignedEmployee.id;
            if (!employeeMap.has(empId)) {
                employeeMap.set(empId, {
                    ...complaint.assignedEmployee,
                    performance: getEmployeePerformance(empId)
                });
            }
        }
    });

    return Array.from(employeeMap.values());
}
