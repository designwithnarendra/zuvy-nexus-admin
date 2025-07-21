import { useState } from 'react';
import { 
  CanvasDragDropContainer, 
  CanvasItem, 
  CanvasItemType,
  DragOverEvent
} from '../ui/canvas-drag-drop-container';
import { ModuleColumn, ProjectCard } from '../ui/module-column';
import { LearningItemCard, LearningItemType } from '../ui/learning-item-card';
import { Button } from '../ui/button';
import { Plus, Clock } from 'lucide-react';

// Demo data
interface ModuleData {
  id: string;
  title: string;
  description: string;
  position: number;
}

interface LearningItemData {
  id: string;
  moduleId: string;
  title: string;
  type: LearningItemType;
  contextInfo?: string;
  position: number;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  position: number;
}

export function CanvasDragDropDemo() {
  // State for modules, items and projects
  const [modules, setModules] = useState<ModuleData[]>([
    {
      id: 'module-1',
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML structure and tags.',
      position: 0
    },
    {
      id: 'module-2',
      title: 'CSS Fundamentals',
      description: 'Master styling with CSS selectors, properties, and layouts.',
      position: 1
    },
    {
      id: 'module-3',
      title: 'JavaScript Basics',
      description: 'Introduction to JavaScript programming and DOM manipulation.',
      position: 2
    }
  ]);

  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: 'project-1',
      title: 'Personal Portfolio Website',
      description: 'Build a responsive portfolio website with HTML, CSS, and JavaScript.',
      dueDate: '2024-06-30',
      difficulty: 'Medium',
      position: 3
    }
  ]);

  const [learningItems, setLearningItems] = useState<LearningItemData[]>([
    {
      id: 'item-1',
      moduleId: 'module-1',
      title: 'HTML Document Structure',
      type: 'article',
      position: 0
    },
    {
      id: 'item-2',
      moduleId: 'module-1',
      title: 'Introduction to HTML Tags',
      type: 'video',
      contextInfo: '15 min',
      position: 1
    },
    {
      id: 'item-3',
      moduleId: 'module-1',
      title: 'HTML Basics Quiz',
      type: 'quiz',
      position: 2
    },
    {
      id: 'item-4',
      moduleId: 'module-2',
      title: 'CSS Selectors and Properties',
      type: 'article',
      position: 0
    },
    {
      id: 'item-5',
      moduleId: 'module-2',
      title: 'Building Layouts with Flexbox',
      type: 'video',
      contextInfo: '20 min',
      position: 1
    },
    {
      id: 'item-6',
      moduleId: 'module-2',
      title: 'CSS Layout Assignment',
      type: 'assignment',
      contextInfo: 'Due Jun 15',
      position: 2
    },
    {
      id: 'item-7',
      moduleId: 'module-3',
      title: 'JavaScript Variables and Functions',
      type: 'article',
      position: 0
    },
    {
      id: 'item-8',
      moduleId: 'module-3',
      title: 'DOM Manipulation Basics',
      type: 'video',
      contextInfo: '25 min',
      position: 1
    },
    {
      id: 'item-9',
      moduleId: 'module-3',
      title: 'JavaScript Problem Solving',
      type: 'coding',
      position: 2
    }
  ]);

  // Convert state to CanvasItems for the drag-drop container
  const canvasItems: CanvasItem[] = [
    // Modules
    ...modules.map(module => ({
      id: module.id,
      type: 'module' as CanvasItemType
    })),
    // Projects
    ...projects.map(project => ({
      id: project.id,
      type: 'project' as CanvasItemType
    })),
    // Learning items
    ...learningItems.map(item => ({
      id: item.id,
      type: 'learning-item' as CanvasItemType,
      parentId: item.moduleId
    }))
  ];

  // Handler for item changes
  const handleItemsChange = (newItems: CanvasItem[]) => {
    // Extract and update modules
    const updatedModules = [...modules];
    const updatedProjects = [...projects];
    const updatedLearningItems = [...learningItems];

    // Update positions based on the order in newItems
    newItems.forEach((item, index) => {
      if (item.type === 'module') {
        const moduleIndex = modules.findIndex(m => m.id === item.id);
        if (moduleIndex !== -1) {
          updatedModules[moduleIndex] = { 
            ...updatedModules[moduleIndex], 
            position: index 
          };
        }
      } else if (item.type === 'project') {
        const projectIndex = projects.findIndex(p => p.id === item.id);
        if (projectIndex !== -1) {
          updatedProjects[projectIndex] = { 
            ...updatedProjects[projectIndex], 
            position: index 
          };
        }
      } else if (item.type === 'learning-item') {
        const learningItemIndex = learningItems.findIndex(li => li.id === item.id);
        if (learningItemIndex !== -1) {
          // If the parentId has changed, update it
          if (item.parentId && item.parentId !== updatedLearningItems[learningItemIndex].moduleId) {
            updatedLearningItems[learningItemIndex] = {
              ...updatedLearningItems[learningItemIndex],
              moduleId: item.parentId,
            };
          }
        }
      }
    });

    // Calculate positions for learning items within each module
    const moduleItemsMap = new Map<string, LearningItemData[]>();
    updatedLearningItems.forEach(item => {
      if (!moduleItemsMap.has(item.moduleId)) {
        moduleItemsMap.set(item.moduleId, []);
      }
      moduleItemsMap.get(item.moduleId)?.push(item);
    });

    // Update positions within each module
    moduleItemsMap.forEach((items, moduleId) => {
      items.sort((a, b) => a.position - b.position);
      items.forEach((item, index) => {
        const itemIndex = updatedLearningItems.findIndex(li => li.id === item.id);
        if (itemIndex !== -1) {
          updatedLearningItems[itemIndex] = {
            ...updatedLearningItems[itemIndex],
            position: index
          };
        }
      });
    });

    // Sort modules and projects by position for display
    updatedModules.sort((a, b) => a.position - b.position);
    updatedProjects.sort((a, b) => a.position - b.position);

    setModules(updatedModules);
    setProjects(updatedProjects);
    setLearningItems(updatedLearningItems);
  };

  // Handler for adding a new module
  const handleAddModule = () => {
    const newModule: ModuleData = {
      id: `module-${Date.now()}`,
      title: 'New Module',
      description: 'Add description here',
      position: modules.length + projects.length
    };
    setModules([...modules, newModule]);
  };

  // Handler for adding a new project
  const handleAddProject = () => {
    const newProject: ProjectData = {
      id: `project-${Date.now()}`,
      title: 'New Project',
      description: 'Add description here',
      dueDate: new Date().toISOString().split('T')[0],
      difficulty: 'Medium',
      position: modules.length + projects.length
    };
    setProjects([...projects, newProject]);
  };

  // Handler for adding a new learning item
  const handleAddLearningItem = (moduleId: string) => {
    const moduleItems = learningItems.filter(item => item.moduleId === moduleId);
    const newItem: LearningItemData = {
      id: `item-${Date.now()}`,
      moduleId,
      title: 'New Learning Item',
      type: 'article',
      position: moduleItems.length
    };
    setLearningItems([...learningItems, newItem]);
  };

  // Handler for title changes
  const handleTitleChange = (itemId: string, newTitle: string) => {
    // Check if it's a module
    const moduleIndex = modules.findIndex(m => m.id === itemId);
    if (moduleIndex !== -1) {
      const updatedModules = [...modules];
      updatedModules[moduleIndex] = {
        ...updatedModules[moduleIndex],
        title: newTitle
      };
      setModules(updatedModules);
      return;
    }

    // Check if it's a project
    const projectIndex = projects.findIndex(p => p.id === itemId);
    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        title: newTitle
      };
      setProjects(updatedProjects);
      return;
    }

    // Check if it's a learning item
    const itemIndex = learningItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedItems = [...learningItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        title: newTitle
      };
      setLearningItems(updatedItems);
    }
  };

  // Sort content for rendering
  const sortedModules = [...modules].sort((a, b) => a.position - b.position);
  const sortedProjects = [...projects].sort((a, b) => a.position - b.position);

  // Combine modules and projects and sort by position
  const allContent = [
    ...sortedModules.map(m => ({ ...m, type: 'module' as const })),
    ...sortedProjects.map(p => ({ ...p, type: 'project' as const }))
  ].sort((a, b) => a.position - b.position);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Curriculum Canvas</h1>
      <p className="text-muted-foreground mb-6">
        Drag and drop modules, projects, and learning items to reorganize the curriculum.
        Double-click titles to edit them.
      </p>

      <div className="flex gap-4 mb-6">
        <Button onClick={handleAddModule}>
          <Plus className="h-4 w-4 mr-1" />
          Add Module
        </Button>
        <Button onClick={handleAddProject} variant="secondary">
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>
      
      <div className="relative mb-4 pb-4 overflow-x-auto">
        <CanvasDragDropContainer
          items={canvasItems}
          onItemsChange={handleItemsChange}
          className="p-1 gap-6"
        >
          {allContent.map(content => {
            if (content.type === 'module') {
              // Get learning items for this module
              const moduleItems = learningItems
                .filter(item => item.moduleId === content.id)
                .sort((a, b) => a.position - b.position);
              
              return (
                <ModuleColumn
                  key={content.id}
                  id={content.id}
                  title={content.title}
                  description={content.description}
                  onAddItem={() => handleAddLearningItem(content.id)}
                  onEdit={() => {}}
                  onDelete={() => {}}
                >
                  {moduleItems.map(item => (
                    <LearningItemCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      type={item.type}
                      contextInfo={item.contextInfo}
                      onTitleChange={(newTitle) => handleTitleChange(item.id, newTitle)}
                      onEdit={() => {}}
                      onDelete={() => {}}
                      moduleId={item.moduleId}
                    />
                  ))}
                </ModuleColumn>
              );
            } else {
              // This is a project
              const project = content as ProjectData & { type: 'project' };
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  dueDate={project.dueDate}
                  difficulty={project.difficulty}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              );
            }
          })}
        </CanvasDragDropContainer>
      </div>
      
      <div className="mt-8 p-4 border rounded-lg bg-muted/30">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          How to Use This Demo
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Drag modules and projects horizontally to reorder them</li>
          <li>Drag learning items within a module to reorder them</li>
          <li>Drag learning items between modules to move them</li>
          <li>Double-click on any title to edit it inline</li>
          <li>Use the Add Module or Add Project buttons to add new content</li>
          <li>Use the + button in a module to add new learning items</li>
        </ul>
      </div>
    </div>
  );
} 