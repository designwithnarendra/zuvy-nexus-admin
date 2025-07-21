import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  XCircle,
  Clock
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Student, 
  Submission, 
  AssignmentSubmission, 
  QuizSubmission, 
  CodingSubmission, 
  AssessmentSubmission,
  ProjectSubmission,
  FeedbackSubmission,
  LearningItem,
  Article,
  Video,
  Quiz,
  Assignment,
  CodingProblem,
  Assessment,
  FeedbackForm,
  Project
} from '@/types';
import { 
  mockStudents, 
  mockAssignmentSubmissions, 
  mockQuizSubmissions, 
  mockCodingSubmissions, 
  mockAssessmentSubmissions,
  mockFeedbackSubmissions,
  mockProjectSubmissions,
  mockAssignments,
  mockQuizzes,
  mockCodingProblems,
  mockAssessments,
  mockFeedbackForms,
  mockProjects
} from '@/types/mock-data';

interface StudentSubmissionsTableProps {
  batchId: string;
  itemId: string;
  submissionType: string;
  onBack: () => void;
}

export const StudentSubmissionsTable = ({ 
  batchId, 
  itemId, 
  submissionType, 
  onBack 
}: StudentSubmissionsTableProps) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [item, setItem] = useState<LearningItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewSubmission, setViewSubmission] = useState<Submission | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Fetch submissions and students
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Get the content item
      let contentItem: LearningItem | null = null;
      let allSubmissions: Submission[] = [];
      
      switch (submissionType) {
        case 'assignments':
          contentItem = mockAssignments.find(a => a.id === itemId) || null;
          allSubmissions = mockAssignmentSubmissions;
          break;
        case 'quizzes':
          contentItem = mockQuizzes.find(q => q.id === itemId) || null;
          allSubmissions = mockQuizSubmissions;
          break;
        case 'coding':
          contentItem = mockCodingProblems.find(c => c.id === itemId) || null;
          allSubmissions = mockCodingSubmissions;
          break;
        case 'assessments':
          contentItem = mockAssessments.find(a => a.id === itemId) || null;
          allSubmissions = mockAssessmentSubmissions;
          break;
        case 'feedback':
          contentItem = mockFeedbackForms.find(f => f.id === itemId) || null;
          allSubmissions = mockFeedbackSubmissions;
          break;
        case 'projects':
          contentItem = mockProjects.find(p => p.id === itemId) || null;
          allSubmissions = mockProjectSubmissions;
          break;
      }
      
      // Filter submissions for this item
      const itemSubmissions = allSubmissions.filter(sub => sub.itemId === itemId);
      
      // Get students
      const studentIds = itemSubmissions.map(sub => sub.studentId);
      const relevantStudents = mockStudents.filter(s => studentIds.includes(s.id));
      
      setItem(contentItem);
      setSubmissions(itemSubmissions);
      setStudents(relevantStudents);
      setIsLoading(false);
    }, 500);
  }, [batchId, itemId, submissionType]);

  const handleViewSubmission = (submission: Submission) => {
    setViewSubmission(submission);
    setViewDialogOpen(true);
  };

  const handleApproveReAttempt = (submissionId: string) => {
    // Update the submission to remove the re-attempt request
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, hasReAttemptRequest: false } as AssessmentSubmission
          : sub
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getStudentEmail = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.email : 'unknown@example.com';
  };

  const renderSubmissionContent = (submission: Submission) => {
    switch (submission.itemType) {
      case 'assignment':
        const assignmentSub = submission as AssignmentSubmission;
        return (
          <div className="space-y-4">
            {assignmentSub.content && (
              <div>
                <h3 className="font-medium mb-1">Text Submission:</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {assignmentSub.content}
                </div>
              </div>
            )}
            {assignmentSub.fileUrl && (
              <div>
                <h3 className="font-medium mb-1">File Submission:</h3>
                <a 
                  href={assignmentSub.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Submission
                </a>
              </div>
            )}
            {assignmentSub.grade !== undefined && (
              <div>
                <h3 className="font-medium mb-1">Grade:</h3>
                <p>{assignmentSub.grade}/100</p>
              </div>
            )}
            {assignmentSub.feedback && (
              <div>
                <h3 className="font-medium mb-1">Feedback:</h3>
                <p>{assignmentSub.feedback}</p>
              </div>
            )}
          </div>
        );
      
      case 'quiz':
        const quizSub = submission as QuizSubmission;
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Score:</h3>
              <p>{quizSub.score}/{quizSub.totalPossible} ({Math.round((quizSub.score / quizSub.totalPossible) * 100)}%)</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Answers:</h3>
              <ul className="space-y-2">
                {quizSub.answers.map((answer, index) => (
                  <li key={answer.questionId} className="bg-muted p-2 rounded-md">
                    <span className="font-medium">Question {index + 1}:</span>{' '}
                    {Array.isArray(answer.answer) 
                      ? answer.answer.join(', ') 
                      : answer.answer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'coding':
        const codingSub = submission as CodingSubmission;
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Score:</h3>
              <p>{codingSub.score}/{codingSub.totalPossible} ({Math.round((codingSub.score / codingSub.totalPossible) * 100)}%)</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Language:</h3>
              <p>{codingSub.language}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Code:</h3>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code>{codingSub.code}</code>
              </pre>
            </div>
            <div>
              <h3 className="font-medium mb-1">Test Results:</h3>
              <ul className="space-y-2">
                {codingSub.testResults.map((result, index) => (
                  <li key={result.testCaseId} className="bg-muted p-2 rounded-md">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Test Case {index + 1}:</span>
                      {result.passed ? (
                        <Badge className="bg-success-light text-success-dark">Passed</Badge>
                      ) : (
                        <Badge className="bg-destructive-light text-destructive-dark">Failed</Badge>
                      )}
                    </div>
                    {result.output && (
                      <div className="mt-1">
                        <span className="text-sm text-muted-foreground">Output:</span>{' '}
                        <span className="text-sm">{result.output}</span>
                      </div>
                    )}
                    {result.error && (
                      <div className="mt-1">
                        <span className="text-sm text-destructive">Error:</span>{' '}
                        <span className="text-sm">{result.error}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'assessment':
        const assessmentSub = submission as AssessmentSubmission;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Score:</h3>
                <p>{assessmentSub.percentageObtained}% ({assessmentSub.score}/{assessmentSub.totalPossible})</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Status:</h3>
                {assessmentSub.qualified ? (
                  <Badge className="bg-success-light text-success-dark">Qualified</Badge>
                ) : (
                  <Badge className="bg-destructive-light text-destructive-dark">Not Qualified</Badge>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-1">Time Taken:</h3>
                <p>{formatDuration(assessmentSub.timeTaken)}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Attempts:</h3>
                <p>{assessmentSub.numberOfAttempts}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">Answers:</h3>
              <ul className="space-y-2">
                {assessmentSub.answers.map((answer, index) => (
                  <li key={answer.questionId} className="bg-muted p-2 rounded-md">
                    <div>
                      <span className="font-medium">Question {index + 1} ({answer.questionType}):</span>
                    </div>
                    <div className="mt-1">
                      {answer.questionType === 'Coding' && typeof answer.answer === 'object' ? (
                        <pre className="text-sm overflow-x-auto">
                          <code>{(answer.answer as any).code}</code>
                        </pre>
                      ) : Array.isArray(answer.answer) ? (
                        answer.answer.join(', ')
                      ) : (
                        answer.answer
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      case 'project':
        const projectSub = submission as ProjectSubmission;
        return (
          <div className="space-y-4">
            {projectSub.content && (
              <div>
                <h3 className="font-medium mb-1">Text Submission:</h3>
                <div className="bg-muted p-4 rounded-md whitespace-pre-wrap">
                  {projectSub.content}
                </div>
              </div>
            )}
            {projectSub.fileUrl && (
              <div>
                <h3 className="font-medium mb-1">File Submission:</h3>
                <a 
                  href={projectSub.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download Project
                </a>
              </div>
            )}
            {projectSub.url && (
              <div>
                <h3 className="font-medium mb-1">URL Submission:</h3>
                <a 
                  href={projectSub.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {projectSub.url}
                </a>
              </div>
            )}
            {projectSub.grade !== undefined && (
              <div>
                <h3 className="font-medium mb-1">Grade:</h3>
                <p>{projectSub.grade}/100</p>
              </div>
            )}
            {projectSub.feedback && (
              <div>
                <h3 className="font-medium mb-1">Feedback:</h3>
                <p>{projectSub.feedback}</p>
              </div>
            )}
          </div>
        );
      
      case 'feedback':
        const feedbackSub = submission as FeedbackSubmission;
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Responses:</h3>
              <ul className="space-y-2">
                {feedbackSub.responses.map((response, index) => (
                  <li key={response.questionId} className="bg-muted p-2 rounded-md">
                    <div>
                      <span className="font-medium">Question {index + 1}:</span>
                    </div>
                    <div className="mt-1">
                      {response.responseType === 'rating' ? (
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, i) => (
                            <span 
                              key={i} 
                              className={`h-4 w-4 rounded-full ${i < parseInt(response.response) ? 'bg-primary' : 'bg-muted-foreground/20'}`}
                            />
                          ))}
                          <span className="ml-2">{response.response}/5</span>
                        </div>
                      ) : (
                        response.response
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      
      default:
        return <p>No submission data available</p>;
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" disabled>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Skeleton className="h-6 w-48" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>
        
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Item not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  // Determine columns based on submission type
  const getColumns = () => {
    const baseColumns = [
      { header: 'Student', accessor: 'studentId' },
      { header: 'Submission Date', accessor: 'submissionDate' },
    ];
    
    switch (submissionType) {
      case 'assignments':
      case 'projects':
        return [
          ...baseColumns,
          { header: 'Status', accessor: 'status' },
          { header: 'Grade', accessor: 'grade' },
          { header: 'Actions', accessor: 'actions' }
        ];
      case 'quizzes':
      case 'coding':
        return [
          ...baseColumns,
          { header: 'Score', accessor: 'score' },
          { header: 'Actions', accessor: 'actions' }
        ];
      case 'assessments':
        return [
          ...baseColumns,
          { header: 'Time Taken', accessor: 'timeTaken' },
          { header: 'Score', accessor: 'percentageObtained' },
          { header: 'Qualified', accessor: 'qualified' },
          { header: 'Attempts', accessor: 'numberOfAttempts' },
          { header: 'Actions', accessor: 'actions' }
        ];
      case 'feedback':
        return [
          ...baseColumns,
          { header: 'Actions', accessor: 'actions' }
        ];
      default:
        return baseColumns;
    }
  };

  const columns = getColumns();

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Items
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>{item.title} - Student Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center p-4 text-muted-foreground">
              No submissions found for this item.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.accessor}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    {columns.map((column) => {
                      if (column.accessor === 'studentId') {
                        return (
                          <TableCell key={column.accessor}>
                            <div>
                              <div className="font-medium">{getStudentName(submission.studentId)}</div>
                              <div className="text-sm text-muted-foreground">{getStudentEmail(submission.studentId)}</div>
                            </div>
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'submissionDate') {
                        return (
                          <TableCell key={column.accessor}>
                            {formatDate(submission.submissionDate)}
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'status') {
                        return (
                          <TableCell key={column.accessor}>
                            <Badge 
                              className={
                                submission.status === 'graded' 
                                  ? 'bg-success-light text-success-dark' 
                                  : submission.status === 'reviewed' 
                                    ? 'bg-blue-light text-blue-dark' 
                                    : 'bg-warning-light text-warning-dark'
                              }
                            >
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'grade') {
                        const grade = (submission as AssignmentSubmission | ProjectSubmission).grade;
                        return (
                          <TableCell key={column.accessor}>
                            {grade !== undefined ? `${grade}/100` : '-'}
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'score') {
                        const sub = submission as QuizSubmission | CodingSubmission;
                        return (
                          <TableCell key={column.accessor}>
                            {sub.score}/{sub.totalPossible} ({Math.round((sub.score / sub.totalPossible) * 100)}%)
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'timeTaken') {
                        const sub = submission as AssessmentSubmission;
                        return (
                          <TableCell key={column.accessor}>
                            {formatDuration(sub.timeTaken)}
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'percentageObtained') {
                        const sub = submission as AssessmentSubmission;
                        return (
                          <TableCell key={column.accessor}>
                            {sub.percentageObtained}%
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'qualified') {
                        const sub = submission as AssessmentSubmission;
                        return (
                          <TableCell key={column.accessor}>
                            {sub.qualified ? (
                              <Badge className="bg-success-light text-success-dark">Yes</Badge>
                            ) : (
                              <Badge className="bg-destructive-light text-destructive-dark">No</Badge>
                            )}
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'numberOfAttempts') {
                        const sub = submission as AssessmentSubmission;
                        return (
                          <TableCell key={column.accessor}>
                            {sub.numberOfAttempts}
                          </TableCell>
                        );
                      }
                      
                      if (column.accessor === 'actions') {
                        return (
                          <TableCell key={column.accessor}>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewSubmission(submission)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              
                              {submissionType === 'assessments' && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  disabled={!(submission as AssessmentSubmission).hasReAttemptRequest}
                                  onClick={() => handleApproveReAttempt(submission.id)}
                                  className={
                                    (submission as AssessmentSubmission).hasReAttemptRequest
                                      ? 'text-primary hover:text-primary-dark'
                                      : 'text-muted-foreground'
                                  }
                                >
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Re-attempt
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        );
                      }
                      
                      return <TableCell key={column.accessor}>-</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Submission View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              {viewSubmission && (
                <div className="flex flex-col gap-1">
                  <span>{getStudentName(viewSubmission.studentId)}</span>
                  <span className="text-muted-foreground text-sm">
                    Submitted on {formatDate(viewSubmission.submissionDate)}
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {viewSubmission && renderSubmissionContent(viewSubmission)}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            {viewSubmission && viewSubmission.itemType === 'assessment' && (
              <Button 
                variant="default"
                disabled={!(viewSubmission as AssessmentSubmission).hasReAttemptRequest}
                onClick={() => {
                  handleApproveReAttempt(viewSubmission.id);
                  setViewDialogOpen(false);
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Approve Re-attempt
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 