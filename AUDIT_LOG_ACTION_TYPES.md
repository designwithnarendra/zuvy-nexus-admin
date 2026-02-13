# Audit Log - Comprehensive Action Types Coverage

## Overview
The Audit Log now includes 30 mock entries covering all major features and functionalities across the platform. This document outlines all action types that can be logged.

---

## 1. COURSE STUDIO (9 entries)

### Create Actions
- **Create Course** - Publishing a new course in draft mode
- **Create Module** - Adding new learning modules with duration
- **Create Project** - Adding project-based learning activities
- **Create Batch** - Creating new student batches with enrollment cap

### Update Actions
- **Update Course Image** - Changing course thumbnail/banner
- **Update Course Type** - Switching between Public/Private
- **Update Batch Details** - Modifying enrollment caps, instructor assignments
- **Update Student Batch** - Moving students between batches

### Delete Actions
- **Delete Course** - Permanently removing a course (with archive)
- **Delete Module** - Removing a module from curriculum
- **Remove Student** - Unenrolling student from batch

### Publish Actions
- **Publish Course** - Moving course from Draft to Published status
- **Archive Batch** - Archiving completed or inactive batches

---

## 2. CONTENT BANK (8 entries)

### Create Actions
- **Create MCQ Question** - Multiple choice questions with options
- **Create Open-Ended Question** - Essay/descriptive type questions
- **Create Coding Problem** - Programming challenges with test cases
- **Create Topic** - Adding new topic categorization

### Upload Actions
- **Bulk Upload Questions** - Importing multiple questions via file
- **Bulk Upload Students** - CSV import of student enrollments

### Generate Actions
- **Generate AI Content** - Auto-generate questions using AI (8+ questions)

### Manage Actions
- **Manage Topics** - Add, edit, or organize question topics
- **Delete Question** - Removing questions from question bank

---

## 3. SUBMISSIONS & GRADING (3 entries)

### Grading Actions
- **Grade Submission** - Assign score/marks to student submission
- **Approve Re-Attempt** - Allow student to retake assessment
- **Download Report** - Export submission reports or analytics

### View Actions
- **View Report** - Access submission details and analytics
- **View Student Progress** - Check individual student performance metrics

---

## 4. ROLES & PERMISSIONS (2 entries)

### Role Management
- **Create New Role** - Define custom role with specific permissions
- **Update Role Permissions** - Modify access levels for existing roles

### Permission Levels (Granular)
- **No Access** - No visibility or interaction
- **Viewer** - Read-only access
- **Editor** - View and Edit capabilities
- **Creator** - View, Edit, and Create
- **Manager** - Full Access including Delete

---

## 5. SETTINGS & CONFIGURATION (4 entries)

### Course Settings
- **Update Course Type** - Change from Public to Private or vice versa
- **Enable Module Sequencing** - Require students to complete modules in order
- **Update Course Collaborators** - Add/remove collaborator details and logos

### Organization Settings
- **Update Organization Branding** - Organization logo, name, colors
- **Update Organization Details** - Contact info, address, policies

### Account Settings
- **Update Account Profile** - User profile information changes

---

## 6. USER MANAGEMENT (3 entries)

### User Actions
- **Add New User** - Create user account with initial role assignment
- **Change User Role** - Modify user role (Admin → Instructor, Instructor → Ops)
- **Deactivate User Account** - Disable user access while preserving data
- **Activate User Account** - Re-enable deactivated user accounts

### User Permissions
- **Update User Permissions** - Modify specific feature access for users
- **Bulk Add Users** - Import multiple users from CSV

---

## 7. STUDENT MANAGEMENT (4 entries)

### Enrollment Actions
- **Add Student to Batch** - Enroll student in specific batch
- **Bulk Upload Students** - CSV import of multiple students
- **Update Student Details** - Change student information or batch assignment
- **Remove Student from Batch** - Unenroll student from batch

### Progress Actions
- **View Student Performance** - Access student's grades and completion

---

## 8. CURRICULUM MANAGEMENT (2 entries)

### Module Management
- **Create Module** - Add new learning module with topics
- **Delete Module** - Remove module from course curriculum
- **Update Module Content** - Modify module title, description, duration

### Project Management
- **Create Project** - Add project-based assignments
- **Update Project Details** - Change project scope, rubric, deadline

---

## Data Categories Across All Logs

### Status Changes
- Draft → Published
- Active → Archived
- Pending → Completed
- Enrolled → Removed

### User Roles Tracked
- **Admin** - Full platform access
- **Instructor** - Course and content creation
- **Ops** - Operations and system management

### Module Categories
- **Course Studio** - Course and curriculum management
- **Content Bank** - Question and assessment library
- **Submissions** - Student work and grading
- **Roles and Permissions** - Access control management
- **Settings** - System and course configuration
- **Users/Organizations** - User and organizational management

### Action Verbs Used
- Created
- Updated
- Published
- Deleted
- Removed
- Enabled/Disabled
- Bulk Uploaded
- Downloaded
- Graded
- Approved
- Generated
- Managed
- Archived

---

## Sample Entry Structure

```json
{
  "id": "1",
  "user": {
    "name": "Sarah Johnson",
    "email": "sarah.j@zuvy.org",
    "initials": "SJ"
  },
  "action": "published course",
  "module": "Course Studio",
  "target": "\"Full Stack Web Development Bootcamp\"",
  "timestamp": "09:15 PM",
  "dateLabel": "optional - for older entries",
  "details": {
    "type": "STATUS",
    "from": "Draft",
    "to": "Published"
  },
  "showDetails": true,
  "userRole": "Admin",
  "category": "COURSES",
  "date": "today|thisWeek|older"
}
```

---

## Filter Capabilities

### By Role
- Admin
- Instructor
- Ops

### By Action Type
- Create
- Update
- Delete
- Publish
- Grade
- Upload
- Download
- Archive

### By Date Range
- Today
- Past 7 Days
- Past 30 Days

### By Search Term
- Searches across: User name, email, action, module, target

---

## Future Enhancements

1. **Real-time Logging** - Connect to backend API for live audit trail
2. **Advanced Filters** - Time range picker, multiple role selection
3. **Export Functionality** - CSV/PDF export of filtered audit logs
4. **Search History** - Save and reuse common searches
5. **Admin Alerts** - Notify admins of critical actions (Delete, Publish)
6. **Bulk Operations** - Track batch operations with entry count
7. **User Activity Timeline** - Filter logs by specific user
8. **Change Approval Workflow** - Track approved vs. pending changes
9. **Data Retention Policy** - Archive old logs automatically

---

*Last Updated: February 11, 2026*
*Total Action Types Covered: 8 Modules, 30+ Distinct Actions*
