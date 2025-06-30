
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, ChevronLeft, Trash2 } from 'lucide-react';
import MCQCreator from './MCQCreator';
import CodingProblemCreator from './CodingProblemCreator';

interface AssessmentBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
}

interface Question {
  id: string;
  type: 'MCQ' | 'Coding' | 'True/False' | 'Fill in the Blank';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  points: number;
}

const AssessmentBuilderModal = ({ isOpen, onClose, courseId }: AssessmentBuilderModalProps) => {
  const [view, setView] = useState<'main' | 'create'>('main');
  const [createType, setCreateType] = useState<'MCQ' | 'Coding'>('MCQ');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // Dummy questions data
  const availableQuestions: Question[] = [
    {
      id: '1',
      type: 'MCQ',
      title: 'What is the correct way to declare a variable in JavaScript?',
      difficulty: 'Easy',
      topic: 'JavaScript Basics',
      points: 5
    },
    {
      id: '2',
      type: 'Coding',
      title: 'Implement a function to reverse a string',
      difficulty: 'Medium',
      topic: 'Algorithms',
      points: 15
    },
    {
      id: '3',
      type: 'MCQ',
      title: 'Which of the following is NOT a JavaScript data type?',
      difficulty: 'Easy',
      topic: 'JavaScript Basics',
      points: 5
    },
    {
      id: '4',
      type: 'True/False',
      title: 'React is a JavaScript library for building user interfaces',
      difficulty: 'Easy',
      topic: 'React',
      points: 3
    }
  ];

  const filteredQuestions = availableQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || q.type === filterType;
    const matchesDifficulty = !filterDifficulty || q.difficulty === filterDifficulty;
    return matchesSearch && matchesType && matchesDifficulty;
  });

  const handleQuestionSelect = (question: Question) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleQuestionRemove = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

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
          {/* Left Panel - Question Library */}
          <div className="flex-1 flex flex-col">
            <div className="space-y-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Question Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="MCQ">MCQ</SelectItem>
                    <SelectItem value="Coding">Coding</SelectItem>
                    <SelectItem value="True/False">True/False</SelectItem>
                    <SelectItem value="Fill in the Blank">Fill in the Blank</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCreateType('MCQ');
                    setView('create');
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create MCQ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCreateType('Coding');
                    setView('create');
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Coding Problem
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleQuestionSelect(question)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{question.title}</h4>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary">{question.type}</Badge>
                    <span>{question.topic}</span>
                    <span>•</span>
                    <span>{question.points} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Panel - Selected Questions */}
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
                            onClick={() => handleQuestionRemove(question.id)}
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
                onClick={handleCreateNew}
                className="w-full bg-primary hover:bg-primary-dark"
                disabled={selectedQuestions.length === 0}
              >
                Create Assessment
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentBuilderModal;
