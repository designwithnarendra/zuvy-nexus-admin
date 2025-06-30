
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface QuizCreatorProps {
  onSave: () => void;
}

const QuizCreator = ({ onSave }: QuizCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    topic: '',
    timeLimit: 30,
    attempts: 1,
    shuffleQuestions: true,
    showResults: true,
    passingScore: 70
  });

  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];

  // Dummy questions for selection
  const availableQuestions = [
    { id: '1', title: 'What is the correct way to declare a variable in JavaScript?', type: 'MCQ', points: 5 },
    { id: '2', title: 'Explain the concept of closures in JavaScript', type: 'Short Answer', points: 10 },
    { id: '3', title: 'Which method is used to add an element to the end of an array?', type: 'MCQ', points: 5 }
  ];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionSelect = (question: any) => {
    if (!selectedQuestions.find(q => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const removeQuestion = (questionId: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== questionId));
  };

  const handleSave = () => {
    console.log('Saving quiz:', { quizData, selectedQuestions });
    onSave();
  };

  const totalPoints = selectedQuestions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quiz Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quiz-title">Quiz Title *</Label>
            <Input
              id="quiz-title"
              placeholder="e.g., JavaScript Fundamentals Quiz"
              value={quizData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what this quiz covers..."
              value={quizData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Topic *</Label>
            <div className="flex gap-2">
              <Select value={quizData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateTopicOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quiz Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-limit">Time Limit (minutes)</Label>
              <Input
                id="time-limit"
                type="number"
                min="5"
                value={quizData.timeLimit}
                onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attempts">Attempts Allowed</Label>
              <Select value={quizData.attempts.toString()} onValueChange={(value) => handleInputChange('attempts', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Attempt</SelectItem>
                  <SelectItem value="2">2 Attempts</SelectItem>
                  <SelectItem value="3">3 Attempts</SelectItem>
                  <SelectItem value="-1">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passing-score">Passing Score (%)</Label>
            <Input
              id="passing-score"
              type="number"
              min="0"
              max="100"
              value={quizData.passingScore}
              onChange={(e) => handleInputChange('passingScore', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={quizData.shuffleQuestions}
                onCheckedChange={(checked) => handleInputChange('shuffleQuestions', checked as boolean)}
              />
              <Label>Shuffle questions order</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={quizData.showResults}
                onCheckedChange={(checked) => handleInputChange('showResults', checked as boolean)}
              />
              <Label>Show results immediately after submission</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availableQuestions
                .filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((question) => (
                <div
                  key={question.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleQuestionSelect(question)}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm line-clamp-2">{question.title}</h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {question.points} pts
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{question.type}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Selected Questions ({selectedQuestions.length})
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Total Points: {totalPoints}
            </p>
          </CardHeader>
          <CardContent className="space-y-2 max-h-60 overflow-y-auto">
            {selectedQuestions.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                No questions selected yet
              </p>
            ) : (
              selectedQuestions.map((question) => (
                <div key={question.id} className="p-3 bg-card-light rounded-lg border">
                  <div className="flex items-start justify-between">
                    <h5 className="font-medium text-sm line-clamp-2">{question.title}</h5>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(question.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{question.type}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{question.points} pts</span>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={selectedQuestions.length === 0}
          className="bg-primary hover:bg-primary-dark"
        >
          Create Quiz
        </Button>
      </div>

      <CreateTopicModal
        isOpen={isCreateTopicOpen}
        onClose={() => setIsCreateTopicOpen(false)}
        onTopicCreated={(topic) => {
          handleInputChange('topic', topic);
          setIsCreateTopicOpen(false);
        }}
      />
    </div>
  );
};

export default QuizCreator;
