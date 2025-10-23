# Zuvy Nexus Admin - Platform Overview

## What is Zuvy Nexus Admin?

Zuvy Nexus Admin is an educational content management platform designed for educators and administrators to create, manage, and deliver structured learning experiences. It provides comprehensive tools for curriculum design, student management, and assessment delivery.

## Core Purpose

Enable educators to:
- Build structured courses with modular curriculum
- Create and organize diverse learning content
- Manage student enrollments and track progress
- Deliver and grade assessments
- Organize students into batches/cohorts

---

## Key Features

### 1. Course Studio
Central hub for course creation and management.

**Capabilities:**
- Create courses with metadata (title, description, tags, thumbnail)
- Organize curriculum using modules and topics hierarchy
- Drag-and-drop content reordering
- Course status management (Draft, Published, Archived)
- Version control for curriculum changes

**Routes:**
- `/courses` - All courses listing
- `/courses/[courseId]` - Course detail with multi-tab interface

### 2. Content Bank
Centralized question library for reusable assessment content.

**Question Types:**
- **MCQ** - Multiple choice questions with single/multiple correct answers
- **Open-ended** - Text-based questions requiring manual grading
- **Coding Problems** - Programming challenges with test cases

**Features:**
- AI-powered question generation
- Bulk upload capabilities
- Tag-based organization
- Question reuse across multiple courses
- Import from external sources

**Route:** `/content-bank`

### 3. Learning Item Types
Diverse content formats to support various teaching methods:

| Type | Purpose | Key Features |
|------|---------|--------------|
| **Video** | Video lectures | Embed links, duration tracking |
| **Article** | Written content | Rich text editor, markdown support |
| **Quiz** | Knowledge checks | MCQ questions, auto-grading |
| **Assignment** | Practice tasks | Manual grading, file submissions |
| **Coding Problem** | Programming practice | Test cases, code execution |
| **Project** | Capstone work | Multi-week tracking, milestones |
| **Live Class** | Synchronous sessions | Meeting links, scheduling |
| **Assessment** | Comprehensive tests | Mixed question types, time limits |
| **Feedback Form** | Student feedback | Custom questions, optional responses |

### 4. Student Management
Track and manage learner progress.

**Features:**
- Student enrollment and unenrollment
- Bulk student upload via CSV
- Individual student profiles with performance data
- Progress tracking across modules
- Submission history and grades
- Multi-batch filtering

**Route:** `/courses/[courseId]/students/[studentId]`

### 5. Batch Management
Organize students into cohorts.

**Capabilities:**
- Create batches with start/end dates
- Assign students to multiple batches
- Batch-specific analytics
- Cohort-based content delivery

**Route:** `/courses/[courseId]/batches/[batchId]`

### 6. Assessment & Grading
Comprehensive assessment tools with automated and manual grading.

**Assessment Types:**
- Time-bound quizzes
- Open-ended assignments
- Coding challenges with automated test execution
- Project submissions with rubrics

**Grading Features:**
- Auto-grading for MCQ and coding (with test cases)
- Manual grading interface for open-ended questions
- Re-attempt management
- Bulk grading capabilities
- Submission review with inline feedback

**Route:** `/submissions/[courseId]/[itemId]/[studentId]`

### 7. Project Management
Track multi-week student projects.

**Features:**
- Project creation with descriptions and requirements
- Milestone tracking
- Submission deadlines
- Team/individual project support
- Progress monitoring

**Route:** `/courses/[courseId]/projects/[projectId]`

### 8. Roles & Permissions
User access control system.

**Features:**
- Role creation with granular permissions
- User role assignment
- Permission matrix for different actions
- Role-based UI rendering

**Route:** `/settings`

---

## User Flows

### Primary Flow: Course Creation
1. **Create Course** → Add metadata (title, description, tags, thumbnail)
2. **Build Curriculum** → Add modules and topics using drag-drop
3. **Add Content** → Insert learning items (videos, quizzes, assignments, etc.)
4. **Enroll Students** → Add students individually or bulk upload
5. **Organize Batches** → Create cohorts with specific timelines
6. **Publish Course** → Change status from Draft to Published
7. **Track Progress** → Monitor student submissions and grades

### Content Creation Flow
1. **Content Bank** → Create questions (MCQ, coding, open-ended)
2. **Tag & Organize** → Add tags for easy discovery
3. **Reuse Content** → Import questions into course assessments
4. **Version Control** → Update questions without breaking existing courses

### Assessment Flow
1. **Build Assessment** → Select question types and add questions
2. **Configure Settings** → Set time limits, passing criteria, attempt limits
3. **Assign to Course** → Add assessment to curriculum
4. **Student Completion** → Students submit responses
5. **Auto/Manual Grade** → System grades MCQ/coding, educator grades open-ended
6. **Feedback & Re-attempts** → Provide feedback, allow re-attempts if configured

---

## Technical Architecture

### Technology Stack
- **Framework:** Next.js 15.1.3 (App Router)
- **UI Library:** React 18.3.1
- **Language:** TypeScript 5.5.3
- **Styling:** Tailwind CSS 3.4.11
- **Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form 7.53.0 + Zod validation
- **State Management:** TanStack React Query 5.56.2
- **Icons:** Lucide React 0.462.0
- **Drag-Drop:** DND Kit + React Beautiful DND
- **Charts:** Recharts 2.12.7

### Architecture Patterns
- **App Router** - File-based routing in `app/` directory
- **Server/Client Components** - Proper separation for performance
- **Modal-driven Editors** - Content creation in focused dialogs
- **Master-Detail Pattern** - List → Detail → Editor hierarchy
- **Tab-based Interface** - Multi-tab course views for organization
- **Data Tables** - Reusable table component for all listings
- **Form Builders** - Consistent editor patterns across content types

### Component Structure
```
src/
├── app/                      # Next.js routes
│   ├── courses/             # Course management
│   ├── content-bank/        # Question bank
│   ├── submissions/         # Grading interface
│   └── settings/            # Roles & permissions
├── components/
│   ├── ui/                  # 42 shadcn base components
│   ├── courses/             # Course-specific components
│   │   ├── curriculum/      # Curriculum builder
│   │   ├── learning-item-editors/  # Content editors
│   │   └── assessment-builder/     # Assessment tools
│   ├── settings/            # User management
│   ├── shared/              # Reusable components
│   └── layout/              # Layout components
└── page-components/         # Page containers
```

---

## Notable Features

### AI Integration
- AI-powered question generation in Content Bank
- Automated question creation based on learning objectives

### Bulk Operations
- Student bulk upload via CSV
- Bulk question import
- Bulk grading capabilities

### Drag-and-Drop Curriculum
- Intuitive content reordering
- Module/topic hierarchy management
- Visual curriculum builder

### Multi-format Submissions
- Text submissions for assignments
- Code submissions with syntax highlighting
- File uploads for projects
- Multiple re-attempt tracking

### Analytics & Performance
- Student performance widgets
- Course completion rates
- Batch-level analytics
- Individual progress tracking

---

## Target Users

1. **Educators** - Create courses, grade submissions, track student progress
2. **Course Administrators** - Manage enrollments, organize batches, oversee curriculum
3. **Content Creators** - Build question banks, design assessments, create learning materials
4. **Administrators** - Manage users, assign roles, configure permissions

---

## Getting Started

1. **Create a Course** - Navigate to `/courses` and click "Create Course"
2. **Build Curriculum** - Add modules and topics, then populate with learning items
3. **Add Questions to Content Bank** - Create reusable assessment questions
4. **Enroll Students** - Add students individually or via bulk upload
5. **Organize Batches** - Create cohorts with specific start/end dates
6. **Publish & Monitor** - Publish course and track student progress

---

*Last Updated: January 2025*
