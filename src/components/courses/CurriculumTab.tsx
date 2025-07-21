
import { useState } from 'react';
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

import { v4 as uuidv4 } from 'uuid';

// Helper function to convert ContentBankItemType to LearningItemType
const convertItemType = (type: ContentBankItemType): LearningItemType => {
  // Map the ContentBankItemType to LearningItemType
  const typeMap: Record<ContentBankItemType, LearningItemType> = {
    'article': 'article',
    'video': 'video',
    'quiz': 'quiz',
    'assignment': 'assignment',
    'coding': 'coding',
    'liveClass': 'live-class',
    'feedback': 'feedback',
    'assessment': 'assessment'
  };
  
  return typeMap[type];
};



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

  // Focus Panel and Editor States
  const [focusPanelOpen, setFocusPanelOpen] = useState(false);
  const [activeEditor, setActiveEditor] = useState<LearningItemType | null>(null);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

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
          <h2 className="font-heading font-semibold text-2xl">Course Curriculum</h2>
        </div>

        <div className="space-y-6">
          {contentItems.map((item, index) => (
            item.type === 'module' ? (
              <ModuleCard
                key={item.id}
                item={item}
                index={index}
                onToggle={toggleModule}
                onDelete={deleteContentItem}
                onDeleteLearningItem={deleteContentItem}
                onToggleAddContent={toggleAddContent}
                getContentIndex={getContentIndex}
                onAddItem={(type) => handleAddLearningItem(item.id, type as LearningItemType)}
                onEditItem={(itemId, type) => handleEditLearningItem(item.id, itemId, type)}
                
              />
            ) : (
              <ProjectCard
                key={item.id}
                item={item}
                index={index}
                onDelete={deleteContentItem}
                getContentIndex={getContentIndex}
                getDifficultyColor={getDifficultyColor}
              />
            )
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-6"
          onClick={() => setShowAddModuleForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Module/Project
        </Button>

        {showAddModuleForm && (
          <div className="mt-6">
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
        className="w-1/2 min-w-[40%]"
      >
        {renderEditor()}
      </FocusPanel>
    </div>
  );
};

export default CurriculumTab;
