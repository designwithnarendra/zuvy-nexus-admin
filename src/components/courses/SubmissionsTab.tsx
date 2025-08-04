'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CheckSquare, 
  Code, 
  MessageSquare, 
  ClipboardCheck,
  BookOpen
} from 'lucide-react';
import { ContentItemGrid } from './submissions/ContentItemGrid';
import { StudentSubmissionsTable } from './submissions/StudentSubmissionsTable';

// Mock submission types
const submissionTypes = [
  { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'projects', label: 'Projects', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
  { id: 'coding', label: 'Practice Problems', icon: Code },
  { id: 'feedback', label: 'Feedback Forms', icon: MessageSquare },
];

interface SubmissionsTabProps {
  courseId: string;
}

const SubmissionsTab = ({ courseId }: SubmissionsTabProps) => {
  const [activeSubmissionType, setActiveSubmissionType] = useState('assessments');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleBackToItems = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course Submissions</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs 
            value={activeSubmissionType} 
            onValueChange={setActiveSubmissionType}
            className="w-full"
          >
            <TabsList className="w-full grid border-b rounded-none bg-card" 
              style={{ gridTemplateColumns: `repeat(${submissionTypes.length}, 1fr)` }}>
              {submissionTypes.map(type => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="flex items-center gap-2 data-[state=active]:bg-background rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary"
                >
                  <type.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{type.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {submissionTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="p-4">
                {!selectedItemId ? (
                  <ContentItemGrid 
                    courseId={courseId}
                    submissionType={type.id}
                    onSelectItem={handleItemSelect}
                  />
                ) : (
                  <StudentSubmissionsTable 
                    courseId={courseId}
                    itemId={selectedItemId}
                    submissionType={type.id}
                    onBack={handleBackToItems}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionsTab; 