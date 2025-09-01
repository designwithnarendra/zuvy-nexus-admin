
'use client'

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddItemMenu from './AddItemMenu';
import ModuleCard from './curriculum/ModuleCard';
import ProjectCard from './curriculum/ProjectCard';
import AddModuleForm from './curriculum/AddModuleForm';
import { ContentItem, NewModuleData, LearningItem } from './curriculum/types';
import { FocusPanel } from '@/components/ui/focus-panel';
import { LearningItemType } from '@/components/ui/learning-item-card';
import { ArticleEditor } from '@/components/courses/learning-item-editors/ArticleEditor';
import { VideoEditor } from '@/components/courses/learning-item-editors/VideoEditor';
import { QuizEditor } from '@/components/courses/learning-item-editors/QuizEditor';
import { AssignmentEditor } from '@/components/courses/learning-item-editors/AssignmentEditor';
import { CodingProblemEditor } from '@/components/courses/learning-item-editors/CodingProblemEditor';
import { LiveClassEditor } from '@/components/courses/learning-item-editors/LiveClassEditor';
import { FeedbackFormEditor } from '@/components/courses/learning-item-editors/FeedbackFormEditor';
import { AssessmentEditor } from '@/components/courses/learning-item-editors/AssessmentEditor';
import { cn } from '@/lib/utils';

import { v4 as uuidv4 } from 'uuid';




// Mock data for editor initialization
const mockEditorData = {
  article: {
    title: '',
    content: '',
    contentType: 'rich-text' as const,
    estimatedReadTime: 5
  },
  video: {
    title: '',
    description: '',
    sourceType: 'youtube' as const,
    url: '',
    duration: 0
  },
  quiz: {
    title: '',
    description: '',
    questions: [],
    timeLimit: 10,
    randomizeQuestions: false
  },
  assignment: {
    title: '',
    instructions: '',
    allowedSubmissionTypes: ['file', 'text'] as ('file' | 'text')[],
    dueDate: undefined
  },
  coding: {
    title: '',
    description: '',
    problemStatement: '',
    testCases: [],
    allowedLanguages: ['JavaScript', 'Python'],
    starterCode: '// Your code here'
  },
  'live-class': {
    title: '',
    description: '',
    startDate: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    hostName: '',
    hostEmail: ''
  },
  feedback: {
    title: '',
    questions: []
  },
  assessment: {
    title: '',
    description: '',
    selectedQuestions: [],
    questionDistribution: [],
    sectionWeightage: [],
    timeLimit: 60,
    passingScore: 70,
    proctoring: {
      disableCopyPaste: false,
      trackTabChange: false
    }
  }
};

interface CurriculumTabProps {
  courseId: string;
}

const CurriculumTab = ({ courseId }: CurriculumTabProps) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'module',
      title: 'Introduction to Web Development',
      description: 'Fundamentals of HTML, CSS, and JavaScript',
      isExpanded: true,
      showAddContent: false,
      items: [
        { id: '1', type: 'reading', title: 'Introduction to HTML', duration: '15 min read' },
        { id: '2', type: 'video', title: 'HTML Basics Tutorial', duration: '45 min' },
        { id: '3', type: 'quiz', title: 'HTML Knowledge Check', duration: '10 min' },
        { id: '4', type: 'assignment', title: 'Create Your First Webpage', duration: 'Due: March 15' },
        { id: '5', type: 'coding', title: 'HTML Form Validation', duration: '90 min' },
        { id: '6', type: 'video', title: 'Live Class: Q&A Session', duration: '60 min' },
        { id: '7', type: 'assignment', title: 'Feedback on Course Structure', duration: '5 min' },
        { id: '8', type: 'quiz', title: 'Final Assessment', duration: '120 min' }
      ]
    },
    {
      id: '2',
      type: 'module',
      title: 'Advanced JavaScript',
      description: 'Deep dive into ES6+, async programming, and modern JavaScript',
      isExpanded: false,
      showAddContent: false,
      items: Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 5}`,
        type: 'reading' as const,
        title: `JavaScript Topic ${i + 1}`,
        duration: '20 min read'
      }))
    },
    {
      id: '3',
      type: 'project',
      title: 'Portfolio Website',
      description: 'Build a responsive personal portfolio using HTML, CSS, and JavaScript',
      duration: '1 week',
      difficulty: 'Easy' as const
    },
    {
      id: '4',
      type: 'module',
      title: 'React Fundamentals',
      description: 'Learn React components, state management, and hooks',
      isExpanded: false,
      showAddContent: false,
      items: [
        { id: '20', type: 'video', title: 'Introduction to React', duration: '60 min' },
        { id: '21', type: 'reading', title: 'Components and Props', duration: '30 min read' },
        { id: '22', type: 'coding', title: 'Build Your First Component', duration: '90 min' }
      ]
    },
    {
      id: '5',
      type: 'project',
      title: 'E-commerce Application',
      description: 'Full-stack e-commerce app with React, Node.js, and MongoDB',
      duration: '3 weeks',
      difficulty: 'Hard' as const
    }
  ]);

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const [newModuleData, setNewModuleData] = useState<NewModuleData>({
    type: 'module',
    title: '',
    description: '',
    months: 0,
    weeks: 0,
    days: 0
  });
  
  // Refs for auto-scroll functionality
  const addModuleFormRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll handler for Add Module/Project
  const handleShowAddModuleForm = () => {
    setShowAddModuleForm(true);
    // Scroll to form after it's rendered
    setTimeout(() => {
      addModuleFormRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };
  
  // Edit handlers for Module and Project
  const handleEditModule = (moduleId: string) => {
    console.log('Editing module:', moduleId);
    // For simulation, just show an alert
    alert(`Edit Module functionality enabled for Module 1: Introduction to Web Development (ID: ${moduleId})`);
  };
  
  const handleEditProject = (projectId: string) => {
    console.log('Editing project:', projectId);
    // For simulation, just show an alert  
    alert(`Edit Project functionality enabled for Project 1: Portfolio Website (ID: ${projectId})`);
  };

  // Focus Panel and Editor States
  const [focusPanelOpen, setFocusPanelOpen] = useState(false);
  const [activeEditor, setActiveEditor] = useState<LearningItemType | null>(null);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

  // Drag and Drop States
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Persistence function for curriculum order
  const saveCurriculumOrder = async (items: ContentItem[]) => {
    try {
      // In a real implementation, this would make an API call to save the order
      console.log('Saving curriculum order:', items.map(item => ({ id: item.id, type: item.type, title: item.title })));
      
      // Example API call structure:
      // await fetch(`/api/courses/${courseId}/curriculum/order`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: items.map(item => ({ id: item.id, order: items.indexOf(item) })) })
      // });
      
      // For now, we'll just store in localStorage as a demo
      localStorage.setItem(`curriculum-order-${courseId}`, JSON.stringify(items.map(item => item.id)));
    } catch (error) {
      console.error('Failed to save curriculum order:', error);
      // In a real app, you might want to show a toast notification about the error
    }
  };

  // Persistence function for learning item order within modules
  const saveLearningItemOrder = async (moduleId: string, learningItems: LearningItem[]) => {
    try {
      // In a real implementation, this would make an API call to save the learning item order
      console.log('Saving learning item order for module:', moduleId, learningItems.map(item => ({ id: item.id, title: item.title })));
      
      // Example API call structure:
      // await fetch(`/api/courses/${courseId}/modules/${moduleId}/learning-items/order`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ items: learningItems.map(item => ({ id: item.id, order: learningItems.indexOf(item) })) })
      // });
      
      // For now, we'll just store in localStorage as a demo
      localStorage.setItem(`learning-items-order-${courseId}-${moduleId}`, JSON.stringify(learningItems.map(item => item.id)));
    } catch (error) {
      console.error('Failed to save learning item order:', error);
      // In a real app, you might want to show a toast notification about the error
    }
  };

  // Load saved curriculum order on component mount
  useEffect(() => {
    const loadSavedOrder = () => {
      try {
        const savedOrder = localStorage.getItem(`curriculum-order-${courseId}`);
        if (savedOrder) {
          const orderIds = JSON.parse(savedOrder);
          // Reorder contentItems based on saved order
          const reorderedItems = orderIds
            .map((id: string) => contentItems.find(item => item.id === id))
            .filter(Boolean);
          
          // Add any new items that weren't in the saved order
          const newItems = contentItems.filter(item => !orderIds.includes(item.id));
          setContentItems([...reorderedItems, ...newItems]);
        }
        
        // Load saved learning item orders for each module
        contentItems.forEach(item => {
          if (item.type === 'module' && item.items) {
            const savedLearningOrder = localStorage.getItem(`learning-items-order-${courseId}-${item.id}`);
            if (savedLearningOrder) {
              const learningOrderIds = JSON.parse(savedLearningOrder);
              const reorderedLearningItems = learningOrderIds
                .map((id: string) => item.items?.find(learningItem => learningItem.id === id))
                .filter(Boolean);
              
              // Add any new learning items that weren't in the saved order
              const newLearningItems = item.items.filter(learningItem => !learningOrderIds.includes(learningItem.id));
              
              // Update the module with reordered learning items
              setContentItems(prev => prev.map(contentItem => 
                contentItem.id === item.id
                  ? { ...contentItem, items: [...reorderedLearningItems, ...newLearningItems] }
                  : contentItem
              ));
            }
          }
        });
      } catch (error) {
        console.error('Failed to load saved curriculum order:', error);
      }
    };

    if (contentItems.length > 0) {
      loadSavedOrder();
    }
  }, [courseId]); // Only run when courseId changes

  // Keyboard support for reordering
  const handleKeyDown = (e: React.KeyboardEvent, itemId: string, index: number) => {
    if (e.key === 'ArrowUp' && e.altKey && index > 0) {
      e.preventDefault();
      const newItems = [...contentItems];
      const [item] = newItems.splice(index, 1);
      newItems.splice(index - 1, 0, item);
      setContentItems(newItems);
      saveCurriculumOrder(newItems);
    } else if (e.key === 'ArrowDown' && e.altKey && index < contentItems.length - 1) {
      e.preventDefault();
      const newItems = [...contentItems];
      const [item] = newItems.splice(index, 1);
      newItems.splice(index + 1, 0, item);
      setContentItems(newItems);
      saveCurriculumOrder(newItems);
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, itemId: string, index: number) => {
    setDraggedItemId(itemId);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId);
    
    // Set drag image to be slightly transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverIndex(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (!draggedItemId) return;
    
    const draggedIndex = contentItems.findIndex(item => item.id === draggedItemId);
    if (draggedIndex === -1 || draggedIndex === index) return;
    
    // Get the mouse position relative to the element
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const midpoint = rect.height / 2;
    
    // Determine if we're in the top or bottom half
    let targetIndex = index;
    if (draggedIndex > index) {
      // Dragging up - insert before if in top half, after if in bottom half
      targetIndex = y < midpoint ? index : index + 1;
    } else {
      // Dragging down - insert before if in top half, after if in bottom half  
      targetIndex = y < midpoint ? index - 1 : index;
    }
    
    if (targetIndex !== dragOverIndex && targetIndex >= 0 && targetIndex <= contentItems.length) {
      setDragOverIndex(targetIndex);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear drag over if we're leaving the drop container entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItemId || dragOverIndex === null) return;
    
    const draggedIndex = contentItems.findIndex(item => item.id === draggedItemId);
    if (draggedIndex === -1) return;
    
    // Use the dragOverIndex for more precise positioning
    let targetIndex = dragOverIndex;
    
    // Adjust for the removal of the dragged item
    if (targetIndex > draggedIndex) {
      targetIndex--;
    }
    
    if (targetIndex === draggedIndex) return;
    
    // Create new array with reordered items
    const newItems = [...contentItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setContentItems(newItems);
    setDragOverIndex(null);
    
    // Persist the new order (in a real app, this would make an API call)
    saveCurriculumOrder(newItems);
  };

  const toggleModule = (itemId: string) => {
    setContentItems(prev => prev.map(item => 
      item.id === itemId && item.type === 'module'
        ? { ...item, isExpanded: !item.isExpanded }
        : item
    ));
  };

  const toggleAddContent = (itemId: string) => {
    setContentItems(prev => prev.map(item => 
      item.id === itemId && item.type === 'module'
        ? { ...item, showAddContent: !item.showAddContent }
        : item
    ));
  };

  const deleteContentItem = (itemId: string, learningItemId?: string) => {
    if (learningItemId) {
      setContentItems(prev => prev.map(item => 
        item.id === itemId && item.type === 'module'
          ? { ...item, items: item.items?.filter(learningItem => learningItem.id !== learningItemId) }
          : item
      ));
    } else {
      setContentItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  // Handle reordering learning items within a module
  const handleReorderLearningItems = (moduleId: string, reorderedItems: LearningItem[]) => {
    setContentItems(prev => prev.map(item => 
      item.id === moduleId && item.type === 'module'
        ? { ...item, items: reorderedItems }
        : item
    ));
    
    // Persist the new learning item order
    saveLearningItemOrder(moduleId, reorderedItems);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-light text-success-dark border-success';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Hard': return 'bg-destructive-light text-destructive-dark border-destructive';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getContentIndex = (index: number) => {
    const moduleCount = contentItems.slice(0, index + 1).filter(item => item.type === 'module').length;
    const projectCount = contentItems.slice(0, index + 1).filter(item => item.type === 'project').length;
    
    if (contentItems[index].type === 'module') {
      return `Module ${moduleCount}`;
    } else {
      return `Project ${projectCount}`;
    }
  };

  const handleAddModule = () => {
    const duration = `${newModuleData.months ? `${newModuleData.months} months` : ''} ${newModuleData.weeks ? `${newModuleData.weeks} weeks` : ''} ${newModuleData.days ? `${newModuleData.days} days` : ''}`.trim();
    
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: newModuleData.type,
      title: newModuleData.title,
      description: newModuleData.description,
      ...(newModuleData.type === 'module' ? {
        isExpanded: false,
        showAddContent: false,
        items: []
      } : {
        duration,
        difficulty: 'Easy' as const
      })
    };

    setContentItems(prev => [...prev, newItem]);
    setNewModuleData({
      type: 'module',
      title: '',
      description: '',
      months: 0,
      weeks: 0,
      days: 0
    });
    setShowAddModuleForm(false);
  };

  // Editor Handlers
  const handleOpenEditor = (type: LearningItemType, moduleId: string, mode: 'create' | 'edit' = 'create', itemId?: string) => {
    setActiveEditor(type);
    setEditorMode(mode);
    setCurrentModuleId(moduleId);
    if (itemId) setEditingItemId(itemId);
    setFocusPanelOpen(true);
  };

  const handleCloseEditor = () => {
    setFocusPanelOpen(false);
    setActiveEditor(null);
    setEditingItemId(null);
    setCurrentModuleId(null);
  };

  const handleSaveLearningItem = (data: any) => {
    if (!activeEditor) return;

    if (editorMode === 'create' && currentModuleId) {
      // Create new learning item
      const newLearningItem: LearningItem = {
        id: Date.now().toString(),
        type: mapEditorTypeToItemType(activeEditor),
        title: data.title,
        duration: getItemDuration(data, activeEditor)
      };

      setContentItems(prev => prev.map(item => 
        item.id === currentModuleId && item.type === 'module'
          ? { ...item, items: [...(item.items || []), newLearningItem] }
          : item
      ));
    } else if (editorMode === 'edit' && editingItemId && currentModuleId) {
      // Update existing learning item
      setContentItems(prev => prev.map(item => 
        item.id === currentModuleId && item.type === 'module'
          ? {
              ...item,
              items: item.items?.map(learningItem => 
                learningItem.id === editingItemId
                  ? {
                      ...learningItem,
                      title: data.title,
                      duration: getItemDuration(data, activeEditor)
                    }
                  : learningItem
              )
            }
          : item
      ));
    }

    handleCloseEditor();
  };

  // Helper functions
  const mapEditorTypeToItemType = (editorType: LearningItemType): LearningItem['type'] => {
    const typeMap: Record<LearningItemType, LearningItem['type']> = {
      'article': 'reading',
      'video': 'video',
      'quiz': 'quiz',
      'assignment': 'assignment',
      'coding': 'coding',
      'live-class': 'video',
      'feedback': 'quiz',
      'assessment': 'quiz'
    };
    return typeMap[editorType];
  };

  const getItemDuration = (data: any, type: LearningItemType): string => {
    switch (type) {
      case 'article':
        return `${data.estimatedReadTime || 5} min read`;
      case 'video':
        const minutes = Math.floor((data.duration || 0) / 60);
        return `${minutes} min`;
      case 'quiz':
        return `${data.timeLimit || 10} min`;
      case 'assignment':
        return '2 hours';
      case 'coding':
        return '1 hour';
      case 'live-class':
        return '1 hour';
      case 'feedback':
        return '10 min';
      case 'assessment':
        return `${data.timeLimit || 60} min`;
      default:
        return '30 min';
    }
  };

  

  // Format item type for display
  const formatItemType = (type: LearningItemType): string => {
    switch (type) {
      case 'article':
        return 'Article';
      case 'video':
        return 'Video';
      case 'quiz':
        return 'Quiz';
      case 'assignment':
        return 'Assignment';
      case 'coding':
        return 'Coding Problem';
      case 'live-class':
        return 'Live Class';
      case 'feedback':
        return 'Feedback Form';
      case 'assessment':
        return 'Assessment';
      default:
        return 'Item';
    }
  };

  // Find a learning item by its ID
  const findLearningItem = (itemId: string): { item: LearningItem | null, moduleId: string | null } => {
    for (const contentItem of contentItems) {
      if (contentItem.type === 'module' && contentItem.items) {
        const learningItem = contentItem.items.find(item => item.id === itemId);
        if (learningItem) {
          return { item: learningItem, moduleId: contentItem.id };
        }
      }
    }
    return { item: null, moduleId: null };
  };

  // Get mock data for editing an existing learning item
  const getEditingData = (itemId: string | null, type: LearningItemType): any => {
    if (!itemId) return mockEditorData[type];
    
    const { item } = findLearningItem(itemId);
    if (!item) return mockEditorData[type];
    
    // For now, just return a basic object with the title
    // In a real implementation, we would fetch the full item data
    return {
      ...mockEditorData[type],
      title: item.title
    };
  };

  const renderEditor = () => {
    // Render the appropriate editor based on activeEditor type
    if (!activeEditor) return null;
    
    const editorData = editorMode === 'edit' && editingItemId 
      ? getEditingData(editingItemId, activeEditor)
      : mockEditorData[activeEditor];
    
    switch (activeEditor) {
      case 'article':
        return (
          <ArticleEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
            hideCancel={true}
          />
        );
      case 'video':
        return (
          <VideoEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'quiz':
        return (
          <QuizEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'assignment':
        return (
          <AssignmentEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'coding':
        return (
          <CodingProblemEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'live-class':
        return (
          <LiveClassEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'feedback':
        return (
          <FeedbackFormEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      case 'assessment':
        return (
          <AssessmentEditor
            mode={editorMode}
            initialData={editorData}
            onSave={handleSaveLearningItem}
            onCancel={handleCloseEditor}
          />
        );
      default:
        return null;
    }
  };

  // Function to handle adding a learning item to a module
  const handleAddLearningItem = (moduleId: string, type: LearningItemType) => {
    handleOpenEditor(type, moduleId, 'create');
  };

  // Function to handle editing a learning item
  const handleEditLearningItem = (moduleId: string, itemId: string, type: string) => {
    // Map the item type to editor type
    const editorType = mapItemTypeToEditorType(type);
    if (editorType) {
      handleOpenEditor(editorType, moduleId, 'edit', itemId);
    }
  };

  // Helper function to map item type to editor type
  const mapItemTypeToEditorType = (itemType: string): LearningItemType | null => {
    switch (itemType) {
      case 'reading': return 'article';
      case 'video': return 'video';
      case 'quiz': return 'quiz';
      case 'assignment': return 'assignment';
      case 'coding': return 'coding';
      default: return null;
    }
  };

  // Helper function to map LearningItemType to ContentItem's LearningItem type
  const mapToContentItemType = (type: LearningItemType): 'reading' | 'video' | 'assignment' | 'quiz' | 'coding' => {
    const typeMap: Record<LearningItemType, 'reading' | 'video' | 'assignment' | 'quiz' | 'coding'> = {
      'article': 'reading',
      'video': 'video',
      'quiz': 'quiz',
      'assignment': 'assignment',
      'coding': 'coding',
      'assessment': 'quiz', // Map to closest equivalent
      'feedback': 'assignment', // Map to closest equivalent
      'live-class': 'video' // Map to closest equivalent
    };
    return typeMap[type];
  };

  

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 pr-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl">Course Curriculum</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Drag and drop or use Alt + Arrow keys to reorder modules and projects. Learning items can be reordered within their modules.
            </p>
          </div>
        </div>

        <div 
          className="space-y-6"
          role="list"
          aria-label="Course curriculum items. Use drag and drop or Alt + Arrow keys to reorder."
          onDragOver={(e) => {
            // Handle dropping at the very beginning
            e.preventDefault();
            if (draggedItemId && e.clientY < e.currentTarget.getBoundingClientRect().top + 50) {
              setDragOverIndex(0);
            }
          }}
        >
          {/* Drop indicator for very top */}
          {dragOverIndex === 0 && draggedItemId && contentItems.findIndex(item => item.id === draggedItemId) !== 0 && (
            <div className="h-1 bg-primary rounded-full shadow-lg mb-3" />
          )}
          
          {contentItems.map((item, index) => (
            <div key={item.id} className="relative">
              {/* Drop indicator above */}
              {dragOverIndex === index && draggedItemId && draggedItemId !== item.id && (
                <div className="absolute -top-3 left-0 right-0 h-1 bg-primary rounded-full z-10 shadow-lg" />
              )}
              
              <div
                draggable
                tabIndex={0}
                role="listitem"
                aria-label={`${item.type === 'module' ? 'Module' : 'Project'}: ${item.title}. Press Alt + Arrow keys to reorder, or drag to move.`}
                onDragStart={(e) => handleDragStart(e, item.id, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onKeyDown={(e) => handleKeyDown(e, item.id, index)}
                className={cn(
                  "relative transition-all duration-200 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg",
                  draggedItemId === item.id && "opacity-40 scale-95 rotate-2",
                  isDragging && "pointer-events-none"
                )}
              >
                {item.type === 'module' ? (
                  <ModuleCard
                    item={item}
                    index={index}
                    onToggle={toggleModule}
                    onDelete={deleteContentItem}
                    onDeleteLearningItem={deleteContentItem}
                    onToggleAddContent={toggleAddContent}
                    getContentIndex={getContentIndex}
                    onAddItem={(type) => handleAddLearningItem(item.id, type as LearningItemType)}
                    onEditItem={(itemId, type) => handleEditLearningItem(item.id, itemId, type)}
                    onReorderLearningItems={handleReorderLearningItems}
                    onEditModule={handleEditModule}
                    isDragging={draggedItemId === item.id}
                  />
                ) : (
                  <ProjectCard
                    item={item}
                    index={index}
                    onDelete={deleteContentItem}
                    getContentIndex={getContentIndex}
                    getDifficultyColor={getDifficultyColor}
                    onEditProject={handleEditProject}
                    isDragging={draggedItemId === item.id}
                  />
                )}
              </div>
              
              {/* Drop indicator below last item */}
              {index === contentItems.length - 1 && dragOverIndex === index + 1 && draggedItemId && (
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-primary rounded-full z-10 shadow-lg" />
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={handleShowAddModuleForm}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Module/Project
        </Button>

        {showAddModuleForm && (
          <div ref={addModuleFormRef} className="mt-6">
            <AddModuleForm
              newModuleData={newModuleData}
              onDataChange={setNewModuleData}
              onSubmit={handleAddModule}
              onCancel={() => setShowAddModuleForm(false)}
            />
          </div>
        )}
      </div>

      

      <AddItemMenu 
        isOpen={isAddMenuOpen} 
        onClose={() => setIsAddMenuOpen(false)}
        courseId={courseId}
      />

      {/* Focus Panel for editors */}
      <FocusPanel
        open={focusPanelOpen}
        onOpenChange={setFocusPanelOpen}
        title={activeEditor ? `${editorMode === 'create' ? 'Add' : 'Edit'} ${formatItemType(activeEditor)}` : ''}
        width="full"
        className={activeEditor === 'assessment' ? "w-3/5 min-w-[40%]" : "w-1/2 min-w-[40%]"}
      >
        {renderEditor()}
      </FocusPanel>
    </div>
  );
};

export default CurriculumTab;
