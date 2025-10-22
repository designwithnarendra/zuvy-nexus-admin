'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
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
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { 
  Student, 
  Submission, 
  LearningItem,
} from '@/types';
import { 
  mockStudents, 
  mockBatches,
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

// Import modal components
import { AssignmentModalView } from '@/components/courses/submissions/modals/AssignmentModalView';
import { ProjectModalView } from '@/components/courses/submissions/modals/ProjectModalView';
import { QuizModalView } from '@/components/courses/submissions/modals/QuizModalView';
import { CodingModalView } from '@/components/courses/submissions/modals/CodingModalView';
import { FeedbackModalView } from '@/components/courses/submissions/modals/FeedbackModalView';

interface SubmissionDetailsPageProps {
  courseId: string;
  itemId: string;
  submissionType: string;
}

const SubmissionDetailsPage = ({ 
  courseId, 
  itemId, 
  submissionType 
}: SubmissionDetailsPageProps) => {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [item, setItem] = useState<LearningItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReAttemptModalOpen, setIsReAttemptModalOpen] = useState(false);
  const [selectedSubmissionForReAttempt, setSelectedSubmissionForReAttempt] = useState<string | null>(null);
  const [approvedReAttempts, setApprovedReAttempts] = useState<Set<string>>(new Set());
  
  // Modal states
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);

  // Fetch submissions and students
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStudents(mockStudents);
      setBatches(mockBatches);
      
      let submissionData: Submission[] = [];
      let itemData: LearningItem | null = null;
      
      switch (submissionType) {
        case 'assignments':
          submissionData = mockAssignmentSubmissions as Submission[];
          itemData = mockAssignments.find(a => a.id === itemId) || null;
          break;
        case 'quizzes':
          submissionData = mockQuizSubmissions as Submission[];
          itemData = mockQuizzes.find(q => q.id === itemId) || null;
          break;
        case 'coding':
          submissionData = mockCodingSubmissions as Submission[];
          itemData = mockCodingProblems.find(c => c.id === itemId) || null;
          break;
        case 'assessments':
          submissionData = mockAssessmentSubmissions as Submission[];
          itemData = mockAssessments.find(a => a.id === itemId) || null;
          break;
        case 'feedback':
          submissionData = mockFeedbackSubmissions as Submission[];
          itemData = mockFeedbackForms.find(f => f.id === itemId) || null;
          break;
        case 'projects':
          submissionData = mockProjectSubmissions as Submission[];
          itemData = mockProjects.find(p => p.id === itemId) as any || null;
          break;
      }
      
      setSubmissions(submissionData);
      setItem(itemData);
      setIsLoading(false);
    }, 1000);
  }, [itemId, submissionType]);

  const handleBack = () => {
    router.push(`/courses/${courseId}?tab=submissions&submissionType=${submissionType}`);
  };

  const handleViewReport = (submission: Submission) => {
    const student = students.find(s => s.id === submission.studentId);
    if (!student) return;
    
    if (submissionType === 'assessments') {
      // Keep existing navigation for assessments
      router.push(`/submissions/${courseId}/${itemId}/${submission.studentId}?type=${submissionType}`);
    } else {
      // Open modal for other types
      setSelectedSubmission(submission);
      setSelectedStudent(student);
      setIsSubmissionModalOpen(true);
    }
  };

  const handleOpenReAttemptModal = (submissionId: string) => {
    setSelectedSubmissionForReAttempt(submissionId);
    setIsReAttemptModalOpen(true);
  };

  const handleApproveReAttempt = () => {
    if (selectedSubmissionForReAttempt) {
      const newApprovedSet = new Set(approvedReAttempts);
      newApprovedSet.add(selectedSubmissionForReAttempt);
      setApprovedReAttempts(newApprovedSet);
      setIsReAttemptModalOpen(false);
      setSelectedSubmissionForReAttempt(null);
    }
  };

  const handleCancelReAttempt = () => {
    setIsReAttemptModalOpen(false);
    setSelectedSubmissionForReAttempt(null);
  };

  const filteredSubmissions = selectedBatch === 'all' 
    ? submissions 
    : submissions.filter(s => {
        const student = students.find(st => st.id === s.studentId);
        return student?.batchId === selectedBatch;
      });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'pending':
      case 'in_progress':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'failed':
      case 'not_submitted':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted':
      case 'completed':
        return 'bg-success-light text-success-dark border-success';
      case 'pending':
      case 'in_progress':
        return 'bg-warning-light text-warning-dark border-warning';
      case 'failed':
      case 'not_submitted':
        return 'bg-destructive-light text-destructive-dark border-destructive';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="h-32 bg-muted rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="hover:text-primary hover:bg-transparent p-0"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Course Submissions
        </Button>
      </div>

      {/* Title */}
      <div className="mb-4">
        <h1 className="text-h5">
          {item?.title || `${submissionType.charAt(0).toUpperCase() + submissionType.slice(1)} Assessment`}
        </h1>
      </div>

      {/* Batch Filter and Metrics - Left Aligned */}
      <div className="mb-8">
        <div className="flex items-start gap-8">
          <div className="flex flex-col">
            <label className="text-body2 font-medium text-muted-foreground mb-1">Batch</label>
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Batches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => (
                  <SelectItem key={batch.id} value={batch.id}>
                    {batch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-6 text-body2">
            <div className="text-left">
              <div className="font-semibold">{filteredSubmissions.length}</div>
              <div className="text-muted-foreground">Total Submissions</div>
            </div>
            <div className="text-left">
              <div className="font-semibold">{filteredSubmissions.filter(s => s.status === 'submitted' || s.status === 'graded' || s.status === 'reviewed').length}</div>
              <div className="text-muted-foreground">Submissions Received</div>
            </div>
            {submissionType === 'assessments' && (
              <div className="text-left">
                <div className="font-semibold">{filteredSubmissions.filter(s => (s as any).qualified).length}</div>
                <div className="text-muted-foreground">Qualified Students</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="w-full">
        <div className="overflow-x-auto border border-border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Submission Date</TableHead>
                {submissionType === 'assessments' && <TableHead>Time Taken</TableHead>}
                {submissionType === 'assessments' && <TableHead>Score</TableHead>}
                {submissionType === 'assessments' && <TableHead>Qualified</TableHead>}
                {submissionType === 'assessments' && <TableHead>Attempts</TableHead>}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => {
                const student = students.find(s => s.id === submission.studentId);
                const batch = batches.find(b => b.id === student?.batchId);
                
                return (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student?.name || 'Unknown Student'}</div>
                        <div className="text-body2 text-muted-foreground">{student?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{batch?.name || 'Batch 1'}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.submissionDate).toLocaleString()}
                    </TableCell>
                    {submissionType === 'assessments' && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {(submission as any).timeTaken || '105m 0s'}
                        </div>
                      </TableCell>
                    )}
                    {submissionType === 'assessments' && (
                      <TableCell>
                        <span className={`font-semibold ${
                          ((submission as any).score || 75) >= 70 ? 'text-success' : 'text-destructive'
                        }`}>
                          {(submission as any).score || 75}%
                        </span>
                      </TableCell>
                    )}
                    {submissionType === 'assessments' && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(submission.status)}
                          <Badge
                            variant="outline"
                            className={getStatusColor(submission.status)}
                          >
                            {((submission as any).score || 75) >= 70 ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </TableCell>
                    )}
                    {submissionType === 'assessments' && (
                      <TableCell>
                        <span className="font-medium">{(submission as any).attempts || 1}</span>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(submission)}
                          className="hover:bg-primary hover:text-white"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Report
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-primary hover:text-white"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download Report
                        </Button>
                        {submissionType === 'assessments' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenReAttemptModal(submission.id)}
                            disabled={approvedReAttempts.has(submission.id)}
                            className={approvedReAttempts.has(submission.id)
                              ? "text-muted-foreground cursor-not-allowed"
                              : "text-primary hover:bg-primary hover:text-white"
                            }
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            {approvedReAttempts.has(submission.id) ? 'Re-Attempt Approved' : 'Approve Re-Attempt'}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Re-Attempt Confirmation Modal */}
      <Dialog open={isReAttemptModalOpen} onOpenChange={setIsReAttemptModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-body1 font-semibold">Approve Re-Attempt</DialogTitle>
            <DialogDescription>
              Are you sure you want to allow this student to re-attempt this assessment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancelReAttempt}>
              Cancel
            </Button>
            <Button onClick={handleApproveReAttempt} className="bg-primary hover:bg-primary-dark">
              Approve Re-Attempt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submission View Modals */}
      {selectedSubmission && selectedStudent && (
        <>
          {submissionType === 'assignments' && (
            <AssignmentModalView
              open={isSubmissionModalOpen}
              onOpenChange={setIsSubmissionModalOpen}
              submission={selectedSubmission as any}
              student={selectedStudent}
              assignment={item as any}
            />
          )}
          
          {submissionType === 'projects' && (
            <ProjectModalView
              open={isSubmissionModalOpen}
              onOpenChange={setIsSubmissionModalOpen}
              submission={selectedSubmission as any}
              student={selectedStudent}
              project={item as any}
            />
          )}
          
          {submissionType === 'quizzes' && (
            <QuizModalView
              open={isSubmissionModalOpen}
              onOpenChange={setIsSubmissionModalOpen}
              submission={selectedSubmission as any}
              student={selectedStudent}
              quiz={item as any}
            />
          )}
          
          {submissionType === 'coding' && (
            <CodingModalView
              open={isSubmissionModalOpen}
              onOpenChange={setIsSubmissionModalOpen}
              submission={selectedSubmission as any}
              student={selectedStudent}
              problem={item as any}
            />
          )}
          
          {submissionType === 'feedback' && (
            <FeedbackModalView
              open={isSubmissionModalOpen}
              onOpenChange={setIsSubmissionModalOpen}
              submission={selectedSubmission as any}
              student={selectedStudent}
              feedbackForm={item as any}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SubmissionDetailsPage;