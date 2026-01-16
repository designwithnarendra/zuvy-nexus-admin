'use client'

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, BookOpen, Video, FileText, Code, HelpCircle, MessageSquare, ClipboardCheck, GraduationCap, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeleteContentModal } from '@/components/courses/curriculum/DeleteContentModal';
import { useUser } from '@/contexts/UserContext';

// Import the actual editor components
import { LiveClassEditor } from '@/components/courses/learning-item-editors/LiveClassEditor';
import { VideoEditor } from '@/components/courses/learning-item-editors/VideoEditor';
import { ArticleEditor } from '@/components/courses/learning-item-editors/ArticleEditor';
import { AssignmentEditor } from '@/components/courses/learning-item-editors/AssignmentEditor';
import { QuizEditor } from '@/components/courses/learning-item-editors/QuizEditor';
import { FeedbackFormEditor } from '@/components/courses/learning-item-editors/FeedbackFormEditor';
import { CodingProblemEditor } from '@/components/courses/learning-item-editors/CodingProblemEditor';
import { AssessmentEditor } from '@/components/courses/learning-item-editors/AssessmentEditor';

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
  classStatus?: 'upcoming' | 'ongoing' | 'completed'; // For live classes
  recordingUrl?: string; // For completed live classes
  recordingPlatform?: 'youtube' | 'upload'; // For completed live classes
  createdBy?: string; // Email of creator (admin or instructor)
}

interface ModulePageProps {
  courseId: string;
  moduleId: string;
}

const ModulePage = ({ courseId, moduleId }: ModulePageProps) => {
  const router = useRouter();
  const { currentUser, isInstructor } = useUser();

  // Mock module data - would come from API
  const moduleData = {
    id: moduleId,
    title: 'Module 2: DOM Manipulation & Events',
    contentItems: [
      { id: '1', type: 'live-class' as ContentType, title: 'DOM Fundamentals and Element Selection', duration: '90 min', status: 'completed' as const, classStatus: 'upcoming' as const },
      { id: '2', type: 'live-class' as ContentType, title: 'Interactive DOM Events Workshop', duration: '120 min', status: 'in-progress' as const, classStatus: 'ongoing' as const },
      {
        id: '3',
        type: 'live-class' as ContentType,
        title: 'Advanced Event Handling',
        duration: '90 min',
        status: 'not-started' as const,
        classStatus: 'completed' as const,
        recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        recordingPlatform: 'youtube' as const
      },
      { id: '4', type: 'video' as ContentType, title: 'Advanced DOM Manipulation Techniques', duration: '90 min', status: 'completed' as const },
      { id: '5', type: 'video' as ContentType, title: 'Visualizing the DOM tree', duration: '15 min', status: 'not-started' as const },
      { id: '6', type: 'article' as ContentType, title: 'Understanding Nodes in the DOM', duration: '5 mins read', status: 'not-started' as const },
      { id: '7', type: 'assignment' as ContentType, title: 'DOM Selection Practice', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '8', type: 'quiz' as ContentType, title: 'DOM Fundamentals Quiz', duration: '5 questions', status: 'not-started' as const },
      { id: '9', type: 'feedback-form' as ContentType, title: 'Module 2 Feedback', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '10', type: 'coding-problem' as ContentType, title: 'Array Manipulation Challenge', duration: 'Practice problem', status: 'not-started' as const },
      { id: '11', type: 'assessment' as ContentType, title: 'Module 2 Assessment', duration: '30 questions', status: 'not-started' as const }
    ]
  };

  const [selectedItem, setSelectedItem] = useState<ContentDisplayItem | null>(moduleData.contentItems[2] || null);
  const [showAddContent, setShowAddContent] = useState(false);
  const [contentItems, setContentItems] = useState<ContentDisplayItem[]>(moduleData.contentItems);
  const [newContentItems, setNewContentItems] = useState<Set<string>>(new Set()); // Track new items
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ContentDisplayItem | null>(null);
  const [deleteFromSystem, setDeleteFromSystem] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const contentListRef = useRef<HTMLDivElement>(null);

  // Helper functions for content ownership and permissions
  const isAdminContent = (item: ContentDisplayItem) => {
    // If no createdBy field, assume it's admin content (existing items before this feature)
    if (!item.createdBy) return true;
    // Check if createdBy is different from current user
    return currentUser && item.createdBy !== currentUser.email;
  };

  const canEditContent = (item: ContentDisplayItem) => {
    if (!isInstructor()) return true; // Admins can edit everything
    return !isAdminContent(item); // Instructors can only edit their own content
  };

  const canDragItem = (item: ContentDisplayItem) => {
    if (!isInstructor()) return true; // Admins can reorder everything
    return !isAdminContent(item); // Instructors can only drag their own items
  };

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

  const allContentTypes = [
    { type: 'live-class', label: 'Live Class', icon: <Video className="h-4 w-4" />, adminOnly: true },
    { type: 'video', label: 'Video', icon: <Video className="h-4 w-4" />, adminOnly: false },
    { type: 'article', label: 'Article', icon: <FileText className="h-4 w-4" />, adminOnly: false },
    { type: 'assignment', label: 'Assignment', icon: <ClipboardCheck className="h-4 w-4" />, adminOnly: false },
    { type: 'coding-problem', label: 'Coding Problem', icon: <Code className="h-4 w-4" />, adminOnly: false },
    { type: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-4 w-4" />, adminOnly: false },
    { type: 'feedback-form', label: 'Feedback Form', icon: <MessageSquare className="h-4 w-4" />, adminOnly: false },
    { type: 'assessment', label: 'Assessment', icon: <GraduationCap className="h-4 w-4" />, adminOnly: true }
  ];

  // Filter content types based on role
  const contentTypes = isInstructor()
    ? allContentTypes.filter(ct => !ct.adminOnly)
    : allContentTypes;

  const handleAddContentType = (type: string) => {
    console.log('Adding content type:', type);

    // Create new content item with "Untitled {content type}" name
    const contentTypeLabel = getContentTypeLabel(type as ContentType);
    const newItemId = `new-${Date.now()}`;
    const newItem: ContentDisplayItem = {
      id: newItemId,
      type: type as ContentType,
      title: `Untitled ${contentTypeLabel}`,
      status: 'not-started',
      createdBy: currentUser?.email // Track who created this content
    };

    // Add to the end of content items
    const updatedItems = [...contentItems, newItem];
    setContentItems(updatedItems);

    // Track this as a new item
    setNewContentItems(prev => new Set(prev).add(newItemId));

    // Set as selected and in focus
    setSelectedItem(newItem);

    // Close the add content menu
    setShowAddContent(false);

    // Scroll to show the new items
    setTimeout(() => {
      if (contentListRef.current) {
        contentListRef.current.scrollTop = contentListRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleRemoveNewItem = (itemId: string) => {
    // Remove from content items
    setContentItems(prev => prev.filter(item => item.id !== itemId));
    // Remove from new items tracking
    setNewContentItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    // If this was the selected item, clear selection
    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  // Handle delete content item
  const handleDeleteClick = (item: ContentDisplayItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // Handle system deletion for live classes
      if (itemToDelete.type === 'live-class' && deleteFromSystem) {
        console.log(`Deleting live class "${itemToDelete.title}" from system completely`);
        // API call to delete from system would go here
      }

      handleRemoveNewItem(itemToDelete.id);
      setItemToDelete(null);
      setDeleteFromSystem(false); // Reset flag
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: ContentDisplayItem, index: number) => {
    if (!canDragItem(item)) {
      e.preventDefault();
      return;
    }
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex !== null) {
      setDropTargetIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDropTargetIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) {
      setDraggedItemIndex(null);
      setDropTargetIndex(null);
      return;
    }

    const newItems = [...contentItems];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);

    setContentItems(newItems);
    setDraggedItemIndex(null);
    setDropTargetIndex(null);
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
          duration: 90,
          classStatus: item.classStatus,
          mode: 'new' as const,
          meetingPlatform: 'zoom' as const,
          recordingUrl: item.recordingUrl,
          recordingPlatform: item.recordingPlatform
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
          questions: [
            {
              id: 'q1',
              questionText: 'How would you rate the overall quality of Module 2: DOM Manipulation & Events?',
              questionType: 'rating' as const,
              required: true,
              ratingScale: {
                min: 1,
                max: 10,
                minLabel: 'Poor',
                midLabel: 'Average',
                maxLabel: 'Excellent'
              }
            },
            {
              id: 'q2',
              questionText: 'How well did the module content help you understand DOM manipulation concepts?',
              questionType: 'rating' as const,
              required: true,
              ratingScale: {
                min: 1,
                max: 10,
                minLabel: 'Not at all',
                midLabel: 'Somewhat',
                maxLabel: 'Very well'
              }
            },
            {
              id: 'q3',
              questionText: 'Which topics did you find most valuable? (Select all that apply)',
              questionType: 'multiple-choice' as const,
              required: true,
              options: [
                'DOM Fundamentals and Element Selection',
                'Event Handling and Listeners',
                'DOM Traversal and Manipulation',
                'Event Bubbling and Delegation',
                'Practical Exercises and Coding Challenges'
              ]
            },
            {
              id: 'q4',
              questionText: 'What was the pace of the module for you?',
              questionType: 'single-choice' as const,
              required: true,
              options: [
                'Too slow',
                'Just right',
                'Too fast',
                'Inconsistent'
              ]
            },
            {
              id: 'q5',
              questionText: 'How confident do you feel applying DOM manipulation in real projects?',
              questionType: 'rating' as const,
              required: true,
              ratingScale: {
                min: 1,
                max: 10,
                minLabel: 'Not confident',
                midLabel: 'Moderately confident',
                maxLabel: 'Very confident'
              }
            },
            {
              id: 'q6',
              questionText: 'What did you like most about this module?',
              questionType: 'long-text' as const,
              required: false
            },
            {
              id: 'q7',
              questionText: 'What could be improved in this module?',
              questionType: 'long-text' as const,
              required: false
            },
            {
              id: 'q8',
              questionText: 'Would you recommend this module to other learners?',
              questionType: 'single-choice' as const,
              required: true,
              options: [
                'Definitely yes',
                'Probably yes',
                'Not sure',
                'Probably not',
                'Definitely not'
              ]
            }
          ]
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
        return {
          ...baseData,
          type: 'assessment' as const,
          questionIds: [],
          codingProblemIds: [],
          topics: []
        };
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

      // If this was a new item, remove it from new items tracking since it's now saved
      if (newContentItems.has(selectedItem.id)) {
        setNewContentItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(selectedItem.id);
          return newSet;
        });
      }
    }
  };

  // Handle editor cancel with unsaved changes check
  const handleEditorCancel = () => {
    if (selectedItem && newContentItems.has(selectedItem.id)) {
      // For new items, remove entirely when cancelling
      handleRemoveNewItem(selectedItem.id);
    }
    console.log('Editor cancelled');
  };

  const renderContentEditor = () => {
    if (!selectedItem) {
      return (
        <div className="flex-1 flex items-center justify-center h-[100vh]">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-body1 font-medium mb-2">Start by choosing a content item</h3>
            <p className="text-muted-foreground">Select a content item from the sidebar to start editing</p>
          </div>
        </div>
      );
    }

    // Get the proper data format for the editor
    const editorData = getEditorData(selectedItem);
    const editorMode = canEditContent(selectedItem) ? "edit" : "view";

    // Render the appropriate editor component based on content type
    switch (selectedItem.type) {
      case 'live-class':
        return (
          <LiveClassEditor
            key={selectedItem.id}
            initialData={editorData as LiveClassData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'video':
        return (
          <VideoEditor
            key={selectedItem.id}
            initialData={editorData as VideoData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'article':
        return (
          <ArticleEditor
            key={selectedItem.id}
            initialData={editorData as ArticleData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'assignment':
        return (
          <AssignmentEditor
            key={selectedItem.id}
            initialData={editorData as AssignmentData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'quiz':
        return (
          <QuizEditor
            key={selectedItem.id}
            initialData={editorData as QuizData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'feedback-form':
        return (
          <FeedbackFormEditor
            key={selectedItem.id}
            initialData={editorData as FeedbackFormData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'coding-problem':
        return (
          <CodingProblemEditor
            key={selectedItem.id}
            initialData={editorData as CodingProblemData}
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      case 'assessment':
        return (
          <AssessmentEditor
            key={selectedItem.id}
            initialData={editorData as any} // AssessmentData type
            mode={editorMode as 'create' | 'edit'}
            onSave={handleEditorSave}
            onCancel={handleEditorCancel}
          />
        );

      default:
        return (
          <div className="flex-1 flex items-center justify-center h-[100vh]">
            <div className="text-center">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-body1 font-medium mb-2">Editor not available</h3>
              <p className="text-muted-foreground">This content type doesn't have an editor yet</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 flex bg-background overflow-hidden">
      {/* Left Sidebar - 25% width */}
      <div className="w-1/4 border-r bg-card flex flex-col h-full overflow-hidden">
        {/* Header - Fixed */}
        <div className="p-4 border-b shrink-0">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}?tab=curriculum`)}
            className="mb-4 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div className="mb-3">
            <h2 className="font-semibold text-body1 mb-1">Module Content</h2>
            <h3 className="text-body2 text-muted-foreground">{moduleData.title}</h3>
          </div>

          {/* Add Content Button - Fixed at Top */}
          <Button
            onClick={() => setShowAddContent(!showAddContent)}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>

          {/* Add Content Menu - Appears below button */}
          {showAddContent && (
            <div className="mt-2 p-2 border rounded-lg bg-card">
              <div className="grid grid-cols-2 gap-2">
                {contentTypes.map((contentType) => (
                  <Button
                    key={contentType.type}
                    variant="ghost"
                    onClick={() => handleAddContentType(contentType.type)}
                    className="h-auto py-2 px-3 justify-start text-left"
                  >
                    <div className="mr-2">{contentType.icon}</div>
                    <span className="text-body2">{contentType.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content Items List - Scrollable */}
        <div className="flex-1 overflow-y-auto" ref={contentListRef}>
          {contentItems.length === 0 ? (
            <div className="p-4">
              <p className="text-body2 text-muted-foreground text-center">No content items yet. Click "Add Content" above to get started.</p>
            </div>
          ) : (
            <div className="p-2">
              {contentItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={cn(
                    "p-3 mb-2 rounded-lg cursor-pointer border transition-colors relative group",
                    selectedItem?.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-primary-light border-transparent",
                    draggedItemIndex === index && "opacity-40",
                    dropTargetIndex === index && "border-primary border-2"
                  )}
                >
                  <div className="flex items-start gap-2">
                    {/* Drag Handle - Only show for draggable items */}
                    {canDragItem(item) && (
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, index)}
                        onDragEnd={handleDragEnd}
                        className="mt-0.5 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GripVertical className="h-4 w-4" />
                      </div>
                    )}
                    <div className="mt-0.5 text-muted-foreground">
                      {getContentIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-body2 leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-body2 text-muted-foreground mb-1 flex items-center gap-1 flex-wrap" style={{ fontSize: '0.875rem' }}>
                        <span>{getContentTypeLabel(item.type)}</span>
                        {item.duration && (
                          <>
                            <span>•</span>
                            <span>{item.duration}</span>
                          </>
                        )}
                        {/* Added by Instructor badge for admin view */}
                        {!isInstructor() && item.createdBy && item.createdBy !== currentUser?.email && (
                          <>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 px-1.5 py-0">
                              Added by Instructor
                            </Badge>
                          </>
                        )}
                      </p>
                    </div>
                    {/* Delete Button - Shows on Hover only for editable content */}
                    {hoveredItemId === item.id && canEditContent(item) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeleteClick(item, e)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area - 75% width */}
      <div className="w-3/4 flex flex-col h-full overflow-hidden">
        {renderContentEditor()}
      </div>

      {/* Delete Content Modal */}
      <DeleteContentModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeleteFromSystem(false); // Reset on close
        }}
        onConfirm={handleConfirmDelete}
        contentTitle={itemToDelete?.title || ''}
        contentType={itemToDelete ? getContentTypeLabel(itemToDelete.type) : ''}
        isLiveClass={itemToDelete?.type === 'live-class'}
        deleteFromSystem={deleteFromSystem}
        onDeleteFromSystemChange={setDeleteFromSystem}
      />
    </div>
  );
};

export default ModulePage;