
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Calendar, Video, FileText, BookOpen, PlayCircle, MessageSquare, Code, ClipboardCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AssessmentBuilderModal from '../assessment-builder/AssessmentBuilderModal';
import LiveClassCreator from '../LiveClassCreator';
import VideoCreator from '../VideoCreator';
import ArticleCreator from '../ArticleCreator';
import AssignmentCreator from '../AssignmentCreator';
import QuizCreator from '../QuizCreator';
import FeedbackFormCreator from '../FeedbackFormCreator';
import CodingProblemCreator from '../CodingProblemCreator';

interface ContentTypeSelectorProps {
  onClose: () => void;
  onSelect: (type: string) => void;
}

const ContentTypeSelector = ({ onClose, onSelect }: ContentTypeSelectorProps) => {
  const [isAssessmentBuilderOpen, setIsAssessmentBuilderOpen] = useState(false);
  const [creatorView, setCreatorView] = useState<string | null>(null);

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
    },
    {
      type: 'coding-problem',
      title: 'Coding Problem',
      icon: Code,
      color: 'bg-warning-light text-warning-dark'
    },
    {
      type: 'quiz',
      title: 'Quiz',
      icon: PlayCircle,
      color: 'bg-secondary-light text-secondary-dark'
    },
    {
      type: 'feedback-form',
      title: 'Feedback Form',
      icon: MessageSquare,
      color: 'bg-accent-light text-accent-dark'
    },
    {
      type: 'assessment',
      title: 'Assessment',
      icon: ClipboardCheck,
      color: 'bg-primary-light text-primary-dark'
    }
  ];

  const handleContentTypeSelect = (type: string) => {
    if (type === 'assessment') {
      setIsAssessmentBuilderOpen(true);
    } else {
      setCreatorView(type);
    }
    onSelect(type);
  };

  const handleCreatorClose = () => {
    setCreatorView(null);
    onClose();
  };

  const handleAssessmentBuilderClose = () => {
    setIsAssessmentBuilderOpen(false);
    onClose();
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
      case 'coding-problem':
        return <CodingProblemCreator onSave={handleCreatorClose} />;
      default:
        return null;
    }
  };

  if (creatorView) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
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
                Create {contentTypes.find(item => item.type === creatorView)?.title}
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
      <div className="mt-4 p-4 border rounded-lg bg-muted/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium">Add Learning Content</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
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
                onClick={() => handleContentTypeSelect(contentType.type)}
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

      <AssessmentBuilderModal
        isOpen={isAssessmentBuilderOpen}
        onClose={handleAssessmentBuilderClose}
        courseId="1"
      />
    </>
  );
};

export default ContentTypeSelector;
