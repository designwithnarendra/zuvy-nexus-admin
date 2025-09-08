'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Settings, ChevronDown, Eye, Edit, Trash2 } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';
import { CodingProblemEditor } from '@/components/courses/learning-item-editors/CodingProblemEditor';
import BulkUploadModal from '@/components/content-bank/BulkUploadModal';
import ManageTopicsModal from '@/components/content-bank/ManageTopicsModal';
import OpenEndedCreatorModal from '@/components/content-bank/OpenEndedCreatorModal';
import MCQCreatorModal from '@/components/content-bank/MCQCreatorModal';

interface Question {
  id: string;
  text: string;
  type: 'MCQ' | 'Coding' | 'Open Ended';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  usageCount: number;
  createdDate: string;
}

const QuestionBankPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [isManageTopicsOpen, setIsManageTopicsOpen] = useState(false);
  const [isOpenEndedModalOpen, setIsOpenEndedModalOpen] = useState(false);
  const [isMCQModalOpen, setIsMCQModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [createType, setCreateType] = useState<'MCQ' | 'Coding' | 'Open Ended'>('MCQ');

  // Expanded questions data with 30+ items
  const questions: Question[] = [
    // JavaScript Questions
    { id: '1', text: 'What is the correct way to declare a variable in JavaScript?', type: 'MCQ', topic: 'JavaScript Basics', difficulty: 'Easy', usageCount: 15, createdDate: '2024-01-15' },
    { id: '2', text: 'Implement a function to reverse a string', type: 'Coding', topic: 'Algorithms', difficulty: 'Medium', usageCount: 8, createdDate: '2024-01-16' },
    { id: '3', text: 'Which of the following is NOT a JavaScript data type?', type: 'MCQ', topic: 'JavaScript Basics', difficulty: 'Easy', usageCount: 12, createdDate: '2024-01-17' },
    { id: '4', text: 'Explain the concept of closures in JavaScript', type: 'Open Ended', topic: 'JavaScript Advanced', difficulty: 'Hard', usageCount: 20, createdDate: '2024-01-18' },
    { id: '5', text: 'What is the difference between let, const, and var?', type: 'MCQ', topic: 'JavaScript Basics', difficulty: 'Medium', usageCount: 25, createdDate: '2024-01-19' },
    { id: '6', text: 'Write a function to find the largest number in an array', type: 'Coding', topic: 'Algorithms', difficulty: 'Easy', usageCount: 18, createdDate: '2024-01-20' },
    { id: '7', text: 'Describe the event loop in JavaScript', type: 'Open Ended', topic: 'JavaScript Advanced', difficulty: 'Hard', usageCount: 14, createdDate: '2024-01-21' },
    { id: '8', text: 'Which method is used to add elements to the end of an array?', type: 'MCQ', topic: 'JavaScript Arrays', difficulty: 'Easy', usageCount: 22, createdDate: '2024-01-22' },
    { id: '9', text: 'Implement a binary search algorithm', type: 'Coding', topic: 'Algorithms', difficulty: 'Hard', usageCount: 6, createdDate: '2024-01-23' },
    { id: '10', text: 'What is hoisting in JavaScript?', type: 'Open Ended', topic: 'JavaScript Advanced', difficulty: 'Medium', usageCount: 16, createdDate: '2024-01-24' },
    
    // React Questions
    { id: '11', text: 'What is the virtual DOM in React?', type: 'MCQ', topic: 'React Fundamentals', difficulty: 'Medium', usageCount: 28, createdDate: '2024-01-25' },
    { id: '12', text: 'Create a custom React hook for API calls', type: 'Coding', topic: 'React Hooks', difficulty: 'Hard', usageCount: 11, createdDate: '2024-01-26' },
    { id: '13', text: 'Explain the component lifecycle in React', type: 'Open Ended', topic: 'React Fundamentals', difficulty: 'Medium', usageCount: 19, createdDate: '2024-01-27' },
    { id: '14', text: 'Which hook is used for side effects in React?', type: 'MCQ', topic: 'React Hooks', difficulty: 'Easy', usageCount: 31, createdDate: '2024-01-28' },
    { id: '15', text: 'Build a todo list component with add/remove functionality', type: 'Coding', topic: 'React Components', difficulty: 'Medium', usageCount: 9, createdDate: '2024-01-29' },
    { id: '16', text: 'What is the purpose of React.memo?', type: 'Open Ended', topic: 'React Optimization', difficulty: 'Hard', usageCount: 13, createdDate: '2024-01-30' },
    { id: '17', text: 'How do you pass data from parent to child component?', type: 'MCQ', topic: 'React Props', difficulty: 'Easy', usageCount: 26, createdDate: '2024-02-01' },
    { id: '18', text: 'Implement a counter component using useState', type: 'Coding', topic: 'React Hooks', difficulty: 'Easy', usageCount: 21, createdDate: '2024-02-02' },
    
    // CSS Questions
    { id: '19', text: 'What is the difference between margin and padding?', type: 'MCQ', topic: 'CSS Layout', difficulty: 'Easy', usageCount: 24, createdDate: '2024-02-03' },
    { id: '20', text: 'Create a responsive navigation bar using Flexbox', type: 'Coding', topic: 'CSS Flexbox', difficulty: 'Medium', usageCount: 12, createdDate: '2024-02-04' },
    { id: '21', text: 'Explain the CSS Box Model', type: 'Open Ended', topic: 'CSS Fundamentals', difficulty: 'Medium', usageCount: 17, createdDate: '2024-02-05' },
    { id: '22', text: 'Which CSS property is used to change text color?', type: 'MCQ', topic: 'CSS Styling', difficulty: 'Easy', usageCount: 29, createdDate: '2024-02-06' },
    { id: '23', text: 'Design a card component with hover effects', type: 'Coding', topic: 'CSS Animations', difficulty: 'Medium', usageCount: 7, createdDate: '2024-02-07' },
    { id: '24', text: 'What are CSS Grid advantages over Flexbox?', type: 'Open Ended', topic: 'CSS Grid', difficulty: 'Hard', usageCount: 10, createdDate: '2024-02-08' },
    
    // Node.js Questions
    { id: '25', text: 'What is the difference between require() and import?', type: 'MCQ', topic: 'Node.js Modules', difficulty: 'Medium', usageCount: 15, createdDate: '2024-02-09' },
    { id: '26', text: 'Build a REST API endpoint for user authentication', type: 'Coding', topic: 'Node.js API', difficulty: 'Hard', usageCount: 5, createdDate: '2024-02-10' },
    { id: '27', text: 'Describe middleware in Express.js', type: 'Open Ended', topic: 'Express.js', difficulty: 'Medium', usageCount: 18, createdDate: '2024-02-11' },
    { id: '28', text: 'Which module is used for file system operations in Node.js?', type: 'MCQ', topic: 'Node.js Core', difficulty: 'Easy', usageCount: 23, createdDate: '2024-02-12' },
    { id: '29', text: 'Create a simple HTTP server using Node.js', type: 'Coding', topic: 'Node.js HTTP', difficulty: 'Easy', usageCount: 20, createdDate: '2024-02-13' },
    { id: '30', text: 'How does Node.js handle asynchronous operations?', type: 'Open Ended', topic: 'Node.js Async', difficulty: 'Hard', usageCount: 8, createdDate: '2024-02-14' },
    
    // Database Questions
    { id: '31', text: 'What is the difference between SQL and NoSQL databases?', type: 'MCQ', topic: 'Database Concepts', difficulty: 'Medium', usageCount: 27, createdDate: '2024-02-15' },
    { id: '32', text: 'Write a SQL query to find duplicate records', type: 'Coding', topic: 'SQL Queries', difficulty: 'Hard', usageCount: 4, createdDate: '2024-02-16' },
    { id: '33', text: 'Explain database normalization', type: 'Open Ended', topic: 'Database Design', difficulty: 'Hard', usageCount: 9, createdDate: '2024-02-17' },
    { id: '34', text: 'Which command is used to create a table in SQL?', type: 'MCQ', topic: 'SQL DDL', difficulty: 'Easy', usageCount: 30, createdDate: '2024-02-18' }
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
      case 'Open Ended': return 'bg-secondary-light text-secondary-dark';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const questionColumns = [
    { key: 'text', label: 'Question' },
    { key: 'type', label: 'Type' },
    { key: 'topic', label: 'Topic' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'usageCount', label: 'Usage Count' },
    { key: 'createdDate', label: 'Created' },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const formatQuestionData = (question: Question) => ({
    ...question,
    text: (
      <div 
        className="max-w-md cursor-pointer hover:text-primary"
        onClick={() => handlePreviewQuestion(question.id)}
      >
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
    createdDate: new Date(question.createdDate).toLocaleDateString(),
    actions: (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEditQuestion(question.id)}
          className="h-8 w-8 hover:bg-primary hover:text-white"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteQuestion(question.id)}
          className="h-8 w-8 text-destructive hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  });

  const handleCreateQuestion = () => {
    console.log('Question created');
    setIsCreateDialogOpen(false);
  };

  const handleCreateTypeSelect = (type: 'MCQ' | 'Coding' | 'Open Ended') => {
    if (type === 'Open Ended') {
      setIsOpenEndedModalOpen(true);
    } else if (type === 'MCQ') {
      setIsMCQModalOpen(true);
    } else {
      setCreateType(type);
      setIsCreateDialogOpen(true);
    }
  };

  const handlePreviewQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setIsPreviewModalOpen(true);
    }
  };

  const handleEditQuestion = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      setSelectedQuestion(question);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log('Delete question:', questionId);
    // In a real app, this would show a confirmation dialog
  };

  const renderQuestionCreator = () => {
    switch (createType) {
      case 'Coding':
        return (
          <CodingProblemEditor
            mode="create"
            initialData={{
              title: '',
              problemStatement: '',
              constraints: '',
              difficulty: '',
              topic: '',
              testCases: [{
                id: `test-${Date.now()}`,
                inputs: [{
                  id: `input-${Date.now()}`,
                  type: 'int',
                  value: ''
                }],
                outputType: 'int',
                expectedOutput: '',
                isHidden: false
              }]
            }}
            onSave={(data) => {
              handleCreateQuestion();
            }}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl mb-2">Question Bank ({questions.length})</h1>
          <p className="text-muted-foreground">
            Centralized repository for all assessment questions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsManageTopicsOpen(true)}
            className="shadow-4dp"
          >
            <Settings className="h-4 w-4 mr-2" />
            Manage Topics
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary hover:bg-primary-dark shadow-4dp">
                <Plus className="h-4 w-4 mr-2" />
                Create Question
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCreateTypeSelect('MCQ')}>
                Multiple Choice Question
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateTypeSelect('Coding')}>
                Coding Problem
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateTypeSelect('Open Ended')}>
                Open Ended Question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Questions Table */}
      <div>
        <DataTable
          data={questions.map(formatQuestionData)}
          columns={questionColumns}
          searchable
          filterable
          itemsPerPage={20}
          itemsPerPageOptions={[10, 20, 50, 100]}
        />
      </div>

      {/* Create Question Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Create {createType === 'Open Ended' ? 'Open Ended Question' : createType === 'MCQ' ? 'Multiple Choice Question' : 'Coding Problem'}
            </DialogTitle>
          </DialogHeader>
          
          {renderQuestionCreator()}
        </DialogContent>
      </Dialog>

      {/* Modals */}
      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
      />
      
      <ManageTopicsModal
        isOpen={isManageTopicsOpen}
        onClose={() => setIsManageTopicsOpen(false)}
      />
      
      <OpenEndedCreatorModal
        isOpen={isOpenEndedModalOpen}
        onClose={() => setIsOpenEndedModalOpen(false)}
      />
      
      <MCQCreatorModal
        isOpen={isMCQModalOpen}
        onClose={() => setIsMCQModalOpen(false)}
      />

      {/* Question Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Question Preview
            </DialogTitle>
          </DialogHeader>
          
          {selectedQuestion && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={getTypeColor(selectedQuestion.type)} variant="outline">
                  {selectedQuestion.type}
                </Badge>
                <Badge className={getDifficultyColor(selectedQuestion.difficulty)} variant="outline">
                  {selectedQuestion.difficulty}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Topic: {selectedQuestion.topic}
                </span>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Question:</h3>
                <p className="text-base">{selectedQuestion.text}</p>
              </div>
              
              <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                <span>Usage Count: {selectedQuestion.usageCount}</span>
                <span>Created: {new Date(selectedQuestion.createdDate).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Question Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Question - {selectedQuestion?.type}
            </DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto">
            {selectedQuestion && selectedQuestion.type === 'Coding' && (
              <CodingProblemEditor
                mode="edit"
                initialData={{
                  title: selectedQuestion.text,
                  description: selectedQuestion.text,
                  difficulty: selectedQuestion.difficulty as 'Easy' | 'Medium' | 'Hard',
                  topic: selectedQuestion.topic,
                  testCases: [],
                  starterCode: '',
                  solution: ''
                }}
                onSave={() => setIsEditModalOpen(false)}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}
            {selectedQuestion && selectedQuestion.type === 'MCQ' && (
              <div className="space-y-4 p-4">
                <div className="text-center text-muted-foreground">
                  MCQ Editor would be displayed here
                  <p className="text-sm mt-2">Question: {selectedQuestion.text}</p>
                </div>
              </div>
            )}
            {selectedQuestion && selectedQuestion.type === 'Open Ended' && (
              <div className="space-y-4 p-4">
                <div className="text-center text-muted-foreground">
                  Open Ended Editor would be displayed here
                  <p className="text-sm mt-2">Question: {selectedQuestion.text}</p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionBankPage;
