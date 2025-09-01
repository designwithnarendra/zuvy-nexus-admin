import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2 } from 'lucide-react';

interface TestCaseInput {
  id: string;
  type: string;
  value: string;
}

interface TestCase {
  id: string;
  inputs: TestCaseInput[];
  outputType: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface CodingProblemData {
  title: string;
  problemStatement: string;
  constraints: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '';
  topic: string;
  testCases: TestCase[];
}

interface CodingProblemEditorProps {
  initialData?: CodingProblemData;
  onSave: (data: CodingProblemData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function CodingProblemEditor({ initialData, onSave, onCancel, mode }: CodingProblemEditorProps) {
  const availableTopics = [
    'JavaScript Basics',
    'React Fundamentals', 
    'Node.js',
    'Algorithms',
    'Data Structures',
    'CSS Layout',
    'TypeScript',
    'Database Concepts',
    'System Design',
    'Web APIs',
    'Testing',
    'Performance Optimization'
  ];
  const dataTypes = ['int', 'str', 'float', 'array', 'object', 'boolean'];
  
  const [data, setData] = useState<CodingProblemData>(
    initialData || {
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
    }
  );

  const handleChange = (field: keyof CodingProblemData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: `test-${Date.now()}`,
      inputs: [{
        id: `input-${Date.now()}`,
        type: 'int',
        value: ''
      }],
      outputType: 'int',
      expectedOutput: '',
      isHidden: false
    };
    
    setData(prev => ({
      ...prev,
      testCases: [...prev.testCases, newTestCase]
    }));
  };

  const updateTestCase = (id: string, field: keyof TestCase, value: any) => {
    setData(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc => 
        tc.id === id ? { ...tc, [field]: value } : tc
      )
    }));
  };

  const addTestCaseInput = (testCaseId: string) => {
    const newInput: TestCaseInput = {
      id: `input-${Date.now()}`,
      type: 'int',
      value: ''
    };
    
    setData(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc => 
        tc.id === testCaseId ? { ...tc, inputs: [...tc.inputs, newInput] } : tc
      )
    }));
  };

  const removeTestCaseInput = (testCaseId: string, inputId: string) => {
    setData(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc => 
        tc.id === testCaseId ? { 
          ...tc, 
          inputs: tc.inputs.filter(input => input.id !== inputId)
        } : tc
      )
    }));
  };

  const updateTestCaseInput = (testCaseId: string, inputId: string, field: keyof TestCaseInput, value: string) => {
    setData(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc => 
        tc.id === testCaseId ? {
          ...tc,
          inputs: tc.inputs.map(input => 
            input.id === inputId ? { ...input, [field]: value } : input
          )
        } : tc
      )
    }));
  };

  const removeTestCase = (id: string) => {
    setData(prev => ({
      ...prev,
      testCases: prev.testCases.filter(tc => tc.id !== id)
    }));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Coding Problem' : 'Save Changes'}
      </Button>
    </>
  );

  return (
    <BaseEditor
      type="coding"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
      tabs={[
        {
          id: 'details',
          label: 'Details',
          content: (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter problem title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="problemStatement" className="font-semibold">Problem Statement</Label>
                <Textarea
                  id="problemStatement"
                  value={data.problemStatement}
                  onChange={(e) => handleChange('problemStatement', e.target.value)}
                  placeholder="Enter detailed problem statement with examples"
                  rows={8}
                />
                <p className="text-sm text-muted-foreground">
                  You can use markdown for formatting code blocks, lists, etc.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constraints" className="font-semibold">Constraints</Label>
                <Textarea
                  id="constraints"
                  value={data.constraints}
                  onChange={(e) => handleChange('constraints', e.target.value)}
                  placeholder="Enter constraints (e.g., 1 ≤ n ≤ 10^5, time limit: 2s)"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-semibold">Difficulty</Label>
                  <RadioGroup
                    value={data.difficulty}
                    onValueChange={(value) => handleChange('difficulty', value)}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Easy" id="easy" />
                      <Label htmlFor="easy" className="font-normal">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="medium" />
                      <Label htmlFor="medium" className="font-normal">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hard" id="hard" />
                      <Label htmlFor="hard" className="font-normal">Hard</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Topic</Label>
                  <Select value={data.topic} onValueChange={(value) => handleChange('topic', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTopics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: 'testCases',
          label: 'Test Cases',
          content: (
            <div className="space-y-6">
              <div className="space-y-6">
                {data.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h6 className="text-base font-semibold">Test Case {index + 1}</h6>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTestCase(testCase.id)}
                        className="text-destructive hover:text-destructive-dark"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="font-semibold">Input</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addTestCaseInput(testCase.id)}
                              className="text-primary hover:text-primary-dark"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Input
                            </Button>
                          </div>
                          
                          <div className="space-y-3">
                            {testCase.inputs.map((input, inputIndex) => (
                              <div key={input.id} className="flex items-center gap-3">
                                <Select
                                  value={input.type}
                                  onValueChange={(value) => updateTestCaseInput(testCase.id, input.id, 'type', value)}
                                >
                                  <SelectTrigger className="w-28">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {dataTypes.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                <Input
                                  value={input.value}
                                  onChange={(e) => updateTestCaseInput(testCase.id, input.id, 'value', e.target.value)}
                                  placeholder={`Add a ${input.type} (e.g., ${
                                    input.type === 'int' ? '42' :
                                    input.type === 'str' ? 'hello world' :
                                    input.type === 'float' ? '3.14' :
                                    input.type === 'array' ? '[1, 2, 3]' :
                                    input.type === 'object' ? '{"key": "value"}' :
                                    'true'
                                  })`}
                                  className="flex-1"
                                />
                                
                                {testCase.inputs.length > 1 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTestCaseInput(testCase.id, input.id)}
                                    className="text-destructive hover:text-destructive-dark"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="font-semibold">Output</Label>
                        <div className="flex items-center gap-3">
                          <Select
                            value={testCase.outputType}
                            onValueChange={(value) => updateTestCase(testCase.id, 'outputType', value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {dataTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Input
                            value={testCase.expectedOutput}
                            onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                            placeholder={`Add a ${testCase.outputType} (e.g., ${
                              testCase.outputType === 'int' ? '42' :
                              testCase.outputType === 'str' ? 'hello world' :
                              testCase.outputType === 'float' ? '3.14' :
                              testCase.outputType === 'array' ? '[1, 2, 3]' :
                              testCase.outputType === 'object' ? '{"key": "value"}' :
                              'true'
                            })`}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`hidden-${testCase.id}`}
                          checked={testCase.isHidden}
                          onCheckedChange={(checked) => updateTestCase(testCase.id, 'isHidden', checked === true)}
                        />
                        <Label htmlFor={`hidden-${testCase.id}`} className="font-normal">
                          Hidden test case (not visible to students)
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={addTestCase}
                  className="text-primary hover:text-primary-dark"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </div>
            </div>
          ),
        }
      ]}
    >
      {/* Children is required but not used when tabs are provided */}
      <></>
    </BaseEditor>
  );
} 