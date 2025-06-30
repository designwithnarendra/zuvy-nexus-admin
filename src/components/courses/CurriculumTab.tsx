
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, GripVertical, BookOpen, Code, FileText, Video, ClipboardCheck, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import AddItemMenu from './AddItemMenu';

interface CurriculumTabProps {
  courseId: string;
}

interface LearningItem {
  id: string;
  type: 'reading' | 'video' | 'assignment' | 'quiz' | 'coding';
  title: string;
  duration?: string;
  description?: string;
}

interface ContentItem {
  id: string;
  type: 'module' | 'project';
  title: string;
  description: string;
  items?: LearningItem[]; // Only for modules
  isExpanded?: boolean; // Only for modules
  duration?: string; // Only for projects
  difficulty?: 'Easy' | 'Medium' | 'Hard'; // Only for projects
}

const CurriculumTab = ({ courseId }: CurriculumTabProps) => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'module',
      title: 'Introduction to Web Development',
      description: 'Fundamentals of HTML, CSS, and JavaScript',
      isExpanded: true,
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

  const toggleModule = (itemId: string) => {
    setContentItems(prev => prev.map(item => 
      item.id === itemId && item.type === 'module'
        ? { ...item, isExpanded: !item.isExpanded }
        : item
    ));
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'reading': return FileText;
      case 'video': return Video;
      case 'assignment': return ClipboardCheck;
      case 'quiz': return ClipboardCheck;
      case 'coding': return Code;
      default: return BookOpen;
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Add Content Button */}
      <div className="flex justify-between items-center">
        <h2 className="font-heading font-semibold text-2xl">Course Curriculum</h2>
        <Button 
          onClick={() => setIsAddMenuOpen(true)}
          className="bg-primary hover:bg-primary-dark shadow-4dp"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {/* Content Items */}
      <div className="space-y-4">
        {contentItems.map((item, index) => (
          <Card key={item.id} className="shadow-4dp">
            {item.type === 'module' ? (
              <Collapsible open={item.isExpanded} onOpenChange={() => toggleModule(item.id)}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="cursor-grab text-muted-foreground hover:text-foreground">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <CollapsibleTrigger className="flex-1 flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                      <div className="text-left flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary-light text-primary">
                          <FolderOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-lg">
                            {getContentIndex(index)}: {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 transition-transform",
                        item.isExpanded && "rotate-180"
                      )} />
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {item.items?.slice(0, item.isExpanded ? (item.items.length > 10 ? 10 : item.items.length) : item.items.length).map((learningItem) => {
                        const IconComponent = getItemIcon(learningItem.type);
                        return (
                          <div key={learningItem.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card-light hover:bg-muted/50 transition-colors group">
                            <div className="cursor-grab text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-3 flex-1">
                              <div className="p-2 rounded-md bg-primary-light text-primary">
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{learningItem.title}</h4>
                                {learningItem.duration && (
                                  <p className="text-xs text-muted-foreground">{learningItem.duration}</p>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        );
                      })}
                      
                      {item.items && item.items.length > 10 && item.isExpanded && (
                        <Button 
                          variant="ghost" 
                          className="w-full mt-2"
                          onClick={() => {/* Show all logic */}}
                        >
                          Show All {item.items.length} Items
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="cursor-grab text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="p-2 rounded-md bg-warning-light text-warning">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-heading font-semibold text-lg">
                        {getContentIndex(index)}: {item.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        {item.difficulty && (
                          <span className={cn(
                            "px-2 py-1 rounded-md text-xs font-medium border",
                            getDifficultyColor(item.difficulty)
                          )}>
                            {item.difficulty}
                          </span>
                        )}
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                    {item.duration && (
                      <p className="text-xs text-muted-foreground">Duration: {item.duration}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <AddItemMenu 
        isOpen={isAddMenuOpen} 
        onClose={() => setIsAddMenuOpen(false)}
        courseId={courseId}
      />
    </div>
  );
};

export default CurriculumTab;
