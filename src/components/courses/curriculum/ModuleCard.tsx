'use client'

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GripVertical, FolderOpen, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem, LearningItem } from './types';


interface ModuleCardProps {
  item: ContentItem;
  index: number;
  onToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onDeleteLearningItem: (itemId: string, learningItemId: string) => void;
  onToggleAddContent: (itemId: string) => void;
  getContentIndex: (index: number) => string;
  onAddItem?: (type: string) => void;
  onEditItem?: (itemId: string, type: string) => void;
  onDropItem?: (moduleId: string, item: any) => void;
  onReorderLearningItems?: (moduleId: string, items: LearningItem[]) => void;
  onEditModule?: (moduleId: string) => void;
  onNavigateToModule?: (moduleId: string, type: 'module' | 'project') => void;
  isDragging?: boolean;
}

const ModuleCard = ({
  item,
  index,
  onToggle,
  onDelete,
  onDeleteLearningItem,
  onToggleAddContent,
  getContentIndex,
  onAddItem,
  onEditItem,
  onDropItem,
  onReorderLearningItems,
  onEditModule,
  onNavigateToModule,
  isDragging = false
}: ModuleCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Handle card click for navigation
  const handleCardClick = () => {
    if (onNavigateToModule) {
      onNavigateToModule(item.id, item.type);
    }
  };

  return (
    <Card
      className={cn("shadow-soft transition-all duration-200 cursor-pointer hover:shadow-medium", isDragging && "shadow-medium ring-2 ring-primary/20")}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "cursor-grab text-muted-foreground hover:text-primary transition-colors duration-200 p-1 rounded-md hover:bg-primary-light",
              isDragging && "text-primary bg-primary/10"
            )}
            title="Drag to reorder"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-5 w-5" />
          </div>

          {/* Main content area - clickable for navigation */}
          <div className="flex-1 flex items-center justify-between p-2 rounded-md transition-colors">
            <div className="text-left flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary-light text-primary">
                <FolderOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="font-body font-semibold text-lg">
                  {getContentIndex(index)}: {item.title}
                </div>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="group hover:!translate-y-0 hover:!shadow-none"
              onClick={(e) => {
                e.stopPropagation();
                if (onEditModule) {
                  onEditModule(item.id);
                }
              }}
              title={`Edit ${item.type} details`}
            >
              <Edit className="h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
            </Button>
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group text-destructive hover:text-destructive-dark hover:bg-destructive-light hover:!translate-y-0 hover:!shadow-none"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Trash2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <DialogTitle>Delete {item.type === 'module' ? 'Module' : 'Project'}</DialogTitle>
                  </div>
                  <DialogDescription>
                    Are you sure you want to delete "{item.title}"? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={(e) => {
                    e.stopPropagation();
                    setDeleteDialogOpen(false);
                  }}>
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                      setDeleteDialogOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ModuleCard;
