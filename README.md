# Zuvy Nexus Admin

A comprehensive educational content management platform designed for educators and administrators to create, manage, and deliver structured learning experiences.

## Overview

Zuvy Nexus Admin empowers educators to build complete courses with modular curriculum, manage student enrollments, create diverse assessments, and track learner progress—all through an intuitive, modern interface.

## Key Features

- **Course Studio** - Create and organize courses with drag-and-drop curriculum builder
- **Content Bank** - Centralized question library with MCQ, coding problems, and open-ended questions
- **Multiple Learning Formats** - Videos, articles, quizzes, assignments, coding challenges, projects, live classes, and feedback forms
- **Student Management** - Enrollment tracking, batch organization, and performance monitoring
- **Assessment Tools** - Auto-graded quizzes, manual grading interface, and submission tracking
- **Roles & Permissions** - Granular access control for different user types
- **AI-Powered Content** - AI question generation and bulk content operations

## Tech Stack

- **Framework:** Next.js 15.1.3 (App Router)
- **Language:** TypeScript 5.5.3
- **UI:** React 18.3.1 + Tailwind CSS 3.4.11
- **Components:** shadcn/ui (Radix UI)
- **State Management:** TanStack React Query 5.56.2
- **Forms:** React Hook Form + Zod validation
- **Drag & Drop:** DND Kit

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zuvy-nexus-admin

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Documentation

For detailed platform and design documentation, see the [`design-overview/`](design-overview/) folder:

- **[Platform Overview](design-overview/platform-overview.md)** - Complete feature documentation and user flows
- **[Style Guide](design-overview/style-guide.md)** - Design system, colors, typography, and component patterns

## Project Structure

```
zuvy-nexus-admin/
├── src/
│   ├── app/                 # Next.js routes (App Router)
│   ├── components/
│   │   ├── ui/             # shadcn base components
│   │   ├── courses/        # Course management
│   │   ├── settings/       # User & role management
│   │   └── shared/         # Reusable components
│   ├── lib/                # Utilities and helpers
│   └── page-components/    # Page-level containers
├── public/                 # Static assets
└── design-overview/        # Platform & design docs
```

---

Built with modern web technologies for scalable educational content delivery.
