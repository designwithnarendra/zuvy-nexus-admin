
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import MCQCreator from './MCQCreator';
import CodingProblemCreator from './CodingProblemCreator';
import QuestionLibrary from './assessment-builder/QuestionLibrary';
import SelectedQuestions from './assessment-builder/SelectedQuestions';
import { Question } from './assessment-builder/types';

interface AssessmentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

const AssessmentBuilderModal = ({ isOpen, onClose, courseId }: AssessmentBuilderModalProps) => {
  const [view, setView] = useState<'main' | 'create'>('main');
  const [createType, setCreateType] = useState<'MCQ' | 'Coding'>('MCQ');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  const handleQuestionSelect = (question: Question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleQuestionRemove = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  const handleCreateNew = () => {
    console.log('Creating new assessment with questions:', selectedQuestions);
    onClose();
  };

  if (view === 'create') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView('main')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <DialogTitle className="font-heading text-xl">
                Create {createType} Question
              </DialogTitle>
            </div>
          </DialogHeader>
          
          {createType === 'MCQ' ? (
            <MCQCreator onSave={() => setView('main')} />
          ) : (
            <CodingProblemCreator onSave={() => setView('main')} />
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Assessment Builder</DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 h-[600px]">
          <QuestionLibrary
            onQuestionSelect={handleQuestionSelect}
            onCreateMCQ={() => {
              setCreateType('MCQ');
              setView('create');
            }}
            onCreateCoding={() => {
              setCreateType('Coding');
              setView('create');
            }}
          />
          
          <SelectedQuestions
            selectedQuestions={selectedQuestions}
            onQuestionRemove={handleQuestionRemove}
            onCreateAssessment={handleCreateNew}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentBuilderModal;
