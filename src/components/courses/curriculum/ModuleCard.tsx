
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, FolderOpen, Edit, Trash2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem, LearningItem } from './types';
import LearningItemCard from './LearningItemCard';
import ContentTypeSelector from './ContentTypeSelector';

interface ModuleCardProps {
  item: ContentItem;
  index: number;
  onToggle: (itemId: string) => void;
  onDelete: (itemId: string) => void;
  onDeleteLearningItem: (itemId: string, learningItemId: string) => void;
  onToggleAddContent: (itemId: string) => void;
  getContentIndex: (index: number) => string;
}

const ModuleCard = ({ 
  item, 
  index, 
  onToggle, 
  onDelete, 
  onDeleteLearningItem, 
  onToggleAddContent,
  getContentIndex 
}: ModuleCardProps) => {
  return (
    <Card className="shadow-4dp">
      <Collapsible open={item.isExpanded} onOpenChange={() => onToggle(item.id)}>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="cursor-grab text-muted-foreground hover:text-foreground">
              <GripVertical className="h-5 w-5" />
            </div>
            <CollapsibleTrigger className="flex-1 flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
              <div className="text-left flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary-light text-primary">
                  <FolderOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg">
                    {getContentIndex(index)}: {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate to edit page
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <ChevronDown className={cn(
                  "h-5 w-5 transition-transform",
                  item.isExpanded && "rotate-180"
                )} />
              </div>
            </CollapsibleTrigger>
          </div>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {item.items?.slice(0, item.isExpanded ? (item.items.length > 10 ? 10 : item.items.length) : item.items.length).map((learningItem) => (
                <LearningItemCard
                  key={learningItem.id}
                  learningItem={learningItem}
                  onDelete={() => onDeleteLearningItem(item.id, learningItem.id)}
                />
              ))}
              
              {item.items && item.items.length > 10 && item.isExpanded && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-2"
                  onClick={() => {/* Show all logic */}}
                >
                  Show All {item.items.length} Items
                </Button>
              )}

              {/* Add Content Section */}
              {item.showAddContent ? (
                <ContentTypeSelector 
                  onClose={() => onToggleAddContent(item.id)}
                  onSelect={(type) => {
                    // ContentTypeSelector handles opening forms internally
                    // Don't close immediately - let the selector handle the flow
                  }}
                />
              ) : (
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => onToggleAddContent(item.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ModuleCard;
