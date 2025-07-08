# Technical Architecture

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Zuvy Admin Frontend                     │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + Vite                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Presentation   │  │  Business Logic │  │  Data Layer │ │
│  │  Layer          │  │  Layer          │  │             │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────┤ │
│  │ • Pages         │  │ • Custom Hooks  │  │ • TanStack  │ │
│  │ • Components    │  │ • Utilities     │  │   Query     │ │
│  │ • Layout        │  │ • Validation    │  │ • Local     │ │
│  │ • UI Components │  │ • Form Handling │  │   Storage   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
│                          HTTP/REST API                     │
└─────────────────────────────────────────────────────────────┘
│                    Backend Services                        │
│                  (To be implemented)                       │
└─────────────────────────────────────────────────────────────┘
```

### Core Architecture Principles

1. **Separation of Concerns**: Clear boundaries between presentation, business logic, and data
2. **Component Composition**: Reusable, composable components following React best practices
3. **Type Safety**: TypeScript throughout for better developer experience and maintainability
4. **Performance First**: Optimized for fast loading and smooth interactions
5. **Accessibility**: Built-in support for screen readers and keyboard navigation

## 📁 Directory Structure

```
src/
├── components/              # Reusable UI components
│   ├── courses/            # Course management components
│   │   ├── assessment-builder/  # Assessment creation tools
│   │   ├── coding-creator/     # Coding problem creator
│   │   ├── mcq-creator/       # MCQ creation tools
│   │   └── [other creators]   # Various content creators
│   ├── content-bank/       # Question bank components
│   ├── layout/             # Layout and navigation
│   ├── shared/             # Shared/common components
│   └── ui/                 # Base UI components (shadcn/ui)
├── pages/                  # Page components (route handlers)
│   ├── courses/           # Course-related pages
│   ├── content-bank/      # Content bank pages
│   └── [other pages]      # Dashboard, etc.
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
├── types/                  # TypeScript type definitions
└── styles/                 # Global styles and themes
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Latest React with concurrent features
- **TypeScript 5.5**: Type safety and developer experience
- **Vite 5.4**: Fast build tool and development server

### UI & Styling
- **shadcn/ui**: Pre-built accessible components
- **Radix UI**: Headless UI primitives
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Lucide React**: Consistent icon library

### State Management
- **TanStack Query 5.5**: Server state management and caching
- **React useState**: Local component state
- **Context API**: Global state where needed

### Form Handling
- **React Hook Form 7.5**: Performant form library
- **Zod 3.2**: Runtime type validation
- **@hookform/resolvers**: Form validation integration

### Routing & Navigation
- **React Router DOM 6.2**: Client-side routing
- **Type-safe routing**: Custom hooks for navigation

### Data Visualization
- **Recharts 2.1**: React charting library
- **Custom widgets**: Performance and analytics components

### Development Tools
- **ESLint 9**: Code linting and standards
- **TypeScript ESLint**: TypeScript-specific linting
- **Vite plugins**: Development enhancements

## 🧩 Component Architecture

### Component Hierarchy

```
App (Root)
├── MainLayout
│   ├── Header Navigation
│   └── Main Content Area
│       ├── DashboardPage
│       │   ├── PerformanceWidget[]
│       │   ├── RecentActivity
│       │   └── CourseAnalytics
│       ├── AllCoursesPage
│       │   ├── CourseCard[]
│       │   └── SearchFilters
│       ├── SingleCoursePage
│       │   └── CourseViewTabs
│       │       ├── GeneralDetailsTab
│       │       ├── CurriculumTab
│       │       │   ├── AddItemMenu
│       │       │   └── ContentCreators
│       │       ├── StudentsTab
│       │       └── SettingsTab
│       └── QuestionBankPage
│           ├── DataTable
│           ├── QuestionCreators
│           └── BulkOperations
```

### Design Patterns

#### 1. Compound Components
Used for complex UI components with multiple related parts:

```typescript
// Example: AssessmentBuilder
<AssessmentBuilder>
  <AssessmentBuilder.Header />
  <AssessmentBuilder.Content>
    <AssessmentBuilder.QuestionBank />
    <AssessmentBuilder.SelectedQuestions />
  </AssessmentBuilder.Content>
  <AssessmentBuilder.Actions />
</AssessmentBuilder>
```

#### 2. Render Props Pattern
For flexible component composition:

```typescript
<DataTable
  data={questions}
  columns={columns}
  renderRow={(question) => <QuestionRow question={question} />}
  renderActions={(question) => <QuestionActions question={question} />}
/>
```

#### 3. Custom Hooks
For reusable logic extraction:

```typescript
// Custom hooks for common patterns
const useQuestionBank = () => { /* ... */ }
const useCourseData = (courseId: string) => { /* ... */ }
const useAssessmentBuilder = () => { /* ... */ }
```

### Component Categories

#### 1. Layout Components
- **MainLayout**: Application shell with navigation
- **Page containers**: Consistent page structure
- **Grid systems**: Responsive layouts

#### 2. UI Components (shadcn/ui)
- **Primitive components**: Button, Input, Card, etc.
- **Composite components**: DataTable, Dialog, Tabs
- **Form components**: Select, Checkbox, RadioGroup

#### 3. Business Components
- **Course management**: CourseCard, CourseViewTabs
- **Content creation**: Various creator components
- **Assessment tools**: AssessmentBuilder, QuestionCreators
- **Analytics**: PerformanceWidget, Charts

#### 4. Shared Components
- **DataTable**: Reusable table with sorting/filtering
- **PerformanceWidget**: Standardized metric display
- **Modals**: Consistent modal interfaces

## 🔧 State Management Strategy

### Server State (TanStack Query)
```typescript
// Query keys and functions
const queryKeys = {
  courses: ['courses'] as const,
  course: (id: string) => ['courses', id] as const,
  questions: ['questions'] as const,
  // ... other query keys
}

// Usage in components
const { data: courses, isLoading } = useQuery({
  queryKey: queryKeys.courses,
  queryFn: fetchCourses
})
```

### Client State (React useState)
```typescript
// Local component state
const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
const [isModalOpen, setIsModalOpen] = useState(false)
```

### Form State (React Hook Form)
```typescript
const form = useForm<CourseFormData>({
  resolver: zodResolver(courseSchema),
  defaultValues: {
    title: '',
    description: '',
    // ... other fields
  }
})
```

## 🎨 Design System Integration

### Color System
- **Semantic colors**: Primary, secondary, accent, success, warning, destructive
- **Neutral palette**: Background, foreground, muted, border
- **Dark mode support**: Automatic theme switching

### Typography
- **Font families**: 
  - Heading: Outfit
  - Body: Manrope
  - Monospace: Fira Code
- **Scale**: Consistent sizing using Tailwind classes

### Spacing & Layout
- **Grid system**: Responsive breakpoints
- **Spacing scale**: Consistent padding and margins
- **Component spacing**: Standardized gaps

### Elevation & Shadows
- **Material Design inspired**: Multi-level elevation system
- **Interactive states**: Hover, focus, active states
- **Visual hierarchy**: Depth through shadows

## 📊 Performance Considerations

### Code Splitting
```typescript
// Route-based code splitting
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AllCoursesPage = lazy(() => import('./pages/courses/AllCoursesPage'))
```

### Component Optimization
```typescript
// Memoization for expensive components
const ExpensiveComponent = memo(({ data }: Props) => {
  const computedValue = useMemo(() => expensiveCalculation(data), [data])
  return <div>{computedValue}</div>
})
```

### Query Optimization
```typescript
// Prefetching and caching
const prefetchCourseData = (courseId: string) => {
  queryClient.prefetchQuery({
    queryKey: queryKeys.course(courseId),
    queryFn: () => fetchCourse(courseId)
  })
}
```

## 🔐 Security Architecture

### Frontend Security
- **Input validation**: Zod schemas for all forms
- **XSS protection**: Sanitized user inputs
- **CSRF protection**: Token-based authentication
- **Content Security Policy**: Restricted script execution

### Data Protection
- **Sensitive data**: No storage of credentials in localStorage
- **API tokens**: Secure token management
- **Error handling**: No sensitive information in error messages

## 🧪 Testing Strategy

### Unit Testing
- **Component testing**: React Testing Library
- **Hook testing**: Custom hook testing utilities
- **Utility testing**: Jest for pure functions

### Integration Testing
- **Page testing**: Full page component testing
- **API integration**: Mock service worker (MSW)
- **User flows**: End-to-end critical paths

### Performance Testing
- **Bundle analysis**: Webpack Bundle Analyzer
- **Runtime performance**: React DevTools Profiler
- **Lighthouse audits**: Regular performance monitoring

## 🚀 Deployment Architecture

### Build Process
```bash
# Development
npm run dev          # Vite dev server

# Production
npm run build        # TypeScript compilation + Vite build
npm run preview      # Preview production build
```

### Environment Configuration
```typescript
// Environment variables
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  isDevelopment: import.meta.env.MODE === 'development',
  // ... other config
}
```

### Static Asset Optimization
- **Image optimization**: Responsive images with multiple formats
- **Bundle splitting**: Separate vendor and app bundles
- **Tree shaking**: Remove unused code

## 📈 Monitoring & Analytics

### Error Tracking
- **Error boundaries**: React error boundaries for graceful failure
- **Error logging**: Structured error reporting
- **Performance monitoring**: Real user monitoring (RUM)

### User Analytics
- **Usage tracking**: Anonymous user behavior analytics
- **Performance metrics**: Core Web Vitals monitoring
- **Feature adoption**: Track feature usage rates

## 🔄 Future Architecture Considerations

### Scalability
- **Micro-frontends**: Potential future architecture
- **Service workers**: Offline capability
- **Edge computing**: CDN and edge deployment

### Technology Evolution
- **React Server Components**: Future adoption consideration
- **WebAssembly**: Performance-critical computations
- **GraphQL**: Alternative to REST API
- **Progressive Web App**: Mobile app-like experience

---

*This architecture document evolves with the platform and should be updated as new technologies and patterns are adopted.* 