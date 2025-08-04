'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticleEditor } from '@/components/courses/learning-item-editors/ArticleEditor';
import { VideoEditor } from '@/components/courses/learning-item-editors/VideoEditor';
import { LiveClassEditor } from '@/components/courses/learning-item-editors/LiveClassEditor';
import { QuizEditor } from '@/components/courses/learning-item-editors/QuizEditor';
import { AssignmentEditor } from '@/components/courses/learning-item-editors/AssignmentEditor';
import { CodingProblemEditor } from '@/components/courses/learning-item-editors/CodingProblemEditor';
import { FeedbackFormEditor } from '@/components/courses/learning-item-editors/FeedbackFormEditor';
import { AssessmentEditor } from '@/components/courses/learning-item-editors/AssessmentEditor';

type EditorType = 
  | 'article' 
  | 'video' 
  | 'live-class'
  | 'quiz'
  | 'assignment'
  | 'coding'
  | 'feedback'
  | 'assessment';

export function LearningItemEditorsDemo() {
  const [activeEditor, setActiveEditor] = useState<EditorType>('article');
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  
  const handleSave = (data: any) => {
    console.log('Saving data:', data);
    alert('Editor data saved to console');
  };
  
  const handleCancel = () => {
    console.log('Cancelled');
  };
  
  // Sample data for edit mode
  const sampleData = {
    article: {
      title: 'Introduction to React',
      content: 'React is a JavaScript library for building user interfaces.',
      contentType: 'rich-text' as const,
      estimatedReadTime: 5,
    },
    video: {
      title: 'React Hooks Tutorial',
      description: 'Learn all about React Hooks in this comprehensive guide.',
      sourceType: 'youtube' as const,
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: 15 * 60, // 15 minutes in seconds
    },
    'live-class': {
      title: 'Advanced React Patterns',
      description: 'Join us for a deep dive into advanced React patterns and techniques.',
      startDate: new Date('2023-12-15T10:00:00'),
      startTime: '10:00',
      endTime: '12:00',
      hostName: 'John Doe',
      hostEmail: 'john.doe@example.com',
    },
    quiz: {
      title: 'React Fundamentals Quiz',
      description: 'Test your knowledge of React fundamentals.',
      questions: [
        { id: 'q1', type: 'mcq' as const, text: 'What is JSX?' },
        { id: 'q2', type: 'open-ended' as const, text: 'Explain the concept of Virtual DOM.' },
      ],
      timeLimit: 30,
      randomizeQuestions: true,
    },
    assignment: {
      title: 'Build a Todo App',
      instructions: 'Create a simple todo application using React.',
      allowedSubmissionTypes: ['file', 'text'] as ('file' | 'text')[],
      dueDate: new Date('2023-12-20'),
    },
    coding: {
      title: 'Implement a Counter Component',
      description: 'Create a counter component with increment and decrement buttons.',
      problemStatement: 'Create a React component that maintains a count state and has buttons to increase and decrease the count.',
      testCases: [
        { id: 'tc1', input: 'click increment', expectedOutput: 'count increases by 1', isHidden: false },
        { id: 'tc2', input: 'click decrement', expectedOutput: 'count decreases by 1', isHidden: false },
      ],
      allowedLanguages: ['JavaScript', 'TypeScript'],
      starterCode: 'function Counter() {\n  // Your code here\n}',
    },
    feedback: {
      title: 'Course Feedback Form',
      questions: [
        { id: 'fq1', type: 'rating' as const, text: 'How would you rate this course?', required: true },
        { id: 'fq2', type: 'long-text' as const, text: 'What did you like most about this course?', required: false },
        { 
          id: 'fq3', 
          type: 'multiple-choice' as const, 
          text: 'Which topics would you like to learn more about?', 
          required: false, 
          options: ['React', 'TypeScript', 'Next.js'] 
        },
      ],
    },
    assessment: {
      title: 'React Developer Assessment',
      description: 'Comprehensive assessment for React developers.',
      selectedQuestions: [
        { id: 'q1', type: 'mcq' as const, title: 'What is React?', difficulty: 'easy' as const },
        { id: 'q2', type: 'coding' as const, title: 'Implement a counter', difficulty: 'easy' as const },
      ],
      questionDistribution: [
        {
          questionTypeId: 'mcq',
          easy: 2,
          medium: 1,
          hard: 0,
          totalAvailable: { easy: 3, medium: 2, hard: 1 }
        },
        {
          questionTypeId: 'coding',
          easy: 1,
          medium: 1,
          hard: 0,
          totalAvailable: { easy: 2, medium: 2, hard: 1 }
        }
      ],
      sectionWeightage: [
        { questionTypeId: 'mcq', percentage: 40 },
        { questionTypeId: 'coding', percentage: 60 }
      ],
      timeLimit: 90,
      passingScore: 70,
      proctoring: {
        disableCopyPaste: true,
        trackTabChange: true
      }
    }
  };

  const renderEditor = () => {
    switch (activeEditor) {
      case 'article':
        return (
          <ArticleEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.article : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'video':
        return (
          <VideoEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.video : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'live-class':
        return (
          <LiveClassEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData['live-class'] : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'quiz':
        return (
          <QuizEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.quiz : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'assignment':
        return (
          <AssignmentEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.assignment : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'coding':
        return (
          <CodingProblemEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.coding : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'feedback':
        return (
          <FeedbackFormEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.feedback : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      case 'assessment':
        return (
          <AssessmentEditor
            mode={mode}
            initialData={mode === 'edit' ? sampleData.assessment : undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        );
      default:
        return <div>Select an editor type</div>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Learning Item Editors Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between">
              <Tabs value={activeEditor} onValueChange={(value) => setActiveEditor(value as EditorType)}>
                <TabsList className="grid grid-cols-4 md:grid-cols-8">
                  <TabsTrigger value="article">Article</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                  <TabsTrigger value="live-class">Live Class</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="assignment">Assignment</TabsTrigger>
                  <TabsTrigger value="coding">Coding</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                  <TabsTrigger value="assessment">Assessment</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">Mode:</span>
                <Tabs value={mode} onValueChange={(value) => setMode(value as 'create' | 'edit')}>
                  <TabsList>
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              {renderEditor()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 