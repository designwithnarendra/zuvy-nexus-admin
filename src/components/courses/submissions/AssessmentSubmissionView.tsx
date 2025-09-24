'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  ArrowLeft,
  Clock,
  Code,
  CheckSquare,
  FileText,
  Eye,
  AlertTriangle,
  Monitor,
  Copy
} from 'lucide-react';
import { AssessmentSubmission, Student, Assessment } from '@/types';

interface AssessmentSubmissionViewProps {
  submission: AssessmentSubmission;
  student: Student;
  assessment: Assessment;
  onBack: () => void;
}

interface QuestionCard {
  id: string;
  type: 'coding' | 'mcq' | 'open_ended';
  title: string;
  score: number;
  maxScore: number;
}

// Mock question data
const mockQuestions: QuestionCard[] = [
  { id: '1', type: 'coding', title: 'Maximum Subarray Sum', score: 8, maxScore: 10 },
  { id: '2', type: 'coding', title: 'Binary Tree Traversal', score: 9, maxScore: 10 },
  { id: '3', type: 'mcq', title: 'Data Structures Knowledge', score: 7, maxScore: 10 },
  { id: '4', type: 'mcq', title: 'Algorithm Complexity', score: 9, maxScore: 10 },
  { id: '5', type: 'open_ended', title: 'System Design Approach', score: 8, maxScore: 10 },
  { id: '6', type: 'open_ended', title: 'Code Optimization Strategy', score: 6, maxScore: 10 }
];

export const AssessmentSubmissionView = ({
  submission,
  student,
  assessment,
  onBack
}: AssessmentSubmissionViewProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionCard | null>(null);
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate section scores
  const codingQuestions = mockQuestions.filter(q => q.type === 'coding');
  const mcqQuestions = mockQuestions.filter(q => q.type === 'mcq');
  const openEndedQuestions = mockQuestions.filter(q => q.type === 'open_ended');

  const codingScore = codingQuestions.reduce((sum, q) => sum + q.score, 0);
  const codingMaxScore = codingQuestions.reduce((sum, q) => sum + q.maxScore, 0);
  const mcqScore = mcqQuestions.reduce((sum, q) => sum + q.score, 0);
  const mcqMaxScore = mcqQuestions.reduce((sum, q) => sum + q.maxScore, 0);
  const openEndedScore = openEndedQuestions.reduce((sum, q) => sum + q.score, 0);
  const openEndedMaxScore = openEndedQuestions.reduce((sum, q) => sum + q.maxScore, 0);

  const handleViewQuestion = (question: QuestionCard) => {
    setSelectedQuestion(question);
    setQuestionDialogOpen(true);
  };

  const renderQuestionContent = (question: QuestionCard) => {
    switch (question.type) {
      case 'coding':
        return (
          <div className="space-y-4">
            <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
              <pre className="text-sm">
                <code>{`function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`}</code>
              </pre>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold mb-2">Test Results</p>
                <div className="text-sm text-success">✓ 8/10 test cases passed</div>
              </div>
              <div>
                <p className="font-semibold mb-2">Performance</p>
                <div className="text-sm text-muted-foreground">Time: 45ms, Memory: 2.1MB</div>
              </div>
            </div>
          </div>
        );

      case 'mcq':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="font-semibold">Which data structure provides O(1) average time complexity for insertion and lookup?</p>
              <div className="space-y-2">
                <div className="p-2 bg-muted rounded flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                  <span>Array</span>
                </div>
                <div className="p-2 bg-success-light rounded flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-success bg-success" />
                  <span className="text-success-dark font-medium">Hash Table ✓</span>
                </div>
                <div className="p-2 bg-muted rounded flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                  <span>Binary Tree</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'open_ended':
        return (
          <div className="space-y-4">
            <p className="font-semibold">Describe your approach to designing a scalable web application architecture.</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                I would design a microservices architecture using containerization with Docker and orchestration with Kubernetes.
                The system would include load balancers, API gateways, and distributed caching with Redis. For the database,
                I'd implement database sharding and read replicas to handle increased load. Monitoring and logging would be
                essential for maintaining system health and performance.
              </p>
            </div>
          </div>
        );

      default:
        return <p>Question content not available</p>;
    }
  };

  const renderSection = (questions: QuestionCard[], title: string, icon: React.ReactNode) => {
    if (questions.length === 0) return null;

    return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
          <Badge variant="outline">
            {questions.length} question{questions.length > 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((question) => (
            <Card key={question.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{question.title}</h4>
                  <Badge variant={question.score >= question.maxScore * 0.8 ? "default" : "secondary"}>
                    {question.score}/{question.maxScore}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewQuestion(question)}
                  className="w-full"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Answer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mt-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Submissions
        </Button>
      </div>

      {/* Assessment Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{assessment.title}</h1>
      </div>

      {/* Student Info & Time Taken */}
      <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{student.name}</h2>
                <p className="text-muted-foreground">
                  Submitted on {formatDate(submission.submissionDate)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Time Taken</span>
              </div>
              <p className="text-2xl font-bold">{formatDuration(submission.timeTaken)}</p>
            </div>
          </div>

          {/* Score Card */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Score Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Score */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                    <p className="text-2xl font-bold text-primary">
                      {submission.percentageObtained}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {submission.score}/{submission.totalPossible} points
                    </p>
                  </CardContent>
                </Card>

                {/* Coding Problems Score */}
                {codingQuestions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Code className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">Coding Problems</p>
                      <p className="text-xl font-bold">
                        {Math.round((codingScore / codingMaxScore) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {codingScore}/{codingMaxScore} points
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* MCQ Score */}
                {mcqQuestions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckSquare className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">MCQs</p>
                      <p className="text-xl font-bold">
                        {Math.round((mcqScore / mcqMaxScore) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {mcqScore}/{mcqMaxScore} points
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Open Ended Score */}
                {openEndedQuestions.length > 0 && (
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">Open Ended</p>
                      <p className="text-xl font-bold">
                        {Math.round((openEndedScore / openEndedMaxScore) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {openEndedScore}/{openEndedMaxScore} points
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Proctoring Report */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Proctoring Report</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4 text-center">
                    <Copy className="h-5 w-5 mx-auto mb-2 text-yellow-600" />
                    <p className="text-xl font-bold text-yellow-700">3</p>
                    <p className="text-sm text-yellow-600">Copy/Paste Events</p>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4 text-center">
                    <Monitor className="h-5 w-5 mx-auto mb-2 text-orange-600" />
                    <p className="text-xl font-bold text-orange-700">7</p>
                    <p className="text-sm text-orange-600">Tab Changes</p>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-red-600" />
                    <p className="text-xl font-bold text-red-700">2</p>
                    <p className="text-sm text-red-600">Full Screen Exits</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Question Sections */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold">Question Breakdown</h3>

              {renderSection(
                codingQuestions,
                'Coding Problems',
                <Code className="h-5 w-5 text-primary" />
              )}

              {renderSection(
                mcqQuestions,
                'Multiple Choice Questions',
                <CheckSquare className="h-5 w-5 text-primary" />
              )}

              {renderSection(
                openEndedQuestions,
                'Open Ended Questions',
                <FileText className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
      </div>

      {/* Question Detail Dialog */}
      <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedQuestion?.type === 'coding' && <Code className="h-5 w-5" />}
              {selectedQuestion?.type === 'mcq' && <CheckSquare className="h-5 w-5" />}
              {selectedQuestion?.type === 'open_ended' && <FileText className="h-5 w-5" />}
              {selectedQuestion?.title}
            </DialogTitle>
            <DialogDescription>
              Score: {selectedQuestion?.score}/{selectedQuestion?.maxScore} points
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedQuestion && renderQuestionContent(selectedQuestion)}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};