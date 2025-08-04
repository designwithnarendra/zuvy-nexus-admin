
'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GripVertical, Edit, Trash2, FileText, Video, ClipboardCheck, Code, BookOpen } from 'lucide-react';
import { LearningItem } from './types';

interface LearningItemCardProps {
  learningItem: LearningItem;
  onDelete: () => void;
  onEdit?: () => void;
}

const LearningItemCard = ({ learningItem, onDelete, onEdit }: LearningItemCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
        <div className="flex-1 flex items-center justify-between">
          <h4 className="font-medium text-lg">{learningItem.title}</h4>
          {learningItem.duration && (
            <p className="text-sm text-muted-foreground ml-4">{learningItem.duration}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Learning Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{learningItem.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  onDelete();
                  setDeleteDialogOpen(false);
                }}
              >
                Delete Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LearningItemCard;
