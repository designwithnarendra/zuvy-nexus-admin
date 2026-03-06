'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Search, X, ArrowRight } from 'lucide-react';
import { useUnsavedChanges } from '../curriculum/useUnsavedChanges';
import { useToast } from '@/hooks/use-toast';

// Mock data for coding problems
const MOCK_CODING_PROBLEMS = [
  {
    id: 'cp-001',
    title: 'Multiply Two Numbers',
    difficulty: 'Easy' as const,
    topics: ['Maths'],
    description: 'Input int int Output int x int = int',
  },
  {
    id: 'cp-002',
    title: 'Check Even or Odd number',
    difficulty: 'Easy' as const,
    topics: ['Array'],
    description: 'If the number is even, return "Even" if th...',
  },
  {
    id: 'cp-003',
    title: 'Sum of Two Numbers',
    difficulty: 'Easy' as const,
    topics: ['Array'],
    description: 'You are given two integers A and B. Your t...',
  },
  {
    id: 'cp-004',
    title: 'total vowels',
    difficulty: 'Easy' as const,
    topics: ['Python'],
    description: 'Count Vowels in a String',
  },
];

// Mock data for MCQ questions
const MOCK_MCQ_QUESTIONS = [
  {
    id: 'mcq-001',
    title: 'JavaScript Variable Declaration',
    difficulty: 'Easy' as const,
    topics: ['JavaScript', 'Variables'],
    question: 'Which of the following is the correct way to declare a variable in JavaScript?',
  },
  {
    id: 'mcq-002',
    title: 'React State Management',
    difficulty: 'Easy' as const,
    topics: ['React', 'State'],
    question: 'What hook is used to manage state in functional React components?',
  },
  {
    id: 'mcq-003',
    title: 'CSS Flexbox Layout',
    difficulty: 'Medium' as const,
    topics: ['CSS', 'Layout'],
    question: 'Which CSS property is used to change the direction of flex items?',
  },
  {
    id: 'mcq-004',
    title: 'Database Normalization',
    difficulty: 'Hard' as const,
    topics: ['Database', 'Normalization'],
    question: 'What is the main purpose of database normalization?',
  }
];

// Mock data for Open-Ended questions
const MOCK_OPENENDED_QUESTIONS = [
  {
    id: 'oe-001',
    title: 'Explain MVC Architecture',
    difficulty: 'Easy' as const,
    topics: ['Architecture', 'Design Patterns'],
    question: 'Explain the Model-View-Controller (MVC) architecture pattern and its benefits.',
  },
  {
    id: 'oe-002',
    title: 'Database Indexing Strategy',
    difficulty: 'Medium' as const,
    topics: ['Database', 'Performance'],
    question: 'Describe how database indexing works and when you should use it.',
  },
  {
    id: 'oe-003',
    title: 'Microservices vs Monolith',
    difficulty: 'Medium' as const,
    topics: ['Architecture', 'System Design'],
    question: 'Compare and contrast microservices architecture with monolithic architecture.',
  },
  {
    id: 'oe-004',
    title: 'Security Best Practices',
    difficulty: 'Hard' as const,
    topics: ['Security', 'Web Development'],
    question: 'Describe the OWASP Top 10 security vulnerabilities and how to prevent them.',
  }
];

type QuestionType = 'coding' | 'mcq' | 'open-ended';

interface SelectedQuestion {
  id: string;
  type: QuestionType;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AssessmentData {
  id?: string;
  title: string;
  description?: string;
  selectedQuestions: SelectedQuestion[];
}

interface AssessmentEditorProps {
  initialData?: AssessmentData;
  mode: 'create' | 'edit';
  onSave: (data: AssessmentData) => void;
  onCancel: () => void;
  onNext?: (data: AssessmentData) => void;
}

const DEFAULT_ASSESSMENT_DATA: AssessmentData = {
  title: '',
  description: '',
  selectedQuestions: [],
};

export function AssessmentEditor({
  initialData = DEFAULT_ASSESSMENT_DATA,
  mode,
  onSave,
  onCancel,
  onNext,
}: AssessmentEditorProps) {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    ...initialData,
    selectedQuestions: initialData.selectedQuestions || [],
  });
  const [activeTab, setActiveTab] = useState<QuestionType>('coding');
  const [searchTerm, setSearchTerm] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const unsavedChanges = useUnsavedChanges();
  const { toast } = useToast();

  // Handle input changes
  const handleInputChange = (field: keyof AssessmentData, value: any) => {
    setAssessmentData(prev => ({ ...prev, [field]: value }));
    unsavedChanges.markAsUnsaved();
  };

  // Watch for data changes to mark as unsaved
  useEffect(() => {
    const hasChanges = JSON.stringify(assessmentData) !== JSON.stringify(initialData);
    if (hasChanges) {
      unsavedChanges.markAsUnsaved();
    }
  }, [assessmentData, initialData]);

  // Get current question pool based on active tab
  const getCurrentQuestionPool = () => {
    switch (activeTab) {
      case 'coding':
        return MOCK_CODING_PROBLEMS;
      case 'mcq':
        return MOCK_MCQ_QUESTIONS;
      case 'open-ended':
        return MOCK_OPENENDED_QUESTIONS;
      default:
        return [];
    }
  };

  const currentPool = getCurrentQuestionPool();

  // Get unique topics and difficulties for current pool
  const allTopics = Array.from(new Set(currentPool.flatMap((q: any) => q.topics)));
  const allDifficulties = Array.from(new Set(currentPool.map((q: any) => q.difficulty)));

  // Filter questions based on search and filters
  const filteredQuestions = currentPool.filter((question: any) => {
    const matchesSearch = !searchTerm ||
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (question.question || question.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTopic = topicFilter === 'all' || question.topics.includes(topicFilter);
    const matchesDifficulty = difficultyFilter === 'all' || question.difficulty === difficultyFilter;

    return matchesSearch && matchesTopic && matchesDifficulty;
  });

  // Handle question selection
  const handleSelectQuestion = (question: any) => {
    const selectedQuestion: SelectedQuestion = {
      id: question.id,
      type: activeTab,
      title: question.title,
      difficulty: question.difficulty,
    };
    const updatedQuestions = [...(assessmentData.selectedQuestions || []), selectedQuestion];
    handleInputChange('selectedQuestions', updatedQuestions);
  };

  // Handle question deselection
  const handleDeselectQuestion = (questionId: string) => {
    const updatedQuestions = (assessmentData.selectedQuestions || []).filter(q => q.id !== questionId);
    handleInputChange('selectedQuestions', updatedQuestions);
  };

  // Check if question is selected
  const isQuestionSelected = (questionId: string) => {
    return assessmentData.selectedQuestions?.some(q => q.id === questionId) ?? false;
  };

  // Get counts by type
  const getQuestionCounts = () => {
    const counts = {
      coding: 0,
      mcq: 0,
      'open-ended': 0,
    };

    (assessmentData.selectedQuestions || []).forEach(q => {
      counts[q.type]++;
    });

    return counts;
  };

  const questionCounts = getQuestionCounts();

  // Handle Next button
  const handleNext = () => {
    if (!assessmentData.selectedQuestions || assessmentData.selectedQuestions.length === 0) {
      toast({
        title: "No questions selected",
        description: "Please select at least one question before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (onNext) {
      onNext(assessmentData);
      unsavedChanges.markAsSaved();
    }
  };

  // Handle cancel with unsaved changes check
  const handleCancel = () => {
    if (unsavedChanges.hasUnsavedChanges) {
      unsavedChanges.attemptAction(onCancel);
    } else {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Top Bar - Fixed */}
      <div className="flex justify-between items-center p-4 border-b bg-background shrink-0 w-full">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">
            {assessmentData.title || 'Untitled Assessment'}
          </h2>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-6 space-y-3">
            {/* Title input field - 480px fixed width, left-aligned */}
            <div className="w-[480px]">
              <Label htmlFor="assessment-title">Title</Label>
              <Input
                id="assessment-title"
                type="text"
                value={assessmentData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Assessment Title"
                className="mt-2"
              />
            </div>

            {/* Search and Filters - Search bar 480px, filters on same row */}
            <div className="flex gap-4 items-end">
              <div className="w-[480px]">
                <Label htmlFor="search-questions">Search By Name</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search-questions"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={topicFilter} onValueChange={setTopicFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Topics</SelectItem>
                  {allTopics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Any Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Difficulty</SelectItem>
                  {allDifficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs for question types */}
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as QuestionType)} className="flex-1 flex flex-col min-h-0">
            <TabsList className="w-fit">
              <TabsTrigger value="coding">
                Coding Problems ({questionCounts.coding})
              </TabsTrigger>
              <TabsTrigger value="mcq">
                MCQs ({questionCounts.mcq})
              </TabsTrigger>
              <TabsTrigger value="open-ended">
                Open-Ended Questions ({questionCounts['open-ended']})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="flex-1 flex gap-6 min-h-0 mt-4">
              {/* 4:6 Split Layout */}
              <div className="flex-1 flex gap-6 min-h-0">
                {/* Left Panel (40%) - Questions List */}
                <div className="w-2/5 border rounded-lg overflow-hidden flex flex-col">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-semibold text-sm">
                      {activeTab === 'coding' ? 'Coding Problem Library' :
                        activeTab === 'mcq' ? 'MCQ Library' :
                          'Open-Ended Question Library'} ({filteredQuestions.length})
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredQuestions.map((question: any) => {
                      const isSelected = isQuestionSelected(question.id);
                      return (
                        <div
                          key={question.id}
                          className={`border rounded-lg p-3 transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant={
                                  question.difficulty === 'Easy' ? 'default' :
                                    question.difficulty === 'Medium' ? 'secondary' : 'destructive'
                                } className="text-xs">
                                  {question.difficulty}
                                </Badge>
                                {question.topics.slice(0, 2).map((topic: string) => (
                                  <Badge key={topic} variant="outline" className="text-xs">{topic}</Badge>
                                ))}
                              </div>
                              <h4 className="font-medium text-sm mb-1">{question.title}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {question.question || question.description}
                              </p>
                            </div>
                            <Button
                              variant={isSelected ? "ghost" : "outline"}
                              size="sm"
                              className="shrink-0"
                              onClick={() => isSelected ? handleDeselectQuestion(question.id) : handleSelectQuestion(question)}
                            >
                              {isSelected ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Panel (60%) - Selected Questions */}
                <div className="w-3/5 border rounded-lg overflow-hidden flex flex-col">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-semibold text-sm">Selected Questions</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {assessmentData.selectedQuestions.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                        <div>
                          <p className="text-sm italic">No Selected questions</p>
                          <p className="text-xs mt-1">Select questions from the left panel to add them here</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {assessmentData.selectedQuestions.map((question, index) => (
                          <div key={question.id} className="border rounded-lg p-3 bg-white">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-medium text-muted-foreground">#{index + 1}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {question.type === 'coding' ? 'Coding' : question.type === 'mcq' ? 'MCQ' : 'Open-Ended'}
                                  </Badge>
                                  <Badge variant={
                                    question.difficulty === 'Easy' ? 'default' :
                                      question.difficulty === 'Medium' ? 'secondary' : 'destructive'
                                  } className="text-xs">
                                    {question.difficulty}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-sm">{question.title}</h4>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeselectQuestion(question.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Footer with action buttons */}
      <div className="border-t p-4 flex items-center justify-between bg-white">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleNext} className="bg-primary hover:bg-primary-mid">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
