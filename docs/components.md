# Components Documentation

## 🧩 Component Library Overview

The Zuvy Admin component library is built on top of shadcn/ui and Radix UI primitives, providing a comprehensive set of accessible, customizable, and performant React components. All components follow consistent design patterns and accessibility standards.

### Component Categories

1. **[Base UI Components](#base-ui-components)** - Fundamental building blocks (shadcn/ui)
2. **[Layout Components](#layout-components)** - Page structure and navigation
3. **[Course Management](#course-management-components)** - Course creation and management
4. **[Assessment & Questions](#assessment--question-components)** - Testing and evaluation tools
5. **[Content Bank](#content-bank-components)** - Content management and organization
6. **[Shared Components](#shared-components)** - Reusable utility components

## 🎯 Base UI Components

### Button
Versatile button component with multiple variants and states.

#### Usage
```tsx
import { Button } from '@/components/ui/button'

// Primary button
<Button className="bg-primary hover:bg-primary-dark">
  Primary Action
</Button>

// Secondary button
<Button variant="outline">
  Secondary Action
</Button>

// Destructive button
<Button variant="destructive">
  Delete Item
</Button>

// Ghost button
<Button variant="ghost">
  Cancel
</Button>

// Button with icon
<Button>
  <Plus className="h-4 w-4 mr-2" />
  Add Item
</Button>
```

#### Props
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  asChild?: boolean
  className?: string
  children: React.ReactNode
}
```

### Input
Text input component with validation states and accessibility features.

#### Usage
```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Basic input
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
    className="focus:ring-primary focus:border-primary"
  />
</div>

// Input with error state
<Input 
  placeholder="Enter text"
  className="border-destructive focus:ring-destructive"
  aria-describedby="error-message"
/>
```

### Card
Container component for organizing content with consistent styling.

#### Usage
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Basic card
<Card className="shadow-4dp">
  <CardHeader>
    <CardTitle className="font-heading text-xl">Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>

// Interactive card
<Card className="cursor-pointer hover:shadow-hover transition-shadow">
  <CardHeader>
    <CardTitle>Interactive Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Click to interact</p>
  </CardContent>
</Card>
```

### Dialog
Modal dialog component for overlays and focused interactions.

#### Usage
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <div className="py-4">
      <p>Dialog content</p>
    </div>
  </DialogContent>
</Dialog>
```

### Select
Dropdown selection component with search and filtering capabilities.

#### Usage
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Tabs
Tab navigation component for organizing related content.

#### Usage
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="grid w-full grid-cols-3">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Content for tab 1</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Content for tab 2</p>
  </TabsContent>
  <TabsContent value="tab3">
    <p>Content for tab 3</p>
  </TabsContent>
</Tabs>
```

### Badge
Small status indicator component with semantic colors.

#### Usage
```tsx
import { Badge } from '@/components/ui/badge'

// Status badges
<Badge className="bg-success-light text-success-dark border-success">
  Published
</Badge>

<Badge className="bg-warning-light text-warning-dark border-warning">
  Draft
</Badge>

<Badge className="bg-destructive-light text-destructive-dark border-destructive">
  Error
</Badge>

// Difficulty badges
<Badge variant="outline">Easy</Badge>
<Badge variant="secondary">Medium</Badge>
<Badge variant="destructive">Hard</Badge>
```

## 🏗️ Layout Components

### MainLayout
Primary application layout with navigation and content area.

#### Usage
```tsx
// src/components/layout/MainLayout.tsx
import { MainLayout } from '@/components/layout/MainLayout'

<MainLayout>
  {children}
</MainLayout>
```

#### Features
- **Responsive Navigation**: Adapts to different screen sizes
- **Active State Management**: Automatic highlighting of current page
- **Brand Integration**: Zuvy logo and branding elements
- **Accessibility**: Keyboard navigation and screen reader support

#### Navigation Items
```typescript
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    active: location.pathname === '/'
  },
  {
    name: 'Course Studio',
    href: '/courses',
    icon: Layers,
    active: location.pathname.startsWith('/courses')
  },
  {
    name: 'Content Bank',
    href: '/content-bank',
    icon: Database,
    active: location.pathname.startsWith('/content-bank')
  }
]
```

## 🎓 Course Management Components

### CourseCard
Displays course information in a card format with actions.

#### Usage
```tsx
import { CourseCard } from '@/components/courses/CourseCard'

<CourseCard
  id="course-1"
  title="Full Stack Web Development"
  description="Learn modern web development with React, Node.js, and MongoDB"
  learnerCount={124}
  duration="12 weeks"
  topic="Web Development"
  status="published"
  imageUrl="https://example.com/image.jpg"
  onClick={() => navigateToCoue(id)}
/>
```

#### Props
```typescript
interface CourseCardProps {
  id: string
  title: string
  description: string
  learnerCount: number
  duration: string
  topic: string
  status: 'published' | 'draft' | 'archived'
  imageUrl?: string
  onClick: () => void
}
```

### CourseViewTabs
Tabbed interface for managing different aspects of a course.

#### Usage
```tsx
import { CourseViewTabs } from '@/components/courses/CourseViewTabs'

<CourseViewTabs courseId="course-1" />
```

#### Tab Structure
- **General Details**: Basic course information and settings
- **Curriculum**: Course content structure and organization
- **Students & Performance**: Student enrollment and analytics
- **Settings**: Advanced course configuration

### AddItemMenu
Modal component for adding different types of content to courses.

#### Usage
```tsx
import { AddItemMenu } from '@/components/courses/AddItemMenu'

<AddItemMenu
  isOpen={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
  courseId="course-1"
/>
```

#### Content Types Supported
1. **Live Classes** - Zoom integrated live sessions
2. **Video Content** - Video lectures and tutorials
3. **Articles** - Text-based learning materials
4. **Assignments** - Project-based learning tasks
5. **Quizzes** - Quick knowledge assessments
6. **Coding Exercises** - Programming challenges
7. **Feedback Forms** - Student opinion collection
8. **Assessments** - Comprehensive testing

### Content Creators

#### VideoCreator
Component for creating and configuring video content.

```tsx
import { VideoCreator } from '@/components/courses/VideoCreator'

<VideoCreator onSave={handleSave} />
```

**Features:**
- Video file upload with validation
- Thumbnail selection and customization
- Chapter markers and timestamps
- Subtitle and transcript support
- Access control and viewing restrictions

#### ArticleCreator
Rich text editor for creating article content.

```tsx
import { ArticleCreator } from '@/components/courses/ArticleCreator'

<ArticleCreator onSave={handleSave} />
```

**Features:**
- Markdown support for formatting
- External URL linking
- Reading time calculation
- Topic categorization
- Content preview

#### AssignmentCreator
Comprehensive assignment creation interface.

```tsx
import { AssignmentCreator } from '@/components/courses/AssignmentCreator'

<AssignmentCreator onSave={handleSave} />
```

**Features:**
- Detailed instructions editor
- File upload requirements
- Due date management
- Rubric integration
- Submission tracking

#### LiveClassCreator
Zoom integration for scheduling live classes.

```tsx
import { LiveClassCreator } from '@/components/courses/LiveClassCreator'

<LiveClassCreator onSave={handleSave} />
```

**Features:**
- Zoom meeting scheduling
- Recurring session setup
- Attendance tracking
- Recording management
- Calendar integration

## 🧪 Assessment & Question Components

### AssessmentBuilderModal
Comprehensive assessment creation interface.

#### Usage
```tsx
import { AssessmentBuilderModal } from '@/components/courses/assessment-builder/AssessmentBuilderModal'

<AssessmentBuilderModal
  isOpen={isOpen}
  onClose={handleClose}
  courseId="course-1"
/>
```

#### Features
- **Question Selection**: Browse and select from content bank
- **Question Creation**: Create new questions inline
- **Assessment Configuration**: Time limits, scoring, randomization
- **Preview Mode**: Real-time assessment preview

#### Question Types Supported

##### MCQCreator
Multiple choice question creation interface.

```tsx
import { MCQCreator } from '@/components/courses/MCQCreator'

<MCQCreator onSave={handleSave} />
```

**Features:**
- Multiple correct answers support
- Option randomization
- Explanation text for each option
- Difficulty and topic assignment
- Point allocation

##### CodingProblemCreator
Programming challenge creation interface.

```tsx
import { CodingProblemCreator } from '@/components/courses/CodingProblemCreator'

<CodingProblemCreator onSave={handleSave} />
```

**Features:**
- Problem description editor
- Test case management (visible/hidden)
- Language-specific templates
- Difficulty classification
- Auto-grading configuration

##### OpenEndedCreator
Long-form answer question interface.

```tsx
// Usage within assessment builder
<CreateQuestionTab
  onCreateMCQ={() => setCurrentView('create-mcq')}
  onCreateCoding={() => setCurrentView('create-coding')}
  onCreateOpenEnded={() => setCurrentView('create-open-ended')}
/>
```

**Features:**
- Essay question formatting
- Word limit configuration
- Rubric integration
- Sample answer provision
- Manual grading workflow

### QuestionCreators

#### MCQCreator
Focused MCQ creation component.

```tsx
import { MCQCreator } from '@/components/courses/MCQCreator'

<MCQCreator onSave={handleSave} />
```

#### CodingProblemCreator
Standalone coding problem creator.

```tsx
import { CodingProblemCreator } from '@/components/courses/CodingProblemCreator'

<CodingProblemCreator onSave={handleSave} />
```

## 🗃️ Content Bank Components

### QuestionBankPage
Main interface for managing the question repository.

#### Usage
```tsx
// Accessed via route: /content-bank
import { QuestionBankPage } from '@/pages/content-bank/QuestionBankPage'
```

#### Features
- **Question Management**: CRUD operations for all questions
- **Advanced Search**: Filter by type, difficulty, topic, usage
- **Bulk Operations**: Import/export, bulk editing
- **Analytics**: Usage statistics and performance metrics

### BulkUploadModal
Interface for importing multiple questions at once.

```tsx
import { BulkUploadModal } from '@/components/content-bank/BulkUploadModal'

<BulkUploadModal
  isOpen={isOpen}
  onClose={handleClose}
/>
```

**Supported Formats:**
- CSV files with predefined structure
- Excel spreadsheets
- JSON format for API integration
- Template downloads for proper formatting

### AIGenerationModal
AI-powered question generation interface.

```tsx
import { AIGenerationModal } from '@/components/content-bank/AIGenerationModal'

<AIGenerationModal
  isOpen={isOpen}
  onClose={handleClose}
/>
```

**Features:**
- Topic-based generation
- Difficulty level specification
- Question type selection
- Bulk generation capabilities
- Quality review and editing

## 🔄 Shared Components

### DataTable
Reusable table component with advanced features.

#### Usage
```tsx
import { DataTable } from '@/components/shared/DataTable'

<DataTable
  data={questions}
  columns={questionColumns}
  searchable
  filterable
  itemsPerPage={15}
  className="shadow-4dp"
/>
```

#### Features
- **Sorting**: Click column headers to sort
- **Filtering**: Advanced filter options
- **Search**: Global search across all columns
- **Pagination**: Configurable page sizes
- **Selection**: Row selection for bulk operations

#### Column Configuration
```typescript
const columns = [
  { key: 'title', label: 'Question', sortable: true },
  { key: 'type', label: 'Type', filterable: true },
  { key: 'difficulty', label: 'Difficulty', filterable: true },
  { key: 'topic', label: 'Topic', filterable: true },
  { key: 'usage', label: 'Usage Count', sortable: true }
]
```

### PerformanceWidget
Standardized metric display component.

#### Usage
```tsx
import { PerformanceWidget } from '@/components/shared/PerformanceWidget'

<PerformanceWidget
  title="Total Students"
  value="1,247"
  change="+12%"
  trend="up"
  type="number"
/>

<PerformanceWidget
  title="Completion Rate"
  value="84%"
  change="+3%"
  trend="up"
  type="progress"
/>
```

#### Props
```typescript
interface PerformanceWidgetProps {
  title: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  type: 'number' | 'progress' | 'currency'
  className?: string
}
```

## 🎨 Common Patterns

### Modal Components
Consistent modal pattern for all dialog interfaces.

#### Structure
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle className="font-heading text-xl">Modal Title</DialogTitle>
    </DialogHeader>
    
    {/* Modal Content */}
    <div className="py-4">
      {content}
    </div>
    
    {/* Modal Actions */}
    <div className="flex justify-end gap-2 pt-4 border-t">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>
        Save
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

### Form Components
Standardized form patterns with validation.

#### Form Structure
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle>Form Section</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="field">Field Label *</Label>
          <Input
            id="field"
            placeholder="Enter value"
            value={value}
            onChange={onChange}
            className={errors.field ? "border-destructive" : ""}
          />
          {errors.field && (
            <p className="text-sm text-destructive">{errors.field}</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
  
  <div className="flex justify-end gap-2">
    <Button type="button" variant="outline" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit">
      Save
    </Button>
  </div>
</form>
```

### Creator Components
Consistent pattern for content creation interfaces.

#### Creator Pattern
```tsx
interface CreatorProps {
  onSave: () => void
  initialData?: T
  readonly?: boolean
}

const ContentCreator = ({ onSave, initialData, readonly }: CreatorProps) => {
  const [data, setData] = useState(initialData || defaultValues)
  const [errors, setErrors] = useState({})

  const handleSave = () => {
    // Validation logic
    if (isValid(data)) {
      onSave()
    }
  }

  return (
    <div className="space-y-6">
      {/* Form sections */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form fields */}
        </CardContent>
      </Card>
      
      {/* Action buttons */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Create Content
        </Button>
      </div>
    </div>
  )
}
```

## 🎯 Styling Conventions

### CSS Class Patterns

#### Component Classes
```css
/* Component wrapper */
.component-name {
  /* Base styles */
}

/* Component variants */
.component-name--variant {
  /* Variant-specific styles */
}

/* Component states */
.component-name.is-active {
  /* Active state styles */
}
```

#### Utility Classes
```css
/* Spacing utilities */
.space-y-6 > * + * { margin-top: 1.5rem; }
.space-x-4 > * + * { margin-left: 1rem; }

/* Shadow utilities */
.shadow-4dp { box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16); }
.shadow-hover { box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18); }

/* Color utilities */
.text-primary { color: hsl(var(--primary)); }
.bg-card { background-color: hsl(var(--card)); }
```

### Component Variants

#### Using CVA (Class Variance Authority)
```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
```

## ♿ Accessibility Features

### ARIA Support
All components include proper ARIA attributes:

```tsx
// Button with ARIA label
<Button aria-label="Delete item" aria-describedby="delete-description">
  <Trash2 className="h-4 w-4" />
</Button>

// Input with ARIA attributes
<Input
  id="email"
  type="email"
  aria-describedby={errors.email ? "email-error" : "email-help"}
  aria-invalid={!!errors.email}
/>
```

### Keyboard Navigation
Components support full keyboard navigation:

- **Tab Order**: Logical tab sequence
- **Enter/Space**: Activation for buttons and interactive elements
- **Arrow Keys**: Navigation within composite components
- **Escape**: Close modals and dropdowns

### Screen Reader Support
Components provide screen reader compatible content:

```tsx
// Visually hidden text for screen readers
<span className="sr-only">Loading...</span>

// Descriptive labels
<Label htmlFor="search">Search questions</Label>
<Input
  id="search"
  placeholder="Type to search..."
  aria-describedby="search-help"
/>
<div id="search-help" className="sr-only">
  Search through all questions by title, content, or topic
</div>
```

## 🚀 Performance Considerations

### Code Splitting
Components are optimized for code splitting:

```tsx
// Lazy loading of heavy components
const AssessmentBuilder = lazy(() => import('./assessment-builder/AssessmentBuilderModal'))
const CodeEditor = lazy(() => import('./coding-creator/CodeEditor'))
```

### Memoization
Performance-critical components use React.memo:

```tsx
const ExpensiveComponent = memo(({ data }: Props) => {
  const processedData = useMemo(() => 
    expensiveCalculation(data), [data]
  )
  
  return <div>{processedData}</div>
})
```

### Bundle Optimization
- **Tree Shaking**: Only imported components are included
- **Icon Optimization**: Icons are tree-shakeable from Lucide React
- **CSS Purging**: Unused styles are removed in production

---

*This component documentation is continuously updated as new components are added and existing ones are enhanced. Each component is designed with accessibility, performance, and developer experience in mind.* 