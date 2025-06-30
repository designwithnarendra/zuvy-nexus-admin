
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Video, ClipboardCheck, Code, BookOpen, PlayCircle, Calendar, MessageSquare } from 'lucide-react';
import AssessmentBuilderModal from './AssessmentBuilderModal';
import LiveClassCreator from './LiveClassCreator';
import VideoCreator from './VideoCreator';
import ArticleCreator from './ArticleCreator';
import AssignmentCreator from './AssignmentCreator';
import QuizCreator from './QuizCreator';
import FeedbackFormCreator from './FeedbackFormCreator';
import CodingProblemCreator from './CodingProblemCreator';

interface AddItemMenuProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const AddItemMenu = ({ isOpen, onClose, courseId }: AddItemMenuProps) => {
  const [isAssessmentBuilderOpen, setIsAssessmentBuilderOpen] = useState(false);
  const [creatorView, setCreatorView] = useState<string | null>(null);

  const itemTypes = [
    {
      type: 'live-class',
      title: 'Live Class',
      description: 'Schedule live sessions with Zoom integration',
      icon: Calendar,
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
      type: 'article',
      title: 'Article/Reading',
      description: 'Add articles, documentation, or text-based content',
      icon: FileText,
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
      type: 'quiz',
      title: 'Quiz',
      description: 'Create quick knowledge checks',
      icon: PlayCircle,
      color: 'bg-secondary-light text-secondary-dark'
    },
    {
      type: 'feedback-form',
      title: 'Feedback Form',
      description: 'Collect student feedback and opinions',
      icon: MessageSquare,
      color: 'bg-accent-light text-accent-dark'
    },
    {
      type: 'coding-exercise',
      title: 'Coding Exercise',
      description: 'Add coding challenges and problems',
      icon: Code,
      color: 'bg-warning-light text-warning-dark'
    },
    {
      type: 'assessment',
      title: 'Assessment',
      description: 'Create comprehensive tests with multiple question types',
      icon: ClipboardCheck,
      color: 'bg-primary-light text-primary-dark'
    }
  ];

  const handleItemSelect = (type: string) => {
    if (type === 'assessment') {
      setIsAssessmentBuilderOpen(true);
      onClose(); // Close the add item menu
    } else {
      setCreatorView(type);
    }
  };

  const handleCreatorClose = () => {
    setCreatorView(null);
    onClose();
  };

  const handleAssessmentBuilderClose = () => {
    setIsAssessmentBuilderOpen(false);
  };

  const renderCreator = () => {
    switch (creatorView) {
      case 'live-class':
        return <LiveClassCreator onSave={handleCreatorClose} />;
      case 'video':
        return <VideoCreator onSave={handleCreatorClose} />;
      case 'article':
        return <ArticleCreator onSave={handleCreatorClose} />;
      case 'assignment':
        return <AssignmentCreator onSave={handleCreatorClose} />;
      case 'quiz':
        return <QuizCreator onSave={handleCreatorClose} />;
      case 'feedback-form':
        return <FeedbackFormCreator onSave={handleCreatorClose} />;
      case 'coding-exercise':
        return <CodingProblemCreator onSave={handleCreatorClose} />;
      default:
        return null;
    }
  };

  if (creatorView) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCreatorView(null)}
              >
                ← Back
              </Button>
              <DialogTitle className="font-heading text-xl">
                Create {itemTypes.find(item => item.type === creatorView)?.title}
              </DialogTitle>
            </div>
          </DialogHeader>
          
          {renderCreator()}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add Learning Content</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
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
        onClose={handleAssessmentBuilderClose}
        courseId={courseId}
      />
    </>
  );
};

export default AddItemMenu;
