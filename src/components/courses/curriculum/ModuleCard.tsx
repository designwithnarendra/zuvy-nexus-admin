
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, GripVertical, FolderOpen, Edit, Trash2, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContentItem, LearningItem } from './types';
import LearningItemCard from './LearningItemCard';
import ContentTypeSelector from './ContentTypeSelector';
import { LearningItemType } from '@/components/ui/learning-item-card';
import { ContentBankItemType } from '@/components/ui/content-bank-panel';


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
  onDropItem
}: ModuleCardProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Map content type to learning item type
  const mapContentTypeToLearningItemType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'article': 'article',
      'video': 'video',
      'quiz': 'quiz',
      'assignment': 'assignment',
      'coding-problem': 'coding',
      'live-class': 'live-class',
      'feedback-form': 'feedback',
      'assessment': 'assessment'
    };
    return typeMap[type] || type;
  };

  const handleContentTypeSelect = (type: string) => {
    // Close the content selector
    onToggleAddContent(item.id);
    
    // Call the onAddItem prop if provided
    if (onAddItem) {
      const learningItemType = mapContentTypeToLearningItemType(type);
      onAddItem(learningItemType);
    }
  };

  const handleEditLearningItem = (learningItem: LearningItem) => {
    if (onEditItem) {
      onEditItem(learningItem.id, learningItem.type);
    }
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  // Handle drag leave event
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    try {
      // Get the dropped item data
      const jsonData = e.dataTransfer.getData('application/json');
      if (jsonData) {
        const droppedItem = JSON.parse(jsonData);
        
        // Call the onDropItem prop if provided
        if (onDropItem) {
          onDropItem(item.id, droppedItem);
        }
      }
    } catch (error) {
      console.error('Error parsing dropped item:', error);
    }
  };

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
                  className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
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
          <CardContent 
            className={cn(
              "pt-0 transition-colors",
              isDragOver && "bg-muted/50 rounded-md"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {item.items?.slice(0, item.isExpanded ? (item.items.length > 10 ? 10 : item.items.length) : item.items.length).map((learningItem) => (
                <LearningItemCard
                  key={learningItem.id}
                  learningItem={learningItem}
                  onDelete={() => onDeleteLearningItem(item.id, learningItem.id)}
                  onEdit={() => handleEditLearningItem(learningItem)}
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
                  onSelect={(type) => handleContentTypeSelect(type)}
                />
              ) : (
                <Button
                  onClick={() => onToggleAddContent(item.id)}
                  variant="outline"
                  size="default"
                  className="w-full mt-2"
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
