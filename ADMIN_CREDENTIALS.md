# Admin Login Credentials

This document contains all the admin login credentials for the Shivamogga Civic Engagement Platform.

## Admin Dashboard Access

All admins access the dashboard through: `http://localhost:5173/admin/login` (or your deployed URL + `/admin/login`)

---

## Main Administrator

**Department:** All Departments (Full Access)

- **Username:** `admin`
- **Password:** `admin123`
- **Access Level:** Can view and manage ALL departments' complaints

---

## Department-Specific Administrators

### 1. Garbage And Sanitation Department

- **Username:** `garbage_admin`
- **Password:** `garbage123`
- **Department Key:** `health`
- **Access Level:** Can only view and manage Garbage And Sanitation complaints

### 2. Street Light Department

- **Username:** `streetlight_admin`
- **Password:** `light123`
- **Department Key:** `streetlights`
- **Access Level:** Can only view and manage Street Light complaints

### 3. Road Maintenance Department

- **Username:** `roads_admin`
- **Password:** `roads123`
- **Department Key:** `roads`
- **Access Level:** Can only view and manage Road Maintenance complaints

### 4. Water Supply Department

- **Username:** `water_admin`
- **Password:** `water123`
- **Department Key:** `water`
- **Access Level:** Can only view and manage Water Supply complaints

### 5. Underground Drainage Department

- **Username:** `drainage_admin`
- **Password:** `drainage123`
- **Department Key:** `drainage`
- **Access Level:** Can only view and manage Underground Drainage complaints

### 6. Road Cutting Permissions Department

- **Username:** `permissions_admin`
- **Password:** `permissions123`
- **Department Key:** `permissions`
- **Access Level:** Can only view and manage Road Cutting Permissions complaints

### 7. Electrical Department

- **Username:** `electrical_admin`
- **Password:** `electrical123`
- **Department Key:** `electrical`
- **Access Level:** Can only view and manage Electrical complaints

---

## Login Instructions

1. Navigate to the admin login page
2. Select the appropriate department from the dropdown
3. Enter the username and password
4. Click "Login"

**Note:** The credentials shown on the login page will update based on the selected department.

---

## Security Notes

⚠️ **IMPORTANT:** These are development/demo credentials. In a production environment:

- Use strong, unique passwords
- Implement proper authentication with a backend
- Store credentials securely (never in code)
- Use environment variables for sensitive data
- Implement password hashing
- Add two-factor authentication
- Implement session management and token-based auth

---

## Quick Reference Table

| Department | Username | Password | Department Key |
|------------|----------|----------|----------------|
| **Main Admin** | admin | admin123 | all |
| Garbage And Sanitation | garbage_admin | garbage123 | health |
| Street Light | streetlight_admin | light123 | streetlights |
| Road Maintenance | roads_admin | roads123 | roads |
| Water Supply | water_admin | water123 | water |
| Underground Drainage | drainage_admin | drainage123 | drainage |
| Road Cutting Permissions | permissions_admin | permissions123 | permissions |
| Electrical | electrical_admin | electrical123 | electrical |

---

*Last Updated: February 8, 2026*
