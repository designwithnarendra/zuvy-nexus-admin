# Zuvy Admin Documentation

Welcome to the comprehensive documentation for the Zuvy Admin platform - a modern, full-featured learning management system admin dashboard.

## 🚀 Project Overview

Zuvy Admin is a React-based administrative interface for managing online courses, assessments, and educational content. Built with modern web technologies, it provides a comprehensive suite of tools for educators, content creators, and administrators.

### Key Features

- **📊 Analytics Dashboard** - Real-time insights into course performance and student engagement
- **🎓 Course Management** - Complete course lifecycle management with multiple content types
- **📝 Assessment Builder** - Advanced assessment creation with multiple question types
- **📚 Content Bank** - Centralized repository for questions and educational materials
- **👥 Student Management** - Student progress tracking and performance analytics
- **🎨 Modern UI** - Clean, responsive design with dark mode support

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: TanStack Query + React useState
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Notifications**: Sonner + React Hot Toast

## 📁 Documentation Structure

This documentation is organized into the following sections:

### 📋 Planning & Overview
- [**Project Overview**](./project-overview.md) - Vision, goals, and strategic direction
- [**Architecture**](./architecture.md) - Technical architecture and system design

### 🔧 Development
- [**Development Guide**](./development-guide.md) - Setup instructions and development workflow
- [**API Reference**](./api-reference.md) - API endpoints and data models

### 🎨 Design & UI
- [**Design System**](./design-system.md) - Colors, typography, and design principles
- [**Components**](./components.md) - Component library and usage guidelines
- [**Features**](./features.md) - Comprehensive feature documentation

## 🚀 Quick Start

1. **Prerequisites**: Node.js 18+ and npm/bun
2. **Installation**: `npm install` or `bun install`
3. **Development**: `npm run dev` or `bun dev`
4. **Build**: `npm run build` or `bun build`

## 📈 Project Structure

```
zuvy-nexus-admin/
├── docs/                 # Documentation
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── courses/      # Course management components
│   │   ├── content-bank/ # Content management components
│   │   ├── layout/       # Layout components
│   │   ├── shared/       # Shared components
│   │   └── ui/           # Base UI components (shadcn/ui)
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── styles/           # Global styles
├── public/               # Static assets
└── config files          # Configuration files
```

## 🎯 Key Capabilities

### Content Creation
- **8 Content Types**: Live Classes, Videos, Articles, Assignments, Quizzes, Coding Exercises, Feedback Forms, Assessments
- **Rich Assessment Builder**: MCQ, Coding Problems, Open-ended questions
- **Bulk Operations**: Import/export questions, bulk content creation

### Analytics & Insights
- **Performance Dashboards**: Course analytics, student progress, engagement metrics
- **Real-time Data**: Live updates on student activity and course performance
- **Advanced Reporting**: Detailed analytics with exportable reports

### Management Tools
- **Course Lifecycle**: Complete course creation, publishing, and management workflow
- **Student Tracking**: Progress monitoring, performance analytics, communication tools
- **Content Organization**: Hierarchical content structure with modules and projects

## 🔗 Related Resources

- [Lovable Project](https://lovable.dev/projects/47d01325-f458-42f3-805c-059834283eef) - Live development environment
- [shadcn/ui](https://ui.shadcn.com/) - Component library documentation
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [TanStack Query](https://tanstack.com/query) - Data fetching and state management

## 📞 Support

For questions, issues, or contributions:
- Check the [Development Guide](./development-guide.md) for setup help
- Review the [Components](./components.md) documentation for UI guidelines
- Explore the [Features](./features.md) guide for functionality details

---

*This documentation is maintained alongside the codebase and reflects the current state of the Zuvy Admin platform.* 