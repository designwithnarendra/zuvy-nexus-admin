
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';

interface Question {
  id: string;
  type: 'MCQ' | 'Coding' | 'True/False' | 'Fill in the Blank';
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  points: number;
}

interface QuestionLibraryProps {
  onQuestionSelect: (question: Question) => void;
  onCreateMCQ: () => void;
  onCreateCoding: () => void;
}

const QuestionLibrary = ({ onQuestionSelect, onCreateMCQ, onCreateCoding }: QuestionLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-light text-success-dark border-success';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Hard': return 'bg-destructive-light text-destructive-dark border-destructive';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
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
          <Button variant="outline" size="sm" onClick={onCreateMCQ}>
            <Plus className="h-4 w-4 mr-2" />
            Create MCQ
          </Button>
          <Button variant="outline" size="sm" onClick={onCreateCoding}>
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
            onClick={() => onQuestionSelect(question)}
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
  );
};

export default QuestionLibrary;
