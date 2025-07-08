# API Reference

## Overview

This document outlines the API patterns and data structures used in the Zuvy Admin application. While the current implementation uses mock data, this reference provides the expected API structure for backend integration.

## Base API Configuration

### API Client Setup

```typescript
// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// API client with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## Common Data Types

### Base Response Format

```typescript
interface ApiResponse<T> {
  data: T;
  message: string;
  status: 'success' | 'error';
  timestamp: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
  status: 'success' | 'error';
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  status: 'error';
  timestamp: string;
}
```

### User Types

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'instructor' | 'student';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
```

## Course Management API

### Course Data Types

```typescript
interface Course {
  id: string;
  title: string;
  description: string;
  topic: string;
  duration: string;
  status: 'draft' | 'published' | 'archived';
  learnerCount: number;
  imageUrl?: string;
  instructorId: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseDetails extends Course {
  instructor: User;
  modules: Module[];
  students: Student[];
  analytics: CourseAnalytics;
}

interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  items: LearningItem[];
  isExpanded?: boolean;
}

interface LearningItem {
  id: string;
  moduleId: string;
  type: 'video' | 'article' | 'assignment' | 'quiz' | 'coding' | 'live-class' | 'feedback-form';
  title: string;
  description?: string;
  duration: string;
  order: number;
  content: any; // Type-specific content
}
```

### Course API Endpoints

#### Get All Courses
```typescript
GET /api/courses

Query Parameters:
- page?: number (default: 1)
- limit?: number (default: 10)
- search?: string
- status?: 'draft' | 'published' | 'archived'
- topic?: string

Response: PaginatedResponse<Course>
```

#### Get Course by ID
```typescript
GET /api/courses/:courseId

Response: ApiResponse<CourseDetails>
```

#### Create Course
```typescript
POST /api/courses

Body: {
  title: string;
  description: string;
  topic: string;
  duration: string;
  status?: 'draft' | 'published';
}

Response: ApiResponse<Course>
```

#### Update Course
```typescript
PUT /api/courses/:courseId

Body: Partial<{
  title: string;
  description: string;
  topic: string;
  duration: string;
  status: 'draft' | 'published' | 'archived';
}>

Response: ApiResponse<Course>
```

#### Delete Course
```typescript
DELETE /api/courses/:courseId

Response: ApiResponse<{ deleted: true }>
```

## Content Management API

### Content Types

```typescript
interface VideoContent {
  type: 'video';
  videoUrl: string;
  thumbnailUrl?: string;
  transcript?: string;
  captions?: string;
}

interface ArticleContent {
  type: 'article';
  content: string; // HTML content
  readingTime: number; // in minutes
  externalUrl?: string;
}

interface AssignmentContent {
  type: 'assignment';
  instructions: string;
  rubric: Rubric[];
  submissionType: 'file' | 'text' | 'url';
  dueDate?: string;
  maxAttempts?: number;
}

interface QuizContent {
  type: 'quiz';
  questions: QuizQuestion[];
  timeLimit?: number; // in seconds
  attempts?: number;
  passingScore?: number;
}

interface CodingContent {
  type: 'coding';
  problemDescription: string;
  starterCode?: string;
  testCases: TestCase[];
  language: string;
  timeLimit?: number;
  memoryLimit?: number;
}

interface LiveClassContent {
  type: 'live-class';
  scheduledAt: string;
  zoomMeetingId?: string;
  zoomMeetingUrl?: string;
  recordingUrl?: string;
  duration: number; // in minutes
}
```

### Content API Endpoints

#### Add Content to Module
```typescript
POST /api/courses/:courseId/modules/:moduleId/items

Body: {
  type: LearningItemType;
  title: string;
  description?: string;
  duration: string;
  content: VideoContent | ArticleContent | AssignmentContent | QuizContent | CodingContent | LiveClassContent;
}

Response: ApiResponse<LearningItem>
```

#### Update Content Item
```typescript
PUT /api/courses/:courseId/modules/:moduleId/items/:itemId

Body: Partial<LearningItem>

Response: ApiResponse<LearningItem>
```

#### Delete Content Item
```typescript
DELETE /api/courses/:courseId/modules/:moduleId/items/:itemId

Response: ApiResponse<{ deleted: true }>
```

## Question Bank API

### Question Types

```typescript
interface BaseQuestion {
  id: string;
  type: 'MCQ' | 'Coding' | 'Open Ended' | 'True/False' | 'Fill in the Blank';
  title: string;
  description?: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface MCQQuestion extends BaseQuestion {
  type: 'MCQ';
  options: string[];
  correctAnswers: string[];
  explanation?: string;
}

interface CodingQuestion extends BaseQuestion {
  type: 'Coding';
  problemDescription: string;
  testCases: TestCase[];
  language: string;
  starterCode?: string;
  solution?: string;
}

interface OpenEndedQuestion extends BaseQuestion {
  type: 'Open Ended';
  expectedAnswer?: string;
  rubric?: string[];
  wordLimit?: number;
}

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  timeLimit?: number;
  memoryLimit?: number;
}

type Question = MCQQuestion | CodingQuestion | OpenEndedQuestion;
```

### Question Bank API Endpoints

#### Get All Questions
```typescript
GET /api/questions

Query Parameters:
- page?: number
- limit?: number
- search?: string
- type?: 'MCQ' | 'Coding' | 'Open Ended'
- difficulty?: 'Easy' | 'Medium' | 'Hard'
- topic?: string

Response: PaginatedResponse<Question>
```

#### Get Question by ID
```typescript
GET /api/questions/:questionId

Response: ApiResponse<Question>
```

#### Create Question
```typescript
POST /api/questions

Body: Omit<Question, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>

Response: ApiResponse<Question>
```

#### Update Question
```typescript
PUT /api/questions/:questionId

Body: Partial<Omit<Question, 'id' | 'createdAt' | 'updatedAt'>>

Response: ApiResponse<Question>
```

#### Delete Question
```typescript
DELETE /api/questions/:questionId

Response: ApiResponse<{ deleted: true }>
```

#### Bulk Upload Questions
```typescript
POST /api/questions/bulk-upload

Body: FormData with file upload

Response: ApiResponse<{
  imported: number;
  failed: number;
  errors?: string[];
}>
```

#### AI Question Generation
```typescript
POST /api/questions/ai-generate

Body: {
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Coding' | 'Open Ended';
  count: number;
  additionalContext?: string;
}

Response: ApiResponse<Question[]>
```

## Assessment API

### Assessment Types

```typescript
interface Assessment {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  instructions?: string;
  questions: AssessmentQuestion[];
  settings: AssessmentSettings;
  createdAt: string;
  updatedAt: string;
}

interface AssessmentQuestion {
  questionId: string;
  order: number;
  points: number;
  question: Question; // Populated question data
}

interface AssessmentSettings {
  timeLimit?: number; // in seconds
  attempts?: number;
  passingScore?: number;
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
  showResults?: 'immediate' | 'after_submission' | 'manual';
  allowReview?: boolean;
  startDate?: string;
  endDate?: string;
}

interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  answers: SubmissionAnswer[];
  score?: number;
  startedAt: string;
  submittedAt?: string;
  timeSpent?: number; // in seconds
  status: 'in_progress' | 'submitted' | 'graded';
}

interface SubmissionAnswer {
  questionId: string;
  answer: any; // Type depends on question type
  isCorrect?: boolean;
  points?: number;
  feedback?: string;
}
```

### Assessment API Endpoints

#### Create Assessment
```typescript
POST /api/courses/:courseId/assessments

Body: {
  title: string;
  description?: string;
  instructions?: string;
  questionIds: string[];
  settings: AssessmentSettings;
}

Response: ApiResponse<Assessment>
```

#### Get Assessment
```typescript
GET /api/assessments/:assessmentId

Response: ApiResponse<Assessment>
```

#### Submit Assessment
```typescript
POST /api/assessments/:assessmentId/submit

Body: {
  answers: {
    questionId: string;
    answer: any;
  }[];
}

Response: ApiResponse<AssessmentSubmission>
```

#### Get Assessment Results
```typescript
GET /api/assessments/:assessmentId/results

Query Parameters:
- studentId?: string (for individual results)

Response: ApiResponse<AssessmentSubmission[]>
```

## Analytics API

### Analytics Types

```typescript
interface DashboardMetrics {
  totalStudents: number;
  totalCourses: number;
  avgCompletionRate: number;
  questionsInBank: number;
  trends: {
    students: TrendData;
    courses: TrendData;
    completionRate: TrendData;
    questions: TrendData;
  };
}

interface TrendData {
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface CourseAnalytics {
  courseId: string;
  enrollments: number;
  completions: number;
  completionRate: number;
  averageScore: number;
  timeSpent: number; // average time in minutes
  engagementRate: number;
  dropoffPoints: DropoffPoint[];
}

interface DropoffPoint {
  itemId: string;
  itemTitle: string;
  dropoffRate: number;
  totalViews: number;
  completions: number;
}

interface StudentProgress {
  studentId: string;
  courseId: string;
  overallProgress: number; // percentage
  completedItems: number;
  totalItems: number;
  currentItem?: string;
  timeSpent: number; // in minutes
  lastActivity: string;
  assessmentScores: {
    assessmentId: string;
    score: number;
    maxScore: number;
    completedAt: string;
  }[];
}
```

### Analytics API Endpoints

#### Get Dashboard Metrics
```typescript
GET /api/analytics/dashboard

Query Parameters:
- dateRange?: 'week' | 'month' | 'quarter' | 'year'

Response: ApiResponse<DashboardMetrics>
```

#### Get Course Analytics
```typescript
GET /api/analytics/courses/:courseId

Query Parameters:
- dateRange?: 'week' | 'month' | 'quarter' | 'year'

Response: ApiResponse<CourseAnalytics>
```

#### Get Student Progress
```typescript
GET /api/analytics/students/:studentId/progress

Query Parameters:
- courseId?: string (for specific course progress)

Response: ApiResponse<StudentProgress[]>
```

## Student Management API

### Student Types

```typescript
interface Student extends User {
  role: 'student';
  enrollments: Enrollment[];
  profile: StudentProfile;
}

interface StudentProfile {
  dateOfBirth?: string;
  phone?: string;
  address?: string;
  skills?: string[];
  bio?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped' | 'suspended';
  progress: number; // percentage
  lastAccessed?: string;
}
```

### Student API Endpoints

#### Get Course Students
```typescript
GET /api/courses/:courseId/students

Query Parameters:
- page?: number
- limit?: number
- status?: 'active' | 'completed' | 'dropped' | 'suspended'
- search?: string

Response: PaginatedResponse<Student>
```

#### Enroll Student
```typescript
POST /api/courses/:courseId/students

Body: {
  studentIds: string[];
}

Response: ApiResponse<Enrollment[]>
```

#### Update Student Enrollment
```typescript
PUT /api/courses/:courseId/students/:studentId

Body: {
  status: 'active' | 'completed' | 'dropped' | 'suspended';
}

Response: ApiResponse<Enrollment>
```

## File Upload API

### Upload Types

```typescript
interface FileUpload {
  file: File;
  type: 'image' | 'video' | 'document' | 'audio';
  folder?: string;
}

interface UploadResponse {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}
```

### Upload Endpoints

#### Upload File
```typescript
POST /api/upload

Body: FormData with file

Response: ApiResponse<UploadResponse>
```

#### Upload Multiple Files
```typescript
POST /api/upload/batch

Body: FormData with multiple files

Response: ApiResponse<UploadResponse[]>
```

#### Delete File
```typescript
DELETE /api/upload/:fileId

Response: ApiResponse<{ deleted: true }>
```

## Real-time Features (WebSocket)

### WebSocket Events

```typescript
// Connection
const socket = new WebSocket(`${WS_BASE_URL}/api/ws`);

// Event types
interface WSMessage {
  type: string;
  payload: any;
  timestamp: string;
}

// Student progress update
interface ProgressUpdateEvent extends WSMessage {
  type: 'progress_update';
  payload: {
    studentId: string;
    courseId: string;
    itemId: string;
    progress: number;
  };
}

// New enrollment
interface EnrollmentEvent extends WSMessage {
  type: 'new_enrollment';
  payload: {
    studentId: string;
    courseId: string;
    studentName: string;
    courseName: string;
  };
}

// Assessment submission
interface SubmissionEvent extends WSMessage {
  type: 'assessment_submission';
  payload: {
    submissionId: string;
    assessmentId: string;
    studentId: string;
    score: number;
  };
}
```

## Error Handling

### Error Codes

```typescript
enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

interface ApiError {
  code: ApiErrorCode;
  message: string;
  field?: string; // For validation errors
  details?: any;
}
```

### Error Response Examples

```typescript
// Validation Error (400)
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "title": "Title is required",
      "email": "Invalid email format"
    }
  },
  "status": "error",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Not Found Error (404)
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Course not found"
  },
  "status": "error",
  "timestamp": "2024-01-15T10:30:00Z"
}

// Rate Limit Error (429)
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retryAfter": 60
    }
  },
  "status": "error",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## API Usage Examples

### TanStack Query Integration

```typescript
// Query hook example
const useCourses = (filters?: CourseFilters) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => apiClient.get('/api/courses', { params: filters }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hook example
const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (courseData: CreateCourseParams) => 
      apiClient.post('/api/courses', courseData),
    onSuccess: () => {
      queryClient.invalidateQueries(['courses']);
    },
  });
};

// Usage in component
const CoursePage = () => {
  const { data: courses, isLoading } = useCourses();
  const createCourseMutation = useCreateCourse();
  
  const handleCreateCourse = (data: CreateCourseParams) => {
    createCourseMutation.mutate(data);
  };
  
  // Component render logic
};
```

This API reference provides the expected structure for backend integration with the Zuvy Admin application. All endpoints should be implemented with proper authentication, validation, and error handling. 