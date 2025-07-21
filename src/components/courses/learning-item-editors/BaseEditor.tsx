import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LearningItemType } from '@/components/ui/learning-item-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface BaseEditorProps {
  title: string;
  type: LearningItemType;
  mode: 'create' | 'edit';
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
  tabs?: {
    id: string;
    label: string;
    content: React.ReactNode;
  }[];
  footerContent?: React.ReactNode;
  description?: string;
  className?: string;
}

/**
 * BaseEditor
 * 
 * A base component for all learning item editors.
 * Provides a consistent layout and behavior for editing different types of learning items.
 */
export function BaseEditor({
  title,
  type,
  mode,
  onSave,
  onCancel,
  children,
  tabs,
  footerContent,
  description,
  className,
}: BaseEditorProps) {
  // Format the title based on the mode and type
  const formattedTitle = `${mode === 'create' ? 'Create' : 'Edit'} ${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}`;
  
  // If tabs are provided, render them
  if (tabs && tabs.length > 0) {
    return (
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle>{title || formattedTitle}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        
        <Tabs defaultValue={tabs[0].id} className="w-full">
          <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="pt-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
        
        <CardFooter className="flex justify-between mt-6 pt-4 border-t">
          {footerContent || (
            <>
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button onClick={onSave}>{mode === 'create' ? 'Create' : 'Save Changes'}</Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  // Otherwise, render a simple card
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>{title || formattedTitle}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent>
        {children}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {footerContent || (
          <>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave}>{mode === 'create' ? 'Create' : 'Save Changes'}</Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
} 