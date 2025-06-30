
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, Bot } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import MCQCreator from '@/components/courses/MCQCreator';
import CodingProblemCreator from '@/components/courses/CodingProblemCreator';
import BulkUploadModal from '@/components/content-bank/BulkUploadModal';
import AIGenerationModal from '@/components/content-bank/AIGenerationModal';

interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'Coding' | 'True/False' | 'Fill in the Blank';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  usageCount: number;
  createdDate: string;
}

const QuestionBankPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isAIGenerationOpen, setIsAIGenerationOpen] = useState(false);
  const [createType, setCreateType] = useState<'MCQ' | 'Coding'>('MCQ');

  // Dummy questions data
  const questions: Question[] = [
    {
      id: '1',
      text: 'What is the correct way to declare a variable in JavaScript?',
      type: 'MCQ',
      topic: 'JavaScript Basics',
      difficulty: 'Easy',
      usageCount: 15,
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      text: 'Implement a function to reverse a string',
      type: 'Coding',
      topic: 'Algorithms',
      difficulty: 'Medium',
      usageCount: 8,
      createdDate: '2024-01-16'
    },
    {
      id: '3',
      text: 'Which of the following is NOT a JavaScript data type?',
      type: 'MCQ',
      topic: 'JavaScript Basics',
      difficulty: 'Easy',
      usageCount: 12,
      createdDate: '2024-01-17'
    },
    {
      id: '4',
      text: 'React is a JavaScript library for building user interfaces',
      type: 'True/False',
      topic: 'React',
      difficulty: 'Easy',
      usageCount: 20,
      createdDate: '2024-01-18'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-light text-success-dark border-success';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Hard': return 'bg-destructive-light text-destructive-dark border-destructive';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'MCQ': return 'bg-primary-light text-primary-dark';
      case 'Coding': return 'bg-accent-light text-accent-dark';
      case 'True/False': return 'bg-secondary-light text-secondary-dark';
      case 'Fill in the Blank': return 'bg-info-light text-info-dark';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const questionColumns = [
    { key: 'text', label: 'Question' },
    { key: 'type', label: 'Type' },
    { key: 'topic', label: 'Topic' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'usageCount', label: 'Usage Count' },
    { key: 'createdDate', label: 'Created' }
  ];

  const formatQuestionData = (question: Question) => ({
    ...question,
    text: (
      <div className="max-w-md">
        <p className="font-medium line-clamp-2">{question.text}</p>
      </div>
    ),
    type: (
      <Badge className={getTypeColor(question.type)} variant="outline">
        {question.type}
      </Badge>
    ),
    difficulty: (
      <Badge className={getDifficultyColor(question.difficulty)} variant="outline">
        {question.difficulty}
      </Badge>
    ),
    usageCount: (
      <span className="font-medium">{question.usageCount}</span>
    ),
    createdDate: new Date(question.createdDate).toLocaleDateString()
  });

  const handleCreateQuestion = () => {
    console.log('Question created');
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl mb-2">Question Bank</h1>
          <p className="text-muted-foreground">
            Centralized repository for all assessment questions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsBulkUploadOpen(true)}
            className="shadow-4dp"
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsAIGenerationOpen(true)}
            className="shadow-4dp"
          >
            <Bot className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-dark shadow-4dp">
                <Plus className="h-4 w-4 mr-2" />
                Create Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">Create New Question</DialogTitle>
              </DialogHeader>
              
              <Tabs defaultValue="mcq" value={createType.toLowerCase()} onValueChange={(value) => setCreateType(value as 'MCQ' | 'Coding')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mcq">Multiple Choice</TabsTrigger>
                  <TabsTrigger value="coding">Coding Problem</TabsTrigger>
                </TabsList>
                
                <TabsContent value="mcq">
                  <MCQCreator onSave={handleCreateQuestion} />
                </TabsContent>
                
                <TabsContent value="coding">
                  <CodingProblemCreator onSave={handleCreateQuestion} />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Questions Table */}
      <Card className="shadow-4dp">
        <CardHeader>
          <CardTitle className="font-heading text-xl">All Questions ({questions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={questions.map(formatQuestionData)}
            columns={questionColumns}
            searchable
            filterable
            itemsPerPage={15}
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
      />
      
      <AIGenerationModal
        isOpen={isAIGenerationOpen}
        onClose={() => setIsAIGenerationOpen(false)}
      />
    </div>
  );
};

export default QuestionBankPage;
