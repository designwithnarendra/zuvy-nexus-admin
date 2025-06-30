
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, GripVertical, BookOpen, Code, FileText, Video, ClipboardCheck } from 'lucide-react';
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

interface Module {
  id: string;
  title: string;
  description: string;
  items: LearningItem[];
  isExpanded: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const CurriculumTab = ({ courseId }: CurriculumTabProps) => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
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
      title: 'Advanced JavaScript',
      description: 'Deep dive into ES6+, async programming, and modern JavaScript',
      isExpanded: false,
      items: Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 5}`,
        type: 'reading' as const,
        title: `JavaScript Topic ${i + 1}`,
        duration: '20 min read'
      }))
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Portfolio Website',
      description: 'Build a responsive personal portfolio using HTML, CSS, and JavaScript',
      duration: '1 week',
      difficulty: 'Easy'
    },
    {
      id: '2',
      title: 'E-commerce Application',
      description: 'Full-stack e-commerce app with React, Node.js, and MongoDB',
      duration: '3 weeks',
      difficulty: 'Hard'
    }
  ]);

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const toggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, isExpanded: !module.isExpanded }
        : module
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

      {/* Modules */}
      <div className="space-y-4">
        {modules.map((module, moduleIndex) => (
          <Card key={module.id} className="shadow-4dp">
            <Collapsible open={module.isExpanded} onOpenChange={() => toggleModule(module.id)}>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="cursor-grab text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <CollapsibleTrigger className="flex-1 flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                    <div className="text-left">
                      <h3 className="font-heading font-semibold text-lg">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
                    </div>
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform",
                      module.isExpanded && "rotate-180"
                    )} />
                  </CollapsibleTrigger>
                </div>
              </CardHeader>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {module.items.slice(0, module.isExpanded ? (module.items.length > 10 ? 10 : module.items.length) : module.items.length).map((item) => {
                      const IconComponent = getItemIcon(item.type);
                      return (
                        <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card-light hover:bg-muted/50 transition-colors group">
                          <div className="cursor-grab text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="h-4 w-4" />
                          </div>
                          <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 rounded-md bg-primary-light text-primary">
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              {item.duration && (
                                <p className="text-xs text-muted-foreground">{item.duration}</p>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      );
                    })}
                    
                    {module.items.length > 10 && module.isExpanded && (
                      <Button 
                        variant="ghost" 
                        className="w-full mt-2"
                        onClick={() => {/* Show all logic */}}
                      >
                        Show All {module.items.length} Items
                      </Button>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-xl">Projects</h3>
        {projects.map((project) => (
          <Card key={project.id} className="shadow-4dp">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="cursor-grab text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-heading font-semibold text-lg">{project.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium border",
                        getDifficultyColor(project.difficulty)
                      )}>
                        {project.difficulty}
                      </span>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{project.description}</p>
                  <p className="text-xs text-muted-foreground">Duration: {project.duration}</p>
                </div>
              </div>
            </CardContent>
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
