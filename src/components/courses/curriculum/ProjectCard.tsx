
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, BookOpen, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem } from './types';

interface ProjectCardProps {
  item: ContentItem;
  index: number;
  onDelete: (itemId: string) => void;
  getContentIndex: (index: number) => string;
  getDifficultyColor: (difficulty: string) => string;
}

const ProjectCard = ({ 
  item, 
  index, 
  onDelete, 
  getContentIndex, 
  getDifficultyColor 
}: ProjectCardProps) => {
  return (
    <Card className="shadow-4dp">
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
                  onClick={() => onDelete(item.id)}
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
    </Card>
  );
};

export default ProjectCard;
