import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

interface CodingProblemData {
  title: string;
  description: string;
  problemStatement: string;
  testCases: TestCase[];
  allowedLanguages: string[];
  starterCode: string;
}

interface CodingProblemEditorProps {
  initialData?: CodingProblemData;
  onSave: (data: CodingProblemData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function CodingProblemEditor({ initialData, onSave, onCancel, mode }: CodingProblemEditorProps) {
  const availableLanguages = ['JavaScript', 'Python', 'Java', 'C++'];
  
  const [data, setData] = useState<CodingProblemData>(
    initialData || {
      title: '',
      description: '',
      problemStatement: '',
      testCases: [{
        id: `test-${Date.now()}`,
        input: '',
        expectedOutput: '',
        isHidden: false
      }],
      allowedLanguages: ['JavaScript', 'Python'],
      starterCode: '// Your code here'
    }
  );

  const handleChange = (field: keyof CodingProblemData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setData(prev => ({
        ...prev,
        allowedLanguages: [...prev.allowedLanguages, language]
      }));
    } else {
      setData(prev => ({
        ...prev,
        allowedLanguages: prev.allowedLanguages.filter(lang => lang !== language)
      }));
    }
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: `test-${Date.now()}`,
      input: '',
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter problem title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter a brief description"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="problemStatement">Problem Statement</Label>
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
            </div>
          ),
        },
        {
          id: 'testCases',
          label: 'Test Cases',
          content: (
            <div className="space-y-6">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">Test Cases ({data.testCases.length})</h3>
              </div>
              
              <div className="space-y-6">
                {data.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Test Case {index + 1}</h4>
                      <button
                        type="button"
                        className="text-sm text-destructive hover:underline"
                        onClick={() => removeTestCase(testCase.id)}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`input-${testCase.id}`}>Input</Label>
                        <Textarea
                          id={`input-${testCase.id}`}
                          value={testCase.input}
                          onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                          placeholder="Enter test case input"
                          rows={2}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`output-${testCase.id}`}>Expected Output</Label>
                        <Textarea
                          id={`output-${testCase.id}`}
                          value={testCase.expectedOutput}
                          onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                          placeholder="Enter expected output"
                          rows={2}
                        />
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
                <button
                  type="button"
                  className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
                  onClick={addTestCase}
                >
                  Add Test Case
                </button>
              </div>
            </div>
          ),
        },
        {
          id: 'codeSetup',
          label: 'Code Setup',
          content: (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Allowed Programming Languages</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`lang-${language}`}
                        checked={data.allowedLanguages.includes(language)}
                        onCheckedChange={(checked) => handleLanguageChange(language, checked === true)}
                      />
                      <Label htmlFor={`lang-${language}`} className="font-normal">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="starterCode">Starter Code</Label>
                <Textarea
                  id="starterCode"
                  value={data.starterCode}
                  onChange={(e) => handleChange('starterCode', e.target.value)}
                  placeholder="// Provide starter code for students"
                  className="font-mono"
                  rows={10}
                />
                <p className="text-sm text-muted-foreground">
                  This code will be pre-populated in the student's code editor
                </p>
              </div>
            </div>
          ),
        },
      ]}
    >
      {/* Children is required but not used when tabs are provided */}
      <></>
    </BaseEditor>
  );
} 