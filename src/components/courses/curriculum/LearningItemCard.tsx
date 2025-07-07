
import { Button } from '@/components/ui/button';
import { GripVertical, Edit, Trash2, FileText, Video, ClipboardCheck, Code, BookOpen } from 'lucide-react';
import { LearningItem } from './types';

interface LearningItemCardProps {
  learningItem: LearningItem;
  onDelete: () => void;
}

const LearningItemCard = ({ learningItem, onDelete }: LearningItemCardProps) => {
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

  const IconComponent = getItemIcon(learningItem.type);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card-light hover:bg-muted/50 transition-colors group">
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
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LearningItemCard;
