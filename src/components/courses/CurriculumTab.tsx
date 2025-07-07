
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddItemMenu from './AddItemMenu';
import ModuleCard from './curriculum/ModuleCard';
import ProjectCard from './curriculum/ProjectCard';
import AddModuleForm from './curriculum/AddModuleForm';
import { ContentItem, NewModuleData } from './curriculum/types';

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
        { id: '1', type: 'reading', title: 'What is Web Development?', duration: '15 min read' },
        { id: '2', type: 'video', title: 'HTML Basics', duration: '45 min' },
        { id: '3', type: 'assignment', title: 'Create Your First Webpage', duration: '2 hours' },
        { id: '4', type: 'quiz', title: 'HTML Knowledge Check', duration: '10 min' }
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading font-semibold text-2xl">Course Curriculum</h2>
      </div>

      <div className="space-y-4">
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

      {showAddModuleForm && (
        <AddModuleForm
          newModuleData={newModuleData}
          onDataChange={setNewModuleData}
          onSubmit={handleAddModule}
          onCancel={() => setShowAddModuleForm(false)}
        />
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setShowAddModuleForm(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Module/Project
      </Button>

      <AddItemMenu 
        isOpen={isAddMenuOpen} 
        onClose={() => setIsAddMenuOpen(false)}
        courseId={courseId}
      />
    </div>
  );
};

export default CurriculumTab;
