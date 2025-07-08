# Development Guide

## Overview

This guide provides comprehensive information for developers working on the Zuvy Admin project. It covers setup procedures, coding standards, best practices, and workflow guidelines.

## Prerequisites

### Required Software

**Node.js & Package Manager**
- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (included with Node.js)
- **Optional**: Bun for faster package management

**Development Tools**
- **Git**: Version control
- **VS Code**: Recommended IDE with extensions
- **Chrome DevTools**: For debugging and performance analysis

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-eslint"
  ]
}
```

## Project Setup

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd zuvy-nexus-admin

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file for local development:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_ANALYTICS=false
```

### Development Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

## Code Organization

### File Structure Standards

**Component Organization**
```
src/components/
├── feature-name/          # Feature-specific components
│   ├── FeatureComponent.tsx
│   ├── SubComponent.tsx
│   ├── hooks/            # Feature-specific hooks
│   ├── types.ts          # Feature types
│   └── utils.ts          # Feature utilities
├── shared/               # Shared components
└── ui/                   # Base UI components (shadcn/ui)
```

**Page Organization**
```
src/pages/
├── feature-name/
│   ├── FeaturePage.tsx   # Main page component
│   ├── FeatureDetail.tsx # Detail page
│   └── hooks/            # Page-specific hooks
```

### Naming Conventions

**Files and Directories**
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (`useUserData.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`UserProfile.types.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

**Variables and Functions**
```typescript
// Variables - camelCase
const userName = 'john_doe';
const isAuthenticated = true;

// Functions - camelCase
const fetchUserData = () => { /* */ };
const handleSubmit = () => { /* */ };

// Components - PascalCase
const UserProfile = () => { /* */ };
const CourseCard = () => { /* */ };

// Types and Interfaces - PascalCase
interface UserProfile {
  id: string;
  name: string;
}

type CourseStatus = 'draft' | 'published' | 'archived';
```

## TypeScript Guidelines

### Type Definitions

**Component Props**
```typescript
// Define props interface
interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  status: CourseStatus;
  onClick: (id: string) => void;
  className?: string; // Optional props with ?
}

// Use props interface
const CourseCard = ({ id, title, description, status, onClick, className }: CourseCardProps) => {
  return (
    <div className={className} onClick={() => onClick(id)}>
      {/* Component content */}
    </div>
  );
};
```

**State Types**
```typescript
// State interface
interface FormState {
  isLoading: boolean;
  error: string | null;
  data: CourseData | null;
}

// Hook return type
interface UseFormReturn {
  state: FormState;
  actions: {
    submit: (data: FormData) => Promise<void>;
    reset: () => void;
  };
}
```

**API Types**
```typescript
// API response types
interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
}

interface Course {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// API function types
type CreateCourseParams = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateCourseParams = Partial<CreateCourseParams> & { id: string };
```

### Type Safety Best Practices

**Strict Type Checking**
```typescript
// Use discriminated unions for complex states
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Course[] }
  | { status: 'error'; error: string };

// Type guards for runtime safety
const isValidCourse = (obj: any): obj is Course => {
  return obj && 
         typeof obj.id === 'string' &&
         typeof obj.title === 'string' &&
         ['draft', 'published', 'archived'].includes(obj.status);
};
```

## Component Development

### Component Structure

**Standard Component Template**
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Props interface
interface ComponentNameProps {
  title: string;
  className?: string;
  onAction?: () => void;
}

// Component implementation
const ComponentName = ({ title, className, onAction }: ComponentNameProps) => {
  // State hooks
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Event handlers
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onAction?.();
  };
  
  // Render
  return (
    <Card className={cn("default-styles", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleToggle}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComponentName;
```

## Git Workflow

### Branch Strategy

**Branch Naming**
```bash
# Feature branches
feature/course-management
feature/assessment-builder

# Bug fixes
bugfix/modal-close-issue
bugfix/form-validation

# Hotfixes
hotfix/security-patch
hotfix/critical-bug
```

### Commit Messages

**Conventional Commits Format**
```bash
# Format: type(scope): description
feat(courses): add course creation modal
fix(auth): resolve login validation issue
docs(readme): update installation instructions
style(components): improve button hover states
refactor(hooks): simplify useForm implementation
test(components): add CourseCard component tests
```

## Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript service in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

This development guide provides the foundation for maintaining code quality, consistency, and performance in the Zuvy Admin project. 