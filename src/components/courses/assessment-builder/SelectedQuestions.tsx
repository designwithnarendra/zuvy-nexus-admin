
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface Question {
  id: string;
  type: 'MCQ' | 'Coding' | 'True/False' | 'Fill in the Blank';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  points: number;
}

interface SelectedQuestionsProps {
  selectedQuestions: Question[];
  onQuestionRemove: (questionId: string) => void;
  onCreateAssessment: () => void;
}

const SelectedQuestions = ({ selectedQuestions, onQuestionRemove, onCreateAssessment }: SelectedQuestionsProps) => {
  const groupedSelectedQuestions = selectedQuestions.reduce((acc, question) => {
    if (!acc[question.type]) {
      acc[question.type] = [];
    }
    acc[question.type].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-light text-success-dark border-success';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Hard': return 'bg-destructive-light text-destructive-dark border-destructive';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="w-80 border-l pl-6 flex flex-col">
      <div className="mb-4">
        <h3 className="font-medium text-sm mb-2">Selected Questions ({selectedQuestions.length})</h3>
        <p className="text-xs text-muted-foreground">
          Total Points: {selectedQuestions.reduce((sum, q) => sum + q.points, 0)}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4">
        {Object.entries(groupedSelectedQuestions).map(([type, questions]) => (
          <div key={type}>
            <h4 className="font-medium text-sm mb-2 text-muted-foreground">{type} Questions</h4>
            <div className="space-y-2">
              {questions.map((question) => (
                <div key={question.id} className="p-3 bg-card-light rounded-lg border">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-xs line-clamp-2">{question.title}</h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onQuestionRemove(question.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge className={getDifficultyColor(question.difficulty)} variant="outline">
                      {question.difficulty}
                    </Badge>
                    <span>{question.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <Button 
          onClick={onCreateAssessment}
          className="w-full bg-primary hover:bg-primary-dark"
          disabled={selectedQuestions.length === 0}
        >
          Create Assessment
        </Button>
      </div>
    </div>
  );
};

export default SelectedQuestions;
