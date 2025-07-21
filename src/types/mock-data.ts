import { 
  Course, Module, Project, Article, Video, Quiz, Assignment, 
  CodingProblem, LiveClass, FeedbackForm, Assessment,
  Question, TestCase, Student, Batch, 
  AssignmentSubmission, QuizSubmission, CodingSubmission,
  AssessmentSubmission, ProjectSubmission, FeedbackSubmission,
  ReAttemptRequest, FeedbackQuestion
} from './index';

// Mock course data
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    thumbnail: 'https://example.com/course1-thumb.jpg',
    category: ['Development', 'Web'],
    tags: ['beginner', 'html', 'css', 'javascript'],
    startDate: '2024-01-15T00:00:00Z',
    duration: 8, // 8 weeks
    language: 'English',
    createdAt: '2023-12-01T10:30:00Z',
    updatedAt: '2023-12-10T15:45:00Z',
    modules: [], // Will be populated
    projects: [], // Will be populated
    type: 'Public',
    moduleLock: true
  },
  {
    id: 'course-2',
    title: 'Advanced React Development',
    description: 'Master React.js with advanced concepts like Hooks, Context API, and Redux.',
    thumbnail: 'https://example.com/course2-thumb.jpg',
    category: ['Development', 'React'],
    tags: ['advanced', 'react', 'hooks', 'redux'],
    startDate: '2024-02-01T00:00:00Z',
    duration: 10, // 10 weeks
    language: 'English',
    createdAt: '2023-12-15T09:20:00Z',
    updatedAt: '2023-12-20T14:35:00Z',
    modules: [], // Will be populated
    projects: [], // Will be populated
    type: 'Private',
    moduleLock: false
  }
];

// Mock module data
export const mockModules: Module[] = [
  {
    id: 'module-1',
    title: 'HTML Fundamentals',
    description: 'Learn the basics of HTML structure and elements.',
    courseId: 'course-1',
    position: 1,
    duration: '2 weeks',
    items: [] // Will be populated
  },
  {
    id: 'module-2',
    title: 'CSS Styling',
    description: 'Master the art of styling web pages with CSS.',
    courseId: 'course-1',
    position: 2,
    duration: '2 weeks',
    items: [] // Will be populated
  },
  {
    id: 'module-3',
    title: 'JavaScript Basics',
    description: 'Introduction to JavaScript programming.',
    courseId: 'course-1',
    position: 3,
    duration: '3 weeks',
    items: [] // Will be populated
  },
  {
    id: 'module-4',
    title: 'React Fundamentals',
    description: 'Introduction to React library and components.',
    courseId: 'course-2',
    position: 1,
    duration: '3 weeks',
    items: [] // Will be populated
  }
];

// Mock project data
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Personal Portfolio Website',
    description: 'Build a personal portfolio website showcasing your skills and projects.',
    courseId: 'course-1',
    position: 4,
    instructions: 'Create a responsive personal portfolio with HTML, CSS, and JavaScript.',
    allowedSubmissionTypes: ['file', 'url'],
    dueDate: '2024-03-01T23:59:59Z'
  },
  {
    id: 'project-2',
    title: 'E-commerce Dashboard',
    description: 'Create a React dashboard for an e-commerce platform.',
    courseId: 'course-2',
    position: 5,
    instructions: 'Develop a React dashboard with user authentication, product management, and analytics.',
    allowedSubmissionTypes: ['file', 'url', 'text'],
    dueDate: '2024-04-15T23:59:59Z'
  }
];

// Mock learning items
// Article
export const mockArticles: Article[] = [
  {
    id: 'article-1',
    title: 'HTML Document Structure',
    type: 'article',
    moduleId: 'module-1',
    position: 1,
    createdAt: '2023-12-05T10:00:00Z',
    updatedAt: '2023-12-05T10:00:00Z',
    content: '# HTML Document Structure\n\nIn this article, we will learn about the basic structure of an HTML document...',
    estimatedReadTime: 15
  },
  {
    id: 'article-2',
    title: 'CSS Box Model',
    type: 'article',
    moduleId: 'module-2',
    position: 1,
    createdAt: '2023-12-10T11:30:00Z',
    updatedAt: '2023-12-10T11:30:00Z',
    content: '# CSS Box Model\n\nThe CSS Box Model is fundamental to understanding layout in web design...',
    estimatedReadTime: 20
  }
];

// Video
export const mockVideos: Video[] = [
  {
    id: 'video-1',
    title: 'HTML Forms Tutorial',
    type: 'video',
    moduleId: 'module-1',
    position: 2,
    createdAt: '2023-12-06T14:20:00Z',
    updatedAt: '2023-12-06T14:20:00Z',
    description: 'Learn how to create and style HTML forms for user input.',
    videoUrl: 'https://example.com/videos/html-forms.mp4',
    videoDuration: 1800, // 30 minutes
    transcript: 'In this video, we will explore how to create HTML forms...'
  },
  {
    id: 'video-2',
    title: 'CSS Flexbox Layout',
    type: 'video',
    moduleId: 'module-2',
    position: 2,
    createdAt: '2023-12-11T15:45:00Z',
    updatedAt: '2023-12-11T15:45:00Z',
    description: 'Master the flexible box layout model in CSS.',
    videoUrl: 'https://example.com/videos/css-flexbox.mp4',
    videoDuration: 2400, // 40 minutes
    transcript: 'Flexbox is a powerful CSS layout model that makes designing flexible layouts much easier...'
  }
];

// Mock questions for quizzes and assessments
export const mockQuestions: Question[] = [
  {
    id: 'question-1',
    type: 'MCQ',
    title: 'Which HTML tag is used to define a hyperlink?',
    difficulty: 'Easy',
    topic: 'HTML',
    points: 5,
    options: ['<a>', '<link>', '<href>', '<url>'],
    correctAnswers: ['<a>'],
    createdAt: '2023-12-01T09:00:00Z',
    updatedAt: '2023-12-01T09:00:00Z'
  },
  {
    id: 'question-2',
    type: 'MCQ',
    title: 'Which CSS property controls text size?',
    difficulty: 'Easy',
    topic: 'CSS',
    points: 5,
    options: ['text-size', 'font-size', 'text-style', 'font-style'],
    correctAnswers: ['font-size'],
    createdAt: '2023-12-01T09:05:00Z',
    updatedAt: '2023-12-01T09:05:00Z'
  },
  {
    id: 'question-3',
    type: 'Coding',
    title: 'Write a JavaScript function to calculate the sum of an array',
    difficulty: 'Medium',
    topic: 'JavaScript',
    points: 10,
    description: 'Write a function that takes an array of numbers and returns the sum of all numbers.',
    testCases: [
      {
        id: 'tc-1',
        input: '[1, 2, 3, 4, 5]',
        expectedOutput: '15',
        isHidden: false
      },
      {
        id: 'tc-2',
        input: '[-1, 1, 0, 2]',
        expectedOutput: '2',
        isHidden: false
      }
    ],
    createdAt: '2023-12-01T09:10:00Z',
    updatedAt: '2023-12-01T09:10:00Z'
  },
  {
    id: 'question-4',
    type: 'Open Ended',
    title: 'Explain the concept of CSS specificity',
    difficulty: 'Hard',
    topic: 'CSS',
    points: 15,
    expectedAnswer: 'CSS specificity is the algorithm used by browsers to determine which CSS property values are most relevant to an element and therefore will be applied...',
    createdAt: '2023-12-01T09:15:00Z',
    updatedAt: '2023-12-01T09:15:00Z'
  }
];

// Quiz
export const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'HTML Basics Quiz',
    type: 'quiz',
    moduleId: 'module-1',
    position: 3,
    createdAt: '2023-12-07T10:00:00Z',
    updatedAt: '2023-12-07T10:00:00Z',
    description: 'Test your knowledge of HTML fundamentals',
    questions: [mockQuestions[0], mockQuestions[1]],
    timeLimit: 15,
    randomizeQuestions: true
  }
];

// Assignment
export const mockAssignments: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'CSS Layout Challenge',
    type: 'assignment',
    moduleId: 'module-2',
    position: 3,
    createdAt: '2023-12-12T11:00:00Z',
    updatedAt: '2023-12-12T11:00:00Z',
    instructions: 'Create a responsive layout using CSS Grid and Flexbox following the provided design.',
    allowedSubmissionTypes: ['file', 'text'],
    dueDate: '2024-02-15T23:59:59Z'
  }
];

// Coding Problem
export const mockCodingProblems: CodingProblem[] = [
  {
    id: 'coding-1',
    title: 'JavaScript Array Manipulation',
    type: 'coding',
    moduleId: 'module-3',
    position: 1,
    createdAt: '2023-12-15T14:30:00Z',
    updatedAt: '2023-12-15T14:30:00Z',
    description: 'Practice your JavaScript array manipulation skills',
    problemStatement: 'Write a function that filters out all duplicate values from an array and returns a new array with unique values.',
    testCases: [
      {
        id: 'tc-1',
        input: '[1, 2, 2, 3, 4, 4, 5]',
        expectedOutput: '[1, 2, 3, 4, 5]',
        isHidden: false
      },
      {
        id: 'tc-2',
        input: '["a", "b", "a", "c", "c"]',
        expectedOutput: '["a", "b", "c"]',
        isHidden: false
      }
    ],
    allowedLanguages: ['JavaScript', 'TypeScript'],
    starterCode: 'function removeDuplicates(arr) {\n  // Your code here\n}'
  }
];

// Live Class
export const mockLiveClasses: LiveClass[] = [
  {
    id: 'live-class-1',
    title: 'Introduction to JavaScript Event Handling',
    type: 'live-class',
    moduleId: 'module-3',
    position: 2,
    createdAt: '2023-12-16T09:00:00Z',
    updatedAt: '2023-12-16T09:00:00Z',
    description: 'Learn how to handle user events in JavaScript applications',
    startDate: '2024-02-20T00:00:00Z',
    startTime: '18:00',
    endTime: '19:30',
    meetingLink: 'https://zoom.us/j/1234567890'
  }
];

// Feedback Form Questions
export const mockFeedbackQuestions: FeedbackQuestion[] = [
  {
    id: 'fb-q-1',
    type: 'rating',
    question: 'How would you rate the course content?',
    required: true
  },
  {
    id: 'fb-q-2',
    type: 'longText',
    question: 'What aspects of the course did you find most valuable?',
    required: false
  },
  {
    id: 'fb-q-3',
    type: 'multipleChoice',
    question: 'Which topics would you like to explore further?',
    required: true,
    options: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Accessibility']
  }
];

// Feedback Form
export const mockFeedbackForms: FeedbackForm[] = [
  {
    id: 'feedback-1',
    title: 'Module Feedback',
    type: 'feedback',
    moduleId: 'module-1',
    position: 4,
    createdAt: '2023-12-08T16:45:00Z',
    updatedAt: '2023-12-08T16:45:00Z',
    questions: mockFeedbackQuestions
  }
];

// Assessment
export const mockAssessments: Assessment[] = [
  {
    id: 'assessment-1',
    title: 'Web Development Fundamentals Assessment',
    type: 'assessment',
    moduleId: 'module-3',
    position: 3,
    createdAt: '2023-12-17T11:20:00Z',
    updatedAt: '2023-12-17T11:20:00Z',
    description: 'Final assessment covering HTML, CSS, and JavaScript fundamentals',
    questions: mockQuestions,
    startDate: '2024-03-01T00:00:00Z',
    settings: {
      questionDistribution: {
        mcq: { easy: 5, medium: 3, hard: 2 },
        coding: { easy: 1, medium: 2, hard: 1 },
        openEnded: { easy: 0, medium: 1, hard: 1 }
      },
      sectionWeightage: {
        mcq: 40,
        coding: 40,
        openEnded: 20
      },
      timeLimit: 120, // 2 hours
      passingScore: 70, // 70%
      proctoring: {
        disableCopyPaste: true,
        trackTabChange: true
      }
    }
  }
];

// Connect modules to their learning items
mockModules[0].items = [...mockArticles.filter(a => a.moduleId === 'module-1'), 
                       ...mockVideos.filter(v => v.moduleId === 'module-1'),
                       ...mockQuizzes.filter(q => q.moduleId === 'module-1'),
                       ...mockFeedbackForms.filter(f => f.moduleId === 'module-1')];

mockModules[1].items = [...mockArticles.filter(a => a.moduleId === 'module-2'), 
                       ...mockVideos.filter(v => v.moduleId === 'module-2'),
                       ...mockAssignments.filter(a => a.moduleId === 'module-2')];

mockModules[2].items = [...mockCodingProblems.filter(c => c.moduleId === 'module-3'),
                       ...mockLiveClasses.filter(l => l.moduleId === 'module-3'),
                       ...mockAssessments.filter(a => a.moduleId === 'module-3')];

// Connect courses to their modules and projects
mockCourses[0].modules = mockModules.filter(m => m.courseId === 'course-1');
mockCourses[0].projects = mockProjects.filter(p => p.courseId === 'course-1');
mockCourses[1].modules = mockModules.filter(m => m.courseId === 'course-2');
mockCourses[1].projects = mockProjects.filter(p => p.courseId === 'course-2');

// Mock Students and Batches
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    batchId: 'batch-1',
    dateAdded: '2024-01-10T09:00:00Z',
    status: 'active'
  },
  {
    id: 'student-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    batchId: 'batch-1',
    dateAdded: '2024-01-10T09:05:00Z',
    status: 'active'
  },
  {
    id: 'student-3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    batchId: 'batch-1',
    dateAdded: '2024-01-10T09:10:00Z',
    status: 'dropout'
  },
  {
    id: 'student-4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    batchId: 'batch-2',
    dateAdded: '2024-02-05T10:00:00Z',
    status: 'active'
  }
];

export const mockBatches: Batch[] = [
  {
    id: 'batch-1',
    name: 'Web Dev Cohort 2024-A',
    courseId: 'course-1',
    status: 'ongoing',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-03-15T00:00:00Z'
  },
  {
    id: 'batch-2',
    name: 'React Masters Cohort 2024-A',
    courseId: 'course-2',
    status: 'not_started',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-04-15T00:00:00Z'
  }
];

// Mock Submissions
export const mockAssignmentSubmissions: AssignmentSubmission[] = [
  {
    id: 'submission-1',
    studentId: 'student-1',
    itemId: 'assignment-1',
    itemType: 'assignment',
    submissionDate: '2024-02-10T14:30:00Z',
    status: 'submitted',
    fileUrl: 'https://example.com/submissions/john-css-layout.zip',
    grade: undefined,
    feedback: undefined
  },
  {
    id: 'submission-2',
    studentId: 'student-2',
    itemId: 'assignment-1',
    itemType: 'assignment',
    submissionDate: '2024-02-12T09:45:00Z',
    status: 'graded',
    content: 'Here is my CSS layout solution...',
    grade: 85,
    feedback: 'Good work on the layout, but consider improving the mobile responsiveness.'
  }
];

export const mockQuizSubmissions: QuizSubmission[] = [
  {
    id: 'submission-3',
    studentId: 'student-1',
    itemId: 'quiz-1',
    itemType: 'quiz',
    submissionDate: '2024-02-05T11:20:00Z',
    status: 'submitted',
    answers: [
      { questionId: 'question-1', answer: '<a>' },
      { questionId: 'question-2', answer: 'font-size' }
    ],
    score: 10,
    totalPossible: 10
  }
];

export const mockCodingSubmissions: CodingSubmission[] = [
  {
    id: 'submission-4',
    studentId: 'student-2',
    itemId: 'coding-1',
    itemType: 'coding',
    submissionDate: '2024-02-20T16:40:00Z',
    status: 'submitted',
    code: 'function removeDuplicates(arr) {\n  return [...new Set(arr)];\n}',
    language: 'JavaScript',
    testResults: [
      { testCaseId: 'tc-1', passed: true },
      { testCaseId: 'tc-2', passed: true }
    ],
    score: 10,
    totalPossible: 10
  }
];

export const mockAssessmentSubmissions: AssessmentSubmission[] = [
  {
    id: 'submission-5',
    studentId: 'student-1',
    itemId: 'assessment-1',
    itemType: 'assessment',
    submissionDate: '2024-03-01T14:00:00Z',
    status: 'submitted',
    timeTaken: 6300, // 1 hour and 45 minutes
    score: 75,
    totalPossible: 100,
    percentageObtained: 75,
    qualified: true,
    numberOfAttempts: 1,
    hasReAttemptRequest: false,
    answers: [
      { questionId: 'question-1', questionType: 'MCQ', answer: '<a>' },
      { questionId: 'question-2', questionType: 'MCQ', answer: 'font-size' },
      { 
        questionId: 'question-3', 
        questionType: 'Coding', 
        answer: { 
          code: 'function sumArray(arr) {\n  return arr.reduce((sum, num) => sum + num, 0);\n}', 
          language: 'JavaScript' 
        } 
      },
      { questionId: 'question-4', questionType: 'Open Ended', answer: 'CSS specificity refers to the rules that determine which styles are applied to an element when multiple conflicting styles exist...' }
    ]
  },
  {
    id: 'submission-6',
    studentId: 'student-3',
    itemId: 'assessment-1',
    itemType: 'assessment',
    submissionDate: '2024-03-01T13:30:00Z',
    status: 'submitted',
    timeTaken: 7200, // Full 2 hours
    score: 65,
    totalPossible: 100,
    percentageObtained: 65,
    qualified: false,
    numberOfAttempts: 1,
    hasReAttemptRequest: true,
    answers: [] // Omitted for brevity
  }
];

export const mockProjectSubmissions: ProjectSubmission[] = [
  {
    id: 'submission-7',
    studentId: 'student-1',
    itemId: 'project-1',
    itemType: 'project',
    submissionDate: '2024-02-28T23:45:00Z',
    status: 'submitted',
    fileUrl: 'https://example.com/submissions/john-portfolio.zip',
    url: 'https://john-portfolio-project.netlify.app',
    grade: undefined,
    feedback: undefined
  }
];

export const mockFeedbackSubmissions: FeedbackSubmission[] = [
  {
    id: 'submission-8',
    studentId: 'student-2',
    itemId: 'feedback-1',
    itemType: 'feedback',
    submissionDate: '2024-02-08T10:15:00Z',
    status: 'submitted',
    answers: [
      { questionId: 'fb-q-1', answer: 4 },
      { questionId: 'fb-q-2', answer: 'I found the practical exercises most valuable.' },
      { questionId: 'fb-q-3', answer: ['CSS', 'JavaScript'] }
    ]
  }
];

export const mockReAttemptRequests: ReAttemptRequest[] = [
  {
    id: 'reattempt-1',
    studentId: 'student-3',
    assessmentId: 'assessment-1',
    requestDate: '2024-03-02T09:10:00Z',
    status: 'pending'
  }
]; 