'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GripVertical, BookOpen, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem } from './types';

interface ProjectCardProps {
  item: ContentItem;
  index: number;
  onDelete: (itemId: string) => void;
  getContentIndex: (index: number) => string;
  getDifficultyColor: (difficulty: string) => string;
  onEditProject?: (projectId: string) => void;
  onNavigateToProject?: (projectId: string, type: 'module' | 'project') => void;
  isDragging?: boolean;
}

const ProjectCard = ({
  item,
  index,
  onDelete,
  getContentIndex,
  getDifficultyColor,
  onEditProject,
  onNavigateToProject,
  isDragging = false
}: ProjectCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Handle card click for navigation
  const handleCardClick = () => {
    if (onNavigateToProject) {
      onNavigateToProject(item.id, item.type);
    }
  };

  return (
    <Card
      className={cn("shadow-soft transition-all duration-200 cursor-pointer hover:shadow-medium", isDragging && "shadow-medium ring-2 ring-primary/20")}
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "cursor-grab text-muted-foreground hover:text-primary transition-colors duration-200 p-1 rounded-md hover:bg-primary-light",
              isDragging && "text-primary bg-primary/10"
            )}
            title="Drag to reorder"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          <div className="p-2 rounded-md bg-warning-light text-warning">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="font-body font-semibold text-lg">
                {getContentIndex(index)}: {item.title}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    item.title !== 'Portfolio Website' ? 'opacity-50 cursor-not-allowed' : '',
                    'group hover:!translate-y-0 hover:!shadow-none'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Only allow editing for Project 1: Portfolio Website
                    if (item.title === 'Portfolio Website' && onEditProject) {
                      onEditProject(item.id);
                    } else {
                      console.log('Editing not available for this project');
                    }
                  }}
                  disabled={item.title !== 'Portfolio Website'}
                  title={item.title === 'Portfolio Website' ? 'Edit project' : 'Editing not available for this project'}
                >
                  <Edit className="h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
                </Button>
                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="group text-destructive hover:text-destructive-dark hover:bg-destructive-light hover:!translate-y-0 hover:!shadow-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4 transition-transform duration-200 group-hover:scale-125" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <DialogTitle>Delete Project</DialogTitle>
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
            <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
