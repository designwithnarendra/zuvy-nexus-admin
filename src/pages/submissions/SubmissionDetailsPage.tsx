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
    router.push(`/courses/${courseId}?tab=submissions`);
  };

  const handleOpenReAttemptModal = (submissionId: string) => {
    setSelectedSubmissionForReAttempt(submissionId);
    setIsReAttemptModalOpen(true);
  };

  const handleApproveReAttempt = () => {
    if (selectedSubmissionForReAttempt) {
      setApprovedReAttempts(new Set([...approvedReAttempts, selectedSubmissionForReAttempt]));
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
    <div className="container mx-auto px-6 py-8 max-w-7xl">
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

      {/* Submission Item Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">
            {item?.title || `${submissionType.charAt(0).toUpperCase() + submissionType.slice(1)} Submissions`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Total Submissions:</span>
              <p className="text-lg font-semibold">{filteredSubmissions.length}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Batch Filter:</span>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-full mt-1">
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
            <div>
              <span className="font-medium text-muted-foreground">Submission Type:</span>
              <p className="text-lg font-semibold capitalize">{submissionType}</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Course ID:</span>
              <p className="text-lg font-semibold">{courseId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <h2 className="text-lg font-semibold mb-6">Student Submissions</h2>
      <Card className="bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Qualified</TableHead>
                <TableHead>Attempts</TableHead>
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
                        <div className="text-sm text-muted-foreground">{student?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{batch?.name || 'Batch 1'}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(submission.submissionDate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {(submission as any).timeTaken || '105m 0s'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${
                        ((submission as any).score || 75) >= 70 ? 'text-success' : 'text-destructive'
                      }`}>
                        {(submission as any).score || 75}%
                      </span>
                    </TableCell>
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
                    <TableCell>
                      <span className="font-medium">{(submission as any).attempts || 1}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary hover:text-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Re-Attempt Confirmation Modal */}
      <Dialog open={isReAttemptModalOpen} onOpenChange={setIsReAttemptModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Approve Re-Attempt</DialogTitle>
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
    </div>
  );
};

export default SubmissionDetailsPage;