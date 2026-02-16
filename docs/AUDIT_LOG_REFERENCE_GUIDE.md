# Audit Log - Action Types Reference Guide

## Quick Reference Matrix

### Course Studio Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Create Course | Instructor | Course Studio | "Python for Data Science" | N/A → Draft |
| Update Course Image | Admin | Course Studio | Course title | Previous → New image |
| Publish Course | Admin | Course Studio | Course title | Draft → Published |
| Create Module | Instructor | Course Studio | Module name | N/A → 3 weeks |
| Delete Module | Instructor | Course Studio | Module name | Active → Deleted |
| Create Batch | Instructor | Course Studio | Batch name | N/A → Created |
| Update Batch Cap | Instructor | Course Studio | Batch name | 30 → 35 students |
| Archive Batch | Instructor | Course Studio | Batch name | Active → Archived |
| Delete Course | Admin | Course Studio | Course title | Active → Deleted |
| Update Course Type | Ops | Settings | Course name | Public ↔ Private |
| Enable Module Lock | Instructor | Settings | Course name | Disabled → Enabled |

### Student Management Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Add Student | Instructor | Course Studio | Student + Batch | Not enrolled → Enrolled |
| Bulk Add Students | Admin | Course Studio | Batch name | 0 → 25 students |
| Update Student Batch | Instructor | Course Studio | Student name | Batch A → Batch B |
| Remove Student | Instructor | Course Studio | Student name | Enrolled → Removed |

### Content Bank Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Create MCQ | Instructor | Content Bank | Question title | N/A → MCQ |
| Create Open-Ended | Instructor | Content Bank | Question title | N/A → Open Ended |
| Create Coding | Instructor | Content Bank | Problem title | N/A → Coding |
| Bulk Upload | Instructor | Content Bank | Topic name | 0 → 32 questions |
| Generate AI | Admin | Content Bank | Topic name | N/A → 8 questions |
| Manage Topics | Ops | Content Bank | Question Bank | 12 → 17 topics |
| Delete Question | Instructor | Content Bank | Question title | In use → Deleted |

### Submission & Grading Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Grade Submission | Instructor | Submissions | Assessment + Student | Pending → 75% |
| Approve Re-Attempt | Instructor | Submissions | Assessment + Student | Denied → Approved |
| Download Report | Instructor | Submissions | Assessment name | On platform → Downloaded |

### User Management Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Add User | Admin | Settings | User email | N/A → Instructor |
| Change User Role | Admin | Settings | User email | Instructor → Ops |
| Deactivate User | Ops | Settings | User email | Active → Deactivated |

### Role Management Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Create Role | Admin | Roles & Permissions | Role name | N/A → 8 permissions |
| Update Permissions | Admin | Roles & Permissions | Role name | Viewer → Creator |

### Organization Actions
| Action | User Type | Module | Target Example | Details |
|--------|-----------|--------|-----------------|---------|
| Update Organization | Admin | Settings | Organization name | Previous → New settings |

---

## Action Type Hierarchy

```
PLATFORM ACTIONS
├── COURSE MANAGEMENT
│   ├── Create Course (Draft)
│   ├── Publish Course (Published)
│   ├── Delete Course (Archived)
│   ├── Update Settings (Type, Sequencing)
│   ├── MODULE MANAGEMENT
│   │   ├── Create Module
│   │   ├── Update Module
│   │   └── Delete Module
│   └── BATCH MANAGEMENT
│       ├── Create Batch
│       ├── Update Batch
│       └── Archive Batch
├── STUDENT MANAGEMENT
│   ├── Add Student (Single)
│   ├── Add Students (Bulk)
│   ├── Update Student
│   └── Remove Student
├── CONTENT MANAGEMENT
│   ├── QUESTION CREATION
│   │   ├── Create MCQ
│   │   ├── Create Open-Ended
│   │   └── Create Coding
│   ├── QUESTION UPLOAD
│   │   ├── Bulk Upload
│   │   └── AI Generate
│   ├── TOPIC MANAGEMENT
│   │   ├── Add Topic
│   │   ├── Remove Topic
│   │   └── Update Topic
│   └── QUESTION DELETION
│       └── Delete Question
├── ASSESSMENT MANAGEMENT
│   ├── Grade Submission
│   ├── Approve Re-Attempt
│   └── Download Report
├── ACCESS CONTROL
│   ├── ROLE MANAGEMENT
│   │   ├── Create Role
│   │   ├── Update Role
│   │   └── Delete Role
│   └── PERMISSION ASSIGNMENT
│       ├── Add Permission
│       ├── Update Permission
│       └── Remove Permission
└── SYSTEM ADMINISTRATION
    ├── USER MANAGEMENT
    │   ├── Add User
    │   ├── Change Role
    │   ├── Deactivate User
    │   └── Activate User
    └── ORGANIZATION SETTINGS
        ├── Update Branding
        ├── Update Details
        └── Configure Policies
```

---

## Timeline Activity Patterns

### TODAY (Recent Activity)
```
09:15 PM - Publish Course
08:45 PM - Update Course Image
07:32 PM - Create Module
06:20 PM - Delete Module
05:10 PM - Create Batch
04:45 PM - Create MCQ
03:30 PM - Bulk Upload
02:15 PM - AI Generation
01:00 PM - Create Open-Ended
11:45 AM - Manage Topics
```

### THIS WEEK (Last 7 Days)
```
4 days ago - Add Student
4 days ago - Bulk Upload Students
3 days ago - Update Student Batch
2 days ago - Remove Student
2 days ago - Grade Submission
2 days ago - Approve Re-Attempt
1 day ago  - Download Report
1 day ago  - Update Role Permissions
1 day ago  - Create New Role
```

### OLDER (Archive)
```
Jan 30 - Update Course Type
Jan 29 - Enable Module Lock
Jan 28 - Delete Course
Jan 27 - Add User
Jan 26 - Change User Role
Jan 25 - Deactivate User
Jan 24 - Delete Question
Jan 23 - Create Coding Problem
Jan 22 - Update Batch Details
Jan 21 - Archive Batch
Jan 20 - Update Organization Settings
```

---

## Detail Type Mappings

### Status Changes
```
TYPE: STATUS
Transitions:
  Draft → Published
  Draft → Deleted
  Published → Archived
  Active → Inactive
  Active → Archived
  Pending → Completed
  Enrolled → Removed
```

### Permission Changes
```
TYPE: PERMISSION
Transitions:
  No Access → Viewer
  Viewer → Editor
  Editor → Creator
  Creator → Manager
  Any → Any (Downgrade)
```

### Role Changes
```
TYPE: ROLE_CHANGE
Transitions:
  Instructor → Admin
  Instructor → Ops
  Admin → Instructor
  Ops → Instructor
```

### Enrollment Changes
```
TYPE: ENROLLMENT
Transitions:
  Not Enrolled → Enrolled
  Enrolled → Different Batch
  Enrolled → Removed
```

### Grading Changes
```
TYPE: GRADE
Transitions:
  Pending → Score (0-100%)
  Score → Re-graded Score
  Re-attempt Denied → Approved
```

### Capacity Changes
```
TYPE: CAP_ENROLLMENT
Transitions:
  30 students → 35 students
  35 students → 40 students
```

---

## Search & Filter Examples

### By Action Verb
- "published" → Show all publish actions
- "created" → Show all create actions
- "deleted" → Show all delete actions
- "graded" → Show all grading activities
- "uploaded" → Show all upload activities

### By Module
- "Course Studio" → 9 entries
- "Content Bank" → 8 entries
- "Submissions" → 3 entries
- "Settings" → 4 entries
- "Roles and Permissions" → 2 entries

### By User Role
- "Admin" → 10 entries (policy enforcement)
- "Instructor" → 15 entries (daily operations)
- "Ops" → 5 entries (system management)

### By Target
- "Course" → All course-related actions
- "Batch" → All batch management actions
- "Question" → All content bank actions
- "Student" → All student management actions
- "User" → All user management actions

### By Date
- "today" → 10 entries
- "thisWeek" → 10 entries
- "older" → 10 entries

---

## Performance Indicators

### Action Count by Category
```
Course Studio:          9 actions (30%)
Content Bank:           8 actions (26.7%)
Submissions:            3 actions (10%)
Student Management:     4 actions (13.3%)
Settings:               4 actions (13.3%)
User Management:        3 actions (10%)
Roles:                  2 actions (6.7%)
Organization:           1 action  (3.3%)
```

### Action Distribution by User Type
```
Admin:       10 actions (33%)
Instructor:  15 actions (50%)
Ops:          5 actions (17%)
```

### Time-Based Distribution
```
Today:       10 entries (33%)
This Week:   10 entries (33%)
Older:       10 entries (34%)
```

---

## Future Expansion Ideas

### Additional Action Types to Consider
1. **Deadline Management**
   - Set assignment deadline
   - Extend deadline
   - Remove deadline

2. **Analytics**
   - View course analytics
   - Export student reports
   - Access dashboard

3. **Communication**
   - Send announcement
   - Send notification
   - Create discussion post

4. **Version Control**
   - Create course backup
   - Restore from backup
   - Version history

5. **Scheduling**
   - Schedule class
   - Reschedule class
   - Cancel class

6. **Integration**
   - Connect LMS integration
   - Sync with platform
   - Export to system

7. **Compliance**
   - Download audit log
   - Generate compliance report
   - Export for audit

---

## Database Schema Recommendation

```typescript
interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: 'Admin' | 'Instructor' | 'Ops';
  
  action: string;           // "published", "created", etc.
  actionType: string;       // STATUS, PERMISSION, etc.
  module: string;           // Course Studio, Content Bank, etc.
  category: string;         // COURSES, QUESTIONS, etc.
  
  target: string;           // Resource name/ID
  targetType: string;       // course, batch, student, etc.
  
  changes: {
    field: string;
    previousValue: string;
    newValue: string;
  }[];
  
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  
  status: 'success' | 'failed' | 'pending';
  errorMessage?: string;
}
```

---

*Last Updated: February 11, 2026*
*Total Action Types: 50+*
*Coverage Areas: 8 major platform modules*
