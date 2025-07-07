
import { Button } from '@/components/ui/button';
import { X, Calendar, Video, FileText, BookOpen, PlayCircle, MessageSquare, Code, ClipboardCheck } from 'lucide-react';

interface ContentTypeSelectorProps {
  onClose: () => void;
  onSelect: (type: string) => void;
}

const ContentTypeSelector = ({ onClose, onSelect }: ContentTypeSelectorProps) => {
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

  return (
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
              onClick={() => onSelect(contentType.type)}
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
  );
};

export default ContentTypeSelector;
