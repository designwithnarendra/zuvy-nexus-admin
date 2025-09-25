'use client'

import { useRouter } from 'next/navigation';
import { AssignmentSubmissionView } from '@/components/courses/submissions/AssignmentSubmissionView';
import { ProjectSubmissionView } from '@/components/courses/submissions/ProjectSubmissionView';
import { QuizSubmissionView } from '@/components/courses/submissions/QuizSubmissionView';
import { CodingProblemSubmissionView } from '@/components/courses/submissions/CodingProblemSubmissionView';
import { FeedbackSubmissionView } from '@/components/courses/submissions/FeedbackSubmissionView';
import { AssessmentSubmissionView } from '@/components/courses/submissions/AssessmentSubmissionView';

interface SubmissionViewClientProps {
  courseId: string;
  itemId: string;
  studentId: string;
  type: string;
}

export const SubmissionViewClient = ({ courseId, itemId, studentId, type }: SubmissionViewClientProps) => {
  const router = useRouter();

  // Mock data - in real app would be passed as props from server component
  const mockStudent = {
    id: studentId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: '/placeholder-avatar.jpg'
  };

  const mockSubmission = {
    id: `${studentId}-${itemId}`,
    studentId,
    itemId,
    submissionDate: new Date().toISOString(),
    status: 'submitted' as const,
    itemType: type as any,
  };

  const mockItem = {
    id: itemId,
    title: `Sample ${type || 'Item'} Title`,
    type: type || 'assignment',
  };

  const handleBack = () => {
    router.back();
  };

  // Render appropriate component based on submission type
  switch (type) {
    case 'assignments':
      return (
        <AssignmentSubmissionView
          submission={{
            ...mockSubmission,
            content: 'This is my assignment submission. I have completed all the requirements and attached the necessary files.',
            fileUrl: 'https://example.com/assignment-file.pdf',
            grade: 85,
            feedback: 'Good work! Consider improving the analysis section.'
          }}
          student={mockStudent}
          assignment={mockItem as any}
          onBack={handleBack}
        />
      );

    case 'projects':
      return (
        <ProjectSubmissionView
          submission={{
            ...mockSubmission,
            content: 'Project submission with detailed implementation and documentation.',
            fileUrl: 'https://example.com/project.zip',
            url: 'https://github.com/student/project',
            grade: 92,
            feedback: 'Excellent implementation! Great use of design patterns.'
          }}
          student={mockStudent}
          project={mockItem as any}
          onBack={handleBack}
        />
      );

    case 'quizzes':
      return (
        <QuizSubmissionView
          submission={{
            ...mockSubmission,
            score: 8,
            totalPossible: 10,
            answers: [
              { questionId: '1', answer: 'Document Object Model' },
              { questionId: '2', answer: 'document.getElementById()' },
              { questionId: '3', answer: 'element.on()' }
            ]
          }}
          student={mockStudent}
          quiz={mockItem as any}
          onBack={handleBack}
        />
      );

    case 'coding':
      return (
        <CodingProblemSubmissionView
          submission={{
            ...mockSubmission,
            score: 8,
            totalPossible: 10,
            language: 'JavaScript',
            code: `function maxSubarraySum(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
            testResults: [
              {
                testCaseId: '1',
                passed: true,
                output: '6',
                error: null
              },
              {
                testCaseId: '2',
                passed: true,
                output: '1',
                error: null
              },
              {
                testCaseId: '3',
                passed: false,
                output: '4',
                error: 'Expected 5 but got 4'
              }
            ]
          }}
          student={mockStudent}
          problem={mockItem as any}
          onBack={handleBack}
        />
      );

    case 'feedback':
      return (
        <FeedbackSubmissionView
          submission={{
            ...mockSubmission,
            answers: [
              { questionId: '1', answer: 3 },
              { questionId: '2', answer: ['Event Handling', 'Interactive Elements'] },
              { questionId: '3', answer: 'Improve it the way it is' },
              { questionId: '4', answer: '2025-09-25' }
            ]
          }}
          student={mockStudent}
          feedbackForm={mockItem as any}
          onBack={handleBack}
        />
      );

    case 'assessments':
      return (
        <AssessmentSubmissionView
          submission={{
            ...mockSubmission,
            score: 47,
            totalPossible: 60,
            percentageObtained: 78,
            timeTaken: 6300, // 105 minutes in seconds
            numberOfAttempts: 1,
            qualified: true,
            hasReAttemptRequest: false,
            answers: [
              { questionId: '1', questionType: 'Coding', answer: { code: 'function test() {}' } },
              { questionId: '2', questionType: 'MCQ', answer: 'Hash Table' },
              { questionId: '3', questionType: 'Open Ended', answer: 'System design approach...' }
            ]
          }}
          student={mockStudent}
          assessment={mockItem as any}
          onBack={handleBack}
        />
      );

    default:
      return <div>Submission type not supported</div>;
  }
};