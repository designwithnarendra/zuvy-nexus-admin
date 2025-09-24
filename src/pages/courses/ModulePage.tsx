'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, BookOpen, Video, FileText, Code, HelpCircle, MessageSquare, ClipboardCheck, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import the actual editor components
import { LiveClassEditor } from '@/components/courses/learning-item-editors/LiveClassEditor';
import { VideoEditor } from '@/components/courses/learning-item-editors/VideoEditor';
import { ArticleEditor } from '@/components/courses/learning-item-editors/ArticleEditor';
import { AssignmentEditor } from '@/components/courses/learning-item-editors/AssignmentEditor';
import { QuizEditor } from '@/components/courses/learning-item-editors/QuizEditor';
import { FeedbackFormEditor } from '@/components/courses/learning-item-editors/FeedbackFormEditor';
import { CodingProblemEditor } from '@/components/courses/learning-item-editors/CodingProblemEditor';

// Import the updated types
import {
  ContentType,
  LearningItem,
  LiveClassData,
  VideoData,
  ArticleData,
  AssignmentData,
  CodingProblemData,
  QuizData,
  FeedbackFormData
} from '@/components/courses/curriculum/types';

// Use the LearningItem from types, but extend it for display purposes
interface ContentDisplayItem {
  id: string;
  type: ContentType;
  title: string;
  duration?: string;
  status?: 'completed' | 'in-progress' | 'not-started';
}

interface ModulePageProps {
  courseId: string;
  moduleId: string;
}

const ModulePage = ({ courseId, moduleId }: ModulePageProps) => {
  const router = useRouter();

  // Mock module data - would come from API
  const moduleData = {
    id: moduleId,
    title: 'Module 2: DOM Manipulation & Events',
    contentItems: [
      { id: '1', type: 'live-class' as ContentType, title: 'DOM Fundamentals and Element Selection', duration: '90 min', status: 'completed' as const },
      { id: '2', type: 'video' as ContentType, title: 'Advanced DOM Manipulation Techniques', duration: '90 min', status: 'completed' as const },
      { id: '3', type: 'video' as ContentType, title: 'Visualizing the DOM tree', duration: '15 min', status: 'not-started' as const },
      { id: '4', type: 'article' as ContentType, title: 'Understanding Nodes in the DOM', duration: '5 mins read', status: 'not-started' as const },
      { id: '5', type: 'assignment' as ContentType, title: 'DOM Selection Practice', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '6', type: 'quiz' as ContentType, title: 'DOM Fundamentals Quiz', duration: '5 questions', status: 'not-started' as const },
      { id: '7', type: 'feedback-form' as ContentType, title: 'Module 2 Feedback', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '8', type: 'coding-problem' as ContentType, title: 'Array Manipulation Challenge', duration: 'Practice problem', status: 'not-started' as const }
    ]
  };

  const [selectedItem, setSelectedItem] = useState<ContentDisplayItem | null>(moduleData.contentItems[1] || null);
  const [showAddContent, setShowAddContent] = useState(false);

  const getContentIcon = (type: ContentType) => {
    switch (type) {
      case 'live-class': return <Video className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'assignment': return <ClipboardCheck className="h-4 w-4" />;
      case 'coding-problem': return <Code className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'feedback-form': return <MessageSquare className="h-4 w-4" />;
      case 'assessment': return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getContentTypeLabel = (type: ContentType) => {
    switch (type) {
      case 'live-class': return 'Live Class';
      case 'video': return 'Video';
      case 'article': return 'Article';
      case 'assignment': return 'Assignment';
      case 'coding-problem': return 'Coding Problem';
      case 'quiz': return 'Quiz';
      case 'feedback-form': return 'Feedback Form';
      case 'assessment': return 'Assessment';
      default: return 'Content';
    }
  };

  const getStatusColor = (status: ContentDisplayItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-success-light text-success-dark border-success';
      case 'in-progress': return 'bg-warning-light text-warning-dark border-warning';
      case 'not-started': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const contentTypes = [
    { type: 'live-class', label: 'Live Class', icon: <Video className="h-4 w-4" /> },
    { type: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { type: 'article', label: 'Article', icon: <FileText className="h-4 w-4" /> },
    { type: 'assignment', label: 'Assignment', icon: <ClipboardCheck className="h-4 w-4" /> },
    { type: 'coding-problem', label: 'Coding Problem', icon: <Code className="h-4 w-4" /> },
    { type: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-4 w-4" /> },
    { type: 'feedback-form', label: 'Feedback Form', icon: <MessageSquare className="h-4 w-4" /> },
    { type: 'assessment', label: 'Assessment', icon: <GraduationCap className="h-4 w-4" /> }
  ];

  const handleAddContentType = (type: string) => {
    console.log('Adding content type:', type);
    // Here we would create a new content item and set it as selected
    setShowAddContent(false);
  };

  // Helper function to convert ContentDisplayItem to proper editor data
  const getEditorData = (item: ContentDisplayItem) => {
    const baseData = {
      id: item.id,
      title: item.title,
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft' as const
    };

    switch (item.type) {
      case 'live-class':
        return {
          ...baseData,
          type: 'live-class' as const,
          startDate: new Date(),
          startTime: '10:00',
          duration: 90
        } as LiveClassData;

      case 'video':
        return {
          ...baseData,
          type: 'video' as const,
          sourceType: 'youtube' as const,
          url: ''
        } as VideoData;

      case 'article':
        return {
          ...baseData,
          type: 'article' as const,
          contentType: 'rich-text' as const,
          content: ''
        } as ArticleData;

      case 'assignment':
        return {
          ...baseData,
          type: 'assignment' as const,
          instructions: '',
          instructionType: 'text' as const,
          submissionTypes: ['file', 'text'] as ('file' | 'text')[]
        } as AssignmentData;

      case 'quiz':
        return {
          ...baseData,
          type: 'quiz' as const,
          questionIds: [],
          topics: [],
          randomizeQuestions: false,
          allowMultipleAttempts: true
        } as QuizData;

      case 'feedback-form':
        return {
          ...baseData,
          type: 'feedback-form' as const,
          questions: []
        } as FeedbackFormData;

      case 'coding-problem':
        return {
          ...baseData,
          type: 'coding-problem' as const,
          difficulty: 'Medium' as const,
          topics: [],
          isFromContentBank: true
        } as CodingProblemData;

      default:
        return baseData;
    }
  };

  // Handle saving editor data
  const handleEditorSave = (data: any) => {
    console.log('Saving editor data:', data);
    // Here we would save the data to the backend
    // For now, just update the selected item title
    if (selectedItem) {
      const updatedItem = { ...selectedItem, title: data.title };
      setSelectedItem(updatedItem);
    }
  };

  // Handle editor cancel
  const handleEditorCancel = () => {
    // For now, just keep the current item selected
    console.log('Editor cancelled');
  };

  const renderContentEditor = () => {
    if (!selectedItem) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start by choosing a content item</h3>
            <p className="text-muted-foreground">Select a content item from the sidebar to start editing</p>
          </div>
        </div>
      );
    }

    // Get the proper data format for the editor
    const editorData = getEditorData(selectedItem);

    // Render the appropriate editor component based on content type
    switch (selectedItem.type) {
      case 'live-class':
        return (
          <div className="flex-1">
            <LiveClassEditor
              initialData={editorData as LiveClassData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'video':
        return (
          <div className="flex-1">
            <VideoEditor
              initialData={editorData as VideoData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'article':
        return (
          <div className="flex-1">
            <ArticleEditor
              initialData={editorData as ArticleData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'assignment':
        return (
          <div className="flex-1">
            <AssignmentEditor
              initialData={editorData as AssignmentData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="flex-1">
            <QuizEditor
              initialData={editorData as QuizData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'feedback-form':
        return (
          <div className="flex-1">
            <FeedbackFormEditor
              initialData={editorData as FeedbackFormData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      case 'coding-problem':
        return (
          <div className="flex-1">
            <CodingProblemEditor
              initialData={editorData as CodingProblemData}
              mode="edit"
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          </div>
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Editor not available</h3>
              <p className="text-muted-foreground">This content type doesn't have an editor yet</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - 25% width */}
      <div className="w-1/4 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}`)}
            className="mb-4 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div>
            <h2 className="font-semibold text-lg mb-1">Module Content</h2>
            <h3 className="text-sm text-muted-foreground">{moduleData.title}</h3>
          </div>
        </div>

        {/* Content Items List */}
        <div className="flex-1 overflow-y-auto">
          {moduleData.contentItems.length === 0 ? (
            <div className="p-4">
              <Button
                onClick={() => setShowAddContent(!showAddContent)}
                className="w-full bg-primary hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          ) : (
            <div className="p-2">
              {moduleData.contentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "p-3 mb-2 rounded-lg cursor-pointer border transition-colors",
                    selectedItem?.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted border-transparent"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                      {getContentIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-1" style={{ fontSize: '0.875rem' }}>
                        {getContentTypeLabel(item.type)}
                        {item.duration && (
                          <>
                            <span className="mx-1">•</span>
                            {item.duration}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={() => setShowAddContent(!showAddContent)}
                variant="outline"
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          )}

          {/* Add Content Menu */}
          {showAddContent && (
            <div className="p-2 border-t bg-muted/50">
              <div className="space-y-1">
                {contentTypes.map((contentType) => (
                  <Button
                    key={contentType.type}
                    variant="ghost"
                    onClick={() => handleAddContentType(contentType.type)}
                    className="w-full justify-start text-left h-auto py-2"
                  >
                    <div className="mr-2">{contentType.icon}</div>
                    {contentType.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area - 75% width */}
      {renderContentEditor()}
    </div>
  );
};

export default ModulePage;