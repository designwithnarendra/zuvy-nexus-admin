'use client'

import { useState, useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  CheckSquare, 
  Code, 
  MessageSquare, 
  ClipboardCheck,
  BookOpen
} from 'lucide-react';
import { ContentItemGrid } from './submissions/ContentItemGrid';

// Mock submission types
const submissionTypes = [
  { id: 'assessments', label: 'Assessments', icon: ClipboardCheck },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'projects', label: 'Projects', icon: BookOpen },
  { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
  { id: 'coding', label: 'Coding Problems', icon: Code },
  { id: 'feedback', label: 'Feedback Forms', icon: MessageSquare },
];

interface SubmissionsTabProps {
  courseId: string;
  initialSubmissionType?: string | null;
}

const SubmissionsTab = ({ courseId, initialSubmissionType }: SubmissionsTabProps) => {
  const [activeSubmissionType, setActiveSubmissionType] = useState(
    initialSubmissionType || 'assessments'
  );
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // Update active tab when initialSubmissionType changes
  useEffect(() => {
    if (initialSubmissionType) {
      setActiveSubmissionType(initialSubmissionType);
    }
  }, [initialSubmissionType]);

  useEffect(() => {
    const updateUnderline = () => {
      if (!tabsListRef.current) return;

      const activeTabElement = tabsListRef.current.querySelector<HTMLElement>(
        `[data-submission-tab="${activeSubmissionType}"]`
      );

      if (!activeTabElement) return;

      setUnderlineStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    };

    updateUnderline();
    window.addEventListener('resize', updateUnderline);

    return () => {
      window.removeEventListener('resize', updateUnderline);
    };
  }, [activeSubmissionType]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course Submissions</h2>
      </div>

      <Tabs
        value={activeSubmissionType}
        onValueChange={setActiveSubmissionType}
        className="w-full"
      >
        <TabsList
          ref={tabsListRef}
          className="relative grid w-full rounded-none border-b bg-transparent p-0 h-auto"
          style={{ gridTemplateColumns: `repeat(${submissionTypes.length}, 1fr)` }}>
          {submissionTypes.map(type => (
            <TabsTrigger 
              key={type.id} 
              value={type.id}
              data-submission-tab={type.id}
              className="relative z-10 flex items-center gap-2 rounded-none border-b-2 border-b-transparent bg-transparent px-4 py-3 font-medium text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground"
            >
              <type.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{type.label}</span>
            </TabsTrigger>
          ))}
          <span
            className="pointer-events-none absolute bottom-0 block h-0.5 bg-primary transition-[left,width] duration-300 ease-out"
            style={{ left: `${underlineStyle.left}px`, width: `${underlineStyle.width}px` }}
            aria-hidden="true"
          />
        </TabsList>

        {submissionTypes.map(type => (
          <TabsContent key={type.id} value={type.id} className="mt-6">
            <ContentItemGrid 
              courseId={courseId}
              submissionType={type.id}
              onSelectItem={() => {}} // Not used anymore since we navigate directly
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SubmissionsTab; 
