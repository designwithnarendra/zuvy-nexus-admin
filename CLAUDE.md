# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Zuvy Nexus Admin Platform** - a comprehensive admin dashboard for managing educational content, courses, students, and assessments. Built with React, TypeScript, Vite, and shadcn/ui components with a modern design system using Tailwind CSS.

### Key Features

- **Course Management**: Create and manage courses with modular curriculum structure
- **Learning Content Types**: Articles, videos, quizzes, assignments, coding problems, live classes, feedback forms, and assessments
- **Student Management**: Organize students in batches, track progress and submissions
- **Assessment System**: Create and manage MCQ, coding, and open-ended questions with different difficulty levels
- **Submissions Tracking**: Review and grade various types of student submissions

## Development Commands

```bash
# Start development server (runs on port 8081)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture & Code Structure

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router DOM v6
- **Drag & Drop**: @dnd-kit for curriculum reordering
- **Forms**: react-hook-form with Zod validation

### Project Structure

```
src/
├── components/
│   ├── courses/           # Course management components
│   │   ├── curriculum/    # Module and learning item components
│   │   ├── students/      # Student management
│   │   ├── submissions/   # Submission tracking
│   │   └── learning-item-editors/  # Content editors
│   ├── ui/               # shadcn/ui components + custom UI
│   ├── shared/           # Shared components (DataTable, etc.)
│   └── layout/           # Layout components
├── pages/                # Route components
├── types/                # TypeScript definitions
├── hooks/                # Custom React hooks
└── lib/                  # Utilities
```

### Key Type Definitions

The `src/types/index.ts` file contains comprehensive TypeScript interfaces for:

- **Course Structure**: `Course`, `Module`, `Project` interfaces
- **Learning Items**: Union type supporting 8 content types (`Article`, `Video`, `Quiz`, `Assignment`, `CodingProblem`, `LiveClass`, `FeedbackForm`, `Assessment`)
- **Question Bank**: `Question` interface with support for MCQ, Coding, and Open Ended questions
- **Students & Batches**: `Student`, `Batch` interfaces
- **Submissions**: Different submission types for each content type

### Design System

- **Fonts**: Outfit (headings), Manrope (body), Fira Code (monospace)
- **Color Tokens**: Extensive HSL-based color system with semantic naming
- **Spacing**: Custom spacing scale optimized for educational interfaces
- **Components**: Extended shadcn/ui with custom animations and interactions

## Development Guidelines

### Component Architecture

- Use TypeScript strictly with proper interface definitions
- Leverage shadcn/ui components as the foundation
- Break complex components into smaller, reusable pieces
- Implement responsive design for all components (mobile-first)

### State Management

- Use React Query for server state simulation with mock data
- Use React hooks (useState, useReducer) for local component state
- Mock data should match the TypeScript interfaces exactly

### Code Quality Rules (from .cursor/rules)

- **Design Fidelity**: Implement pixel-perfect UIs with attention to spacing, typography, and animations
- **Micro-interactions**: Add subtle animations using tailwindcss-animate
- **Functional Prototyping**: Ensure all UI elements are interactive and functional
- **TypeScript Safety**: Define clear Props and State interfaces
- **Strategic Design**: Question assumptions, generate multiple solution alternatives
- **Task Execution**: Follow plans sequentially, announce steps clearly, mark tasks complete

### Route Structure

```
/ - Dashboard
/courses - All courses list
/courses/:courseId - Single course with tabs:
  - General Details
  - Curriculum (drag-drop module/item management)
  - Students (batch management)
  - Submissions (tracking & grading)
  - Settings
/content-bank - Question bank management
```

## Mock Data Strategy

All data is currently mocked in components. When implementing new features:

- Follow the TypeScript interfaces in `src/types/index.ts`
- Create realistic educational content scenarios
- Maintain data consistency across components
- Use React Query patterns for data fetching simulation

## Custom UI Components

- `focus-panel`: Custom panel component for detailed editing
- `canvas-drag-drop-container`: Drag & drop container for curriculum management
- `learning-item-card`: Specialized card for learning content
- `sortable-item`: Drag-sortable item wrapper

## Dependencies

Key libraries beyond standard React/TypeScript:

- `@dnd-kit/*`: Drag and drop functionality
- `@radix-ui/*`: Accessible UI primitives
- `react-hook-form` + `@hookform/resolvers`: Form management
- `zod`: Schema validation
- `date-fns`: Date manipulation
- `lucide-react`: Icon library
- `recharts`: Data visualization

## Recent Major Implementation (January 2025)

### Complete UI/UX Overhaul - 8 Phases Completed

**Phase 1: Tag System Removal**

- Removed topic/tag functionality from `CourseCard.tsx`, `AllCoursesPage.tsx`, `GeneralDetailsTab.tsx`
- Updated course creation modal and mock data accordingly
- Simplified course interface to focus on core properties

**Phase 2: Course Page Header Redesign**

- Redesigned `SingleCoursePage.tsx` header with new button layout
- Added "Back to Course Library", "Preview as Student", "Publish Course" buttons
- Removed redundant course info display (topic/duration/learners)
- Updated `CourseViewTabs.tsx` for 6-column grid with Batches tab

**Phase 3: General Details Updates**

- Changed title from "Course Information" to "General Details" in `GeneralDetailsTab.tsx`
- Fixed Course Start Date field with custom calendar picker styling
- Removed "Course Image" label for cleaner interface

**Phase 4: Curriculum Tab Major Overhaul**

- Enhanced `CurriculumTab.tsx` with improved spacing (24px module gaps, 16px item gaps)
- Updated side panel system for 50% width with custom footer content
- Improved `ModuleCard.tsx` and `LearningItemCard.tsx` with larger text and destructive styling
- Enhanced all learning item editors (Video, Live Class, Assignment, etc.) with better UX

**Phase 5: New Batches Tab Implementation**

- Created `BatchesTab.tsx` with 2-step batch creation process
- Implemented batch cards with instructor info, student counts, status badges
- Added modal system for batch creation with CSV upload functionality

**Phase 6: Students Tab Complete Restructure**

- Completely rebuilt `StudentsTab.tsx` removing old tabbed interface
- Added search bar and filters for batch/status
- Generated 50 realistic mock students with attendance data
- Updated `MasterStudentTable.tsx` with new Student interface (attendance field)
- Changed student status values to 'active', 'dropout', 'graduated'

**Phase 7: Content Bank Updates**

- Updated `QuestionBankPage.tsx` removing redundant "All questions" heading
- Moved question count to main "Question Bank" heading
- Removed bulk upload button from header
- Expanded mock data from 4 to 34 questions across multiple topics
- Added actions column with preview, edit, delete functionality
- Implemented pagination with 10/20/50/100 items per page options

**Phase 8: Settings & Polish**

- Updated `SettingsTab.tsx` changing "Danger Zone" to "Delete Course"
- Improved delete course layout with right-aligned button
- Added confirmation text field requiring "Delete Course" to be typed
- Fixed TypeScript lint errors

### Key UI/UX Improvements

**Design Consistency:**

- Applied consistent spacing (6px = space-y-6 = 24px gaps throughout)
- Used destructive color styling for delete actions across components
- Implemented shadow-4dp and hover effects consistently

**Data Management:**

- Created comprehensive mock data matching TypeScript interfaces
- Generated realistic educational scenarios (students, batches, questions)
- Maintained data consistency across all components

**User Experience:**

- Streamlined workflows (2-step batch creation, simplified course management)
- Added confirmation patterns for destructive actions
- Improved navigation with proper back buttons and breadcrumbs

## Compact Conversation rules

- Run /compact command after every 3 successful tasks

## Encouragement Rule

- Don't hold back. Give it your all
