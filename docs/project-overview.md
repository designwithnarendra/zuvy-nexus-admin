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
- **4 User Roles**: Super Admin, Admin, Ops, Instructors with different permissions
- **User Management**: Invite system, role assignment, permission matrix
- **Settings Interface**: Dedicated settings section with Users and Manage Roles tabs
- **Permission Control**: Granular action-based permissions for Ops and Instructors

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
- **Content Editors**: Individual editors for each content type with unsaved changes tracking
- **ContentTypeSelector**: Modal for selecting content types to add
- **ModuleCard**: Drag-and-drop module cards with navigation and editing
- **RoleMatrix**: Permission management interface for RBAC

### State Management
- **TanStack Query**: Server state management with mock data simulation
- **Client State**: React hooks for UI state (modals, forms, drag-and-drop)
- **Unsaved Changes**: Browser protection with warning modals

## Recent Major Developments

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
- `src/components/courses/curriculum/types.ts` - Content type interfaces
- Content editors with proper TypeScript interfaces for all data structures

### Major Pages
- `src/app/courses/page.tsx` - Course listing and management
- `src/app/courses/[courseId]/page.tsx` - Course overview with curriculum
- `src/app/courses/[courseId]/modules/[moduleId]/page.tsx` - Module content editing
- `src/app/content-bank/page.tsx` - Content bank management
- `src/app/settings/users/page.tsx` - User management
- `src/app/settings/manage-roles/page.tsx` - Role permission management
- `src/app/submissions/[courseId]/[itemId]/[studentId]/page.tsx` - Individual submission views
- `src/pages/submissions/SubmissionDetailsPage.tsx` - Submission list/details page

## Development Notes
- Uses Next.js 15 App Router with file-based routing
- All components follow shadcn/ui patterns with TypeScript strict mode
- Mock data simulation with TanStack Query for backend-free development
- Responsive design with mobile-first approach using Tailwind CSS
- Drag-and-drop functionality with proper keyboard accessibility support

This overview provides the essential context needed for any new development session on the Zuvy Nexus Admin platform.