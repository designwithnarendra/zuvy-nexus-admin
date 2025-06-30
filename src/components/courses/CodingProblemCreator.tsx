
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ProblemDetailsForm from './coding-creator/ProblemDetailsForm';
import TestCasesEditor from './coding-creator/TestCasesEditor';
import CreateTopicModal from './CreateTopicModal';

interface CodingProblemCreatorProps {
  onSave: () => void;
}

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

const CodingProblemCreator = ({ onSave }: CodingProblemCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [problemData, setProblemData] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty: '',
    points: 20,
    timeLimit: 1800,
    memoryLimit: 256,
    language: 'javascript'
  });

  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: '1', input: '', expectedOutput: '', isHidden: false },
    { id: '2', input: '', expectedOutput: '', isHidden: true }
  ]);

  const [starterCode, setStarterCode] = useState('// Write your solution here\nfunction solve() {\n    \n}');
  const [solutionCode, setSolutionCode] = useState('');

  const handleInputChange = (field: string, value: string | number) => {
    setProblemData(prev => ({ ...prev, [field]: value }));
  };

  const handleTestCaseChange = (testCaseId: string, field: string, value: string | boolean) => {
    setTestCases(prev => prev.map(tc =>
      tc.id === testCaseId ? { ...tc, [field]: value } : tc
    ));
  };

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: '',
      expectedOutput: '',
      isHidden: false
    };
    setTestCases([...testCases, newTestCase]);
  };

  const removeTestCase = (testCaseId: string) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== testCaseId));
    }
  };

  const handleSave = () => {
    console.log('Saving coding problem:', {
      problemData,
      testCases,
      starterCode,
      solutionCode
    });
    onSave();
  };

  return (
    <div className="space-y-6">
      <ProblemDetailsForm
        data={problemData}
        onDataChange={handleInputChange}
        onCreateTopic={() => setIsCreateTopicOpen(true)}
      />

      <Accordion type="multiple" defaultValue={["test-cases"]} className="space-y-4">
        <TestCasesEditor
          testCases={testCases}
          onTestCaseChange={handleTestCaseChange}
          onAddTestCase={addTestCase}
          onRemoveTestCase={removeTestCase}
        />

        <AccordionItem value="starter-code">
          <Card>
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <CardTitle className="text-lg">Starter Code</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Label className="text-sm">Initial code template for students</Label>
                  <Textarea
                    value={starterCode}
                    onChange={(e) => setStarterCode(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                    placeholder="// Provide starter code template..."
                  />
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>

        <AccordionItem value="solution">
          <Card>
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <CardTitle className="text-lg">Solution Code (Optional)</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Label className="text-sm">Reference solution for testing and grading</Label>
                  <Textarea
                    value={solutionCode}
                    onChange={(e) => setSolutionCode(e.target.value)}
                    className="min-h-[150px] font-mono text-sm"
                    placeholder="// Provide reference solution..."
                  />
                </div>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Problem
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

export default CodingProblemCreator;
