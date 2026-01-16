# Zuvy Nexus Admin - Project Overview

## Project Identity
- **Name**: Zuvy Nexus Admin
- **Tech Stack**: Next.js 15, TypeScript, shadcn/ui, TanStack Query, Tailwind CSS
- **Purpose**: Education platform administration interface for course management and content creation
- **Port**: Development runs on port 8081

## Key Features Implemented

### 1. Course Management System
- **Course Creation**: Create and manage courses with metadata
- **Curriculum Builder**: Drag-and-drop modules and projects with learning items
- **Module/Project Management**: Duration-based planning with week calculations
- **Navigation**: Proper routing between course overview and module content pages

### 2. Content Creation System (7 Content Types)
- **Live Class**: Title, description, date/time, duration with Zoom integration
- **Video**: YouTube URL or direct upload with optional transcript
- **Article**: Rich text editor, external links with bookmark preview, or PDF upload
- **Assignment**: Text instructions or PDF upload with optional due dates
- **Coding Problem**: Integration with content bank, search/filter, multiple selection
- **Quiz**: MCQ questions from content bank with unlimited selection
- **Feedback Form**: 7 question types including rating (1-10), multiple choice, text inputs

### 3. Content Bank
- **Question Management**: MCQ questions with topics, difficulty levels, explanations
- **Coding Problems**: Algorithm problems with constraints, test cases, difficulty ratings
- **Topic Management**: Categorization system for content organization
- **Search & Filter**: Advanced filtering by topic, difficulty, content type

### 4. Role-Based Access Control (RBAC)
- **3 User Roles**: Admin, Ops, Instructor with distinct permission matrices
- **User Context System**: React Context with sessionStorage persistence for role state management
- **User Management**: Invite system, role assignment, permission matrix (13 action types)
- **Settings Interface**: Dedicated settings section with Users and Manage Roles tabs
- **Role Selector**: Demo page (`/role-selector`) for testing Admin and Instructor accounts with batch metadata
- **Permission Control**: Granular action-based permissions with scope types (full, scoped, none)

### 4.1 Instructor Role Implementation

#### Core Architecture
- **Content Ownership**: `createdBy?: string` field on BaseLearningItem tracks creator email
- **Batch-Based Access**: Instructors assigned to specific batches via `instructorEmail` field
- **Permission Helpers** (`src/utils/instructor-helpers.ts`):
  - `getInstructorCourses()` - Filters courses by batch assignments
  - `getInstructorBatches()` - Returns instructor's assigned batches
  - `canEditContent()` - Admin: all content; Instructor: only own content
  - `getInstructorStudents()` - Filters students by instructor's batches
  - `hasMultipleBatches()` - Controls UI filter/column visibility

#### Students Tab
- **Filtered Student Lists**: Only shows students in instructor's assigned batches
- **Batch Display Logic**:
  - Single batch: "Batch: {name}" in bold (non-interactive)
  - Multiple batches: Standard batch dropdown filter
- **Hidden Batch Column**: For single-batch instructors (`hideBatchColumn` prop)
- **Restricted Actions**: Bulk upload button completely hidden

#### Curriculum Tab
- **Hidden Controls for Instructors**:
  - Add Module/Project button
  - Module/project drag handles
  - Module/project edit/delete actions
- **Content-Level Permissions**: Can add 6 content types (excludes Live Class, Assessment)

#### Tab Visibility
| Tab | Admin | Instructor |
|-----|-------|-----------|
| General Details | ✓ | ✓ (read-only) |
| Curriculum | ✓ | ✓ (restricted) |
| Students | ✓ | ✓ (filtered) |
| Batches | ✓ | ✗ |
| Submissions | ✓ | ✓ (no re-attempt approval) |
| Settings | ✓ | ✗ |

#### Additional Restrictions
- **General Details Tab**: Read-only for instructors, no save button
- **Submissions**: "Approve Re-Attempt" button hidden for instructors
- **View-Only Mode**: Planned for instructors viewing admin content (specs pending)

### 5. Submission Management
- **Individual Submission Views**: Dedicated pages for 6 submission types (assignments, projects, quizzes, coding problems, feedback forms, assessments)
- **Submission Details Page**: Reorganized layout with title positioning and grouped batch/metrics display
- **Assessment Reports**: Comprehensive assessment views with proctoring data, score breakdowns, and question-level analysis
- **Full-Width Tables**: Responsive submission tables with proper borders and conditional columns
- **Clean Layout**: Removed card wrappers for streamlined individual submission views

## Architecture Overview

### File Structure
```
src/
├── app/                          # Next.js App Router
│   ├── courses/[courseId]/       # Course management pages
│   ├── content-bank/             # Content bank interface
│   ├── settings/                 # RBAC and user management
│   └── submissions/              # Individual submission view pages
│       └── [courseId]/[itemId]/[studentId]/ # Submission detail routing
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── courses/                  # Course-specific components
│   │   ├── curriculum/           # Curriculum builder
│   │   ├── learning-item-editors/ # Content type editors
│   │   └── submissions/          # Submission view components
│   └── content-bank/             # Content bank components
└── docs/                         # Project documentation
```

### Key Components
- **ModulePage**: Main content editing interface with 25/75 split layout
  - Content ownership tracking with `createdBy` field
  - Permission-based UI using `canEditContent()` helper
- **Content Editors**: Individual editors for each content type with unsaved changes tracking
  - Content type labels ("Add Video", "Save Article", etc.)
- **ContentTypeSelector**: Modal for selecting content types (filtered by role)
- **CourseViewTabs**: Dynamic tab filtering based on user role
- **CurriculumTab**: Drag-drop and module management with role-based restrictions
- **StudentsTab**: Batch-filtered student lists with conditional UI elements
- **RoleMatrix**: Permission management interface for RBAC
- **MasterStudentTable**: Reusable table with `hideBatchColumn` prop
- **UserContext**: Role state management with persistence

### State Management
- **TanStack Query**: Server state management with mock data simulation
- **Client State**: React hooks for UI state (modals, forms, drag-and-drop)
- **Unsaved Changes**: Browser protection with warning modals

## Recent Major Developments

### Complete RBAC & Instructor Role System (Latest)
- **Architecture**:
  - 3-role system (Admin, Ops, Instructor) with 13 action types
  - UserContext with sessionStorage persistence
  - Batch-based access control linking instructors to courses
  - 8 permission helper functions in `instructor-helpers.ts`
- **Batch Management**:
  - Instructors assigned to batches via email field
  - Multi-batch vs single-batch UI logic (`hasMultipleBatches()`)
  - Automatic student/course filtering by batch assignments
- **UI Adaptations**:
  - Dynamic tab visibility (hides Batches, Settings for instructors)
  - Conditional batch columns and filters
  - Role-based button/action hiding (bulk upload, re-attempt approval, module management)
- **Content Permissions**:
  - `createdBy` field tracks content ownership
  - `canEditContent()` enforces edit restrictions
  - Instructors can add 6 content types (excludes Live Class, Assessment)
- **Development Tools**:
  - Role Selector page for testing different user accounts
  - Shows batch/course counts for each instructor

### Submission Management System Redesign
- **Individual Submission Views**: Created 6 dedicated submission view components (AssignmentSubmissionView, ProjectSubmissionView, QuizSubmissionView, CodingProblemSubmissionView, FeedbackSubmissionView, AssessmentSubmissionView)
- **Routing Architecture**: Implemented `/submissions/[courseId]/[itemId]/[studentId]` with server/client component separation
- **Layout Optimization**: Reorganized submission details page with title positioning and grouped batch/metrics display
- **Table Enhancements**: Full-width responsive tables with proper borders and conditional columns based on submission type
- **Clean Design**: Removed outer card wrappers from all submission views for streamlined layouts

### Module Content Page Enhancements
- **Inline Editors**: Content editors display in main content area (75% width)
- **Design Spec Compliance**: Underlined title inputs (h5 size), 14px content type labels
- **Functional File Uploads**: Real file validation and upload handling
- **Centered Layouts**: max-w-3xl containers except for 4:6 split layouts (coding/quiz)
- **Content Bank Integration**: Mock data with search/filter functionality

### RBAC Implementation
- **Complete User Management**: User invitation, role assignment, permission matrix
- **Settings Navigation**: New Settings tab with Users and Manage Roles sections
- **Permission Control**: Action-based permissions for granular access control

### UI/UX Improvements
- **Unsaved Changes System**: Browser protection with warning modals
- **Module Card Behavior**: Full card clickable for navigation, edit button for modals
- **Duration Management**: Week-based duration planning for course scheduling

## File Locations & Key References

### Important Configuration Files
- `package.json` - Dependencies and scripts
- `CLAUDE.md` - Development guidelines and design principles
- `docs/design-specs.md` - Detailed UI/UX specifications

### Core Type Definitions
- `src/types/index.ts` - Main type definitions
  - `UserRole`: Admin, Ops, Instructor
  - `BaseLearningItem`: Includes `createdBy?: string` for ownership tracking
  - `RoleActionPermission`: Permission matrix structure
- `src/types/mock-rbac-data.ts` - RBAC permission configurations and mock users
- `src/types/mock-data.ts` - Batch assignments with `instructorEmail` field

### Major Pages
- `src/app/courses/page.tsx` - Course listing (filtered by role)
- `src/app/courses/[courseId]/page.tsx` - Course overview with role-based tabs
- `src/app/courses/[courseId]/modules/[moduleId]/page.tsx` - Module content editing
- `src/app/role-selector/page.tsx` - Role testing and account switching
- `src/app/content-bank/page.tsx` - Content bank management
- `src/app/settings/users/page.tsx` - User management
- `src/app/settings/manage-roles/page.tsx` - Role permission management
- `src/app/submissions/[courseId]/[itemId]/[studentId]/page.tsx` - Individual submission views

## Key Utilities & Helpers

### Instructor Permission Helpers (`src/utils/instructor-helpers.ts`)
| Function | Purpose |
|----------|---------|
| `getInstructorCourses()` | Returns courses instructor has batch access to |
| `getInstructorBatches()` | Filters batches by instructor email |
| `hasInstructorAccessToCourse()` | Boolean check for course access |
| `canEditContent()` | Checks if user can edit specific content item |
| `getInstructorStudents()` | Returns students in instructor's batches |
| `isInstructorStudent()` | Validates student ownership |
| `hasMultipleBatches()` | Determines if instructor manages multiple batches |
| `canReorderContent()` | Checks if user can reorder content items |

### User Context (`src/contexts/UserContext.tsx`)
- **State Management**: Current user, role detection methods
- **Persistence**: sessionStorage with key `'zuvy_current_user'`
- **Methods**: `isInstructor()`, `isAdmin()`, `logout()`
- **Integration**: Used throughout app for role-based UI

## Development Notes
- Uses Next.js 15 App Router with file-based routing
- All components follow shadcn/ui patterns with TypeScript strict mode
- Mock data simulation with TanStack Query for backend-free development
- RBAC system with batch-based access control for instructors
- Responsive design with mobile-first approach using Tailwind CSS
- Role Selector page for testing different user permissions

This overview provides the essential context needed for any new development session on the Zuvy Nexus Admin platform.