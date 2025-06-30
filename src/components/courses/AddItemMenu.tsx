
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Video, ClipboardCheck, Code, BookOpen, PlayCircle } from 'lucide-react';
import AssessmentBuilderModal from './AssessmentBuilderModal';

interface AddItemMenuProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const AddItemMenu = ({ isOpen, onClose, courseId }: AddItemMenuProps) => {
  const [isAssessmentBuilderOpen, setIsAssessmentBuilderOpen] = useState(false);

  const itemTypes = [
    {
      type: 'reading',
      title: 'Reading Material',
      description: 'Add articles, documentation, or text-based content',
      icon: FileText,
      color: 'bg-blue-light text-blue-dark'
    },
    {
      type: 'video',
      title: 'Video Content',
      description: 'Add video lectures or tutorials',
      icon: Video,
      color: 'bg-purple-light text-purple-dark'
    },
    {
      type: 'interactive',
      title: 'Interactive Content',
      description: 'Add interactive exercises or simulations',
      icon: PlayCircle,
      color: 'bg-green-light text-green-dark'
    },
    {
      type: 'assignment',
      title: 'Assignment',
      description: 'Create project-based assignments',
      icon: BookOpen,
      color: 'bg-orange-light text-orange-dark'
    },
    {
      type: 'assessment',
      title: 'Assessment',
      description: 'Create quizzes, tests, or coding problems',
      icon: ClipboardCheck,
      color: 'bg-primary-light text-primary-dark'
    },
    {
      type: 'coding',
      title: 'Coding Exercise',
      description: 'Add coding challenges and problems',
      icon: Code,
      color: 'bg-accent-light text-accent-dark'
    }
  ];

  const handleItemSelect = (type: string) => {
    if (type === 'assessment') {
      setIsAssessmentBuilderOpen(true);
    } else {
      console.log('Selected item type:', type);
      // Handle other item types
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add Learning Content</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {itemTypes.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.type}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start gap-3 hover:shadow-4dp transition-all"
                  onClick={() => handleItemSelect(item.type)}
                >
                  <div className={`p-2 rounded-md ${item.color}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <AssessmentBuilderModal
        isOpen={isAssessmentBuilderOpen}
        onClose={() => {
          setIsAssessmentBuilderOpen(false);
          onClose();
        }}
        courseId={courseId}
      />
    </>
  );
};

export default AddItemMenu;
