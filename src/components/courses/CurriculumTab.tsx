
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, GripVertical, BookOpen, Code, FileText, Video, ClipboardCheck, FolderOpen, Edit, Trash2, X } from 'lucide-react';
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
  items?: LearningItem[];
  isExpanded?: boolean;
  showAddContent?: boolean;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
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
  const [newModuleData, setNewModuleData] = useState({
    type: 'module' as 'module' | 'project',
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
      // Delete learning item from module
      setContentItems(prev => prev.map(item => 
        item.id === itemId && item.type === 'module'
          ? { ...item, items: item.items?.filter(learningItem => learningItem.id !== learningItemId) }
          : item
      ));
    } else {
      // Delete entire content item
      setContentItems(prev => prev.filter(item => item.id !== itemId));
    }
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

  const contentTypes = [
    {
      type: 'live-class',
      title: 'Live Class',
      icon: Calendar,
      color: 'bg-blue-light text-blue-dark'
    },
    {
      type: 'video',
      title: 'Video Content',
      icon: Video,
      color: 'bg-purple-light text-purple-dark'
    },
    {
      type: 'article',
      title: 'Article/Reading',
      icon: FileText,
      color: 'bg-green-light text-green-dark'
    },
    {
      type: 'assignment',
      title: 'Assignment',
      icon: BookOpen,
      color: 'bg-orange-light text-orange-dark'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading font-semibold text-2xl">Course Curriculum</h2>
      </div>

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
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to edit page
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteContentItem(item.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <ChevronDown className={cn(
                          "h-5 w-5 transition-transform",
                          item.isExpanded && "rotate-180"
                        )} />
                      </div>
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
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteContentItem(item.id, learningItem.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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

                      {/* Add Content Section */}
                      {item.showAddContent && (
                        <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Add Learning Content</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleAddContent(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {contentTypes.map((contentType) => {
                              const IconComponent = contentType.icon;
                              return (
                                <Button
                                  key={contentType.type}
                                  variant="outline"
                                  className="h-auto p-3 flex items-center gap-2 justify-start"
                                  onClick={() => {
                                    // Handle content type selection
                                    toggleAddContent(item.id);
                                  }}
                                >
                                  <div className={`p-1 rounded ${contentType.color}`}>
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <span className="text-sm">{contentType.title}</span>
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Add Content Button */}
                      {!item.showAddContent && (
                        <Button
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => toggleAddContent(item.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Content
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
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteContentItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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

      {/* Add Module/Project Form */}
      {showAddModuleForm && (
        <Card className="shadow-4dp">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-lg">Add New Content</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModuleForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={newModuleData.type === 'module' ? 'default' : 'outline'}
                onClick={() => setNewModuleData(prev => ({ ...prev, type: 'module' }))}
              >
                Module
              </Button>
              <Button
                variant={newModuleData.type === 'project' ? 'default' : 'outline'}
                onClick={() => setNewModuleData(prev => ({ ...prev, type: 'project' }))}
              >
                Project
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newModuleData.title}
                onChange={(e) => setNewModuleData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={`Enter ${newModuleData.type} title`}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newModuleData.description}
                onChange={(e) => setNewModuleData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={`Enter ${newModuleData.type} description`}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={newModuleData.months}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, months: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="w-16"
                    min="0"
                  />
                  <span className="text-sm">months</span>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={newModuleData.weeks}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, weeks: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="w-16"
                    min="0"
                  />
                  <span className="text-sm">weeks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={newModuleData.days}
                    onChange={(e) => setNewModuleData(prev => ({ ...prev, days: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="w-16"
                    min="0"
                  />
                  <span className="text-sm">days</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddModule} disabled={!newModuleData.title.trim()}>
                Add {newModuleData.type}
              </Button>
              <Button variant="outline" onClick={() => setShowAddModuleForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Module/Project Button */}
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
