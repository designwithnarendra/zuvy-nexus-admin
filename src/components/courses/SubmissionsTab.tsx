import { useState, useEffect } from 'react';
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
import { BatchSelector } from './submissions/BatchSelector';
import { ContentItemGrid } from './submissions/ContentItemGrid';
import { StudentSubmissionsTable } from './submissions/StudentSubmissionsTable';
import { Batch } from '@/types';
import { mockBatches } from '@/types/mock-data';

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
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [activeSubmissionType, setActiveSubmissionType] = useState('assessments');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch batches for this course
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Filter batches for this course
      const courseBatches = mockBatches.filter(batch => batch.courseId === courseId);
      setBatches(courseBatches);
      setIsLoading(false);
    }, 500);
  }, [courseId]);

  const handleBatchSelect = (batchId: string) => {
    setSelectedBatchId(batchId);
    setSelectedItemId(null); // Reset selected item when batch changes
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
  };

  const handleBackToItems = () => {
    setSelectedItemId(null);
  };

  // If no batch is selected, show the batch selection screen
  if (!selectedBatchId) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Select a Batch to View Submissions</h2>
        <BatchSelector 
          batches={batches} 
          onSelectBatch={handleBatchSelect} 
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Submissions for {batches.find(b => b.id === selectedBatchId)?.name}
        </h2>
        <BatchSelector 
          batches={batches} 
          selectedBatchId={selectedBatchId}
          onSelectBatch={handleBatchSelect}
          isCompact={true}
          isLoading={isLoading}
        />
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
                    batchId={selectedBatchId}
                    submissionType={type.id}
                    onSelectItem={handleItemSelect}
                  />
                ) : (
                  <StudentSubmissionsTable 
                    batchId={selectedBatchId}
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