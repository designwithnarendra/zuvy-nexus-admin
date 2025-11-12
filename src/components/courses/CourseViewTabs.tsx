
'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, BookOpen, Users, Settings, FileText, UserCheck } from 'lucide-react';
import GeneralDetailsTab from './GeneralDetailsTab';
import CurriculumTab from './CurriculumTab';
import StudentsTab from './StudentsTab';
import SettingsTab from './SettingsTab';
import SubmissionsTab from './SubmissionsTab';
import BatchesTab from './BatchesTab';
import { useUser } from '@/contexts/UserContext';

interface CourseViewTabsProps {
  courseId: string;
}

const CourseViewTabs = ({ courseId }: CourseViewTabsProps) => {
  const searchParams = useSearchParams();
  const { isInstructor } = useUser();
  const [activeTab, setActiveTab] = useState('general');
  const [batchFilter, setBatchFilter] = useState<string | null>(null);
  const [initialSubmissionType, setInitialSubmissionType] = useState<string | null>(null);
  const studentsTabRef = useRef<HTMLDivElement>(null);

  // Define available tabs based on role
  const availableTabs = useMemo(() => {
    const allTabs = [
      { value: 'general', label: 'General Details', shortLabel: 'General', icon: Info },
      { value: 'curriculum', label: 'Curriculum', shortLabel: 'Content', icon: BookOpen },
      { value: 'students', label: 'Students', shortLabel: 'Students', icon: Users },
      { value: 'batches', label: 'Batches', shortLabel: 'Batches', icon: UserCheck, adminOnly: true },
      { value: 'submissions', label: 'Submissions', shortLabel: 'Submits', icon: FileText },
      { value: 'settings', label: 'Settings', shortLabel: 'Settings', icon: Settings, adminOnly: true }
    ];

    if (isInstructor()) {
      return allTabs.filter(tab => !tab.adminOnly);
    }

    return allTabs;
  }, [isInstructor]);

  // Calculate grid columns based on number of tabs
  const gridCols = availableTabs.length;

  // Check URL parameters on mount
  useEffect(() => {
    const tab = searchParams.get('tab');
    const submissionType = searchParams.get('submissionType');
    
    if (tab) {
      setActiveTab(tab);
    }
    
    if (submissionType) {
      setInitialSubmissionType(submissionType);
    }
  }, [searchParams]);

  // Listen for navigation events from BatchesTab
  useEffect(() => {
    const handleNavigateToStudents = (event: CustomEvent) => {
      const { batchName } = event.detail;
      setBatchFilter(batchName);
      setActiveTab('students');
      
      // Scroll to students tab after it renders
      setTimeout(() => {
        studentsTabRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    };

    window.addEventListener('navigateToStudents', handleNavigateToStudents as EventListener);

    return () => {
      window.removeEventListener('navigateToStudents', handleNavigateToStudents as EventListener);
    };
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className="grid w-full bg-card border border-border rounded-lg p-1 h-12"
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        {availableTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center justify-center gap-2 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      <div className="mt-6">
        <TabsContent value="general" className="mt-0">
          <GeneralDetailsTab courseId={courseId} />
        </TabsContent>

        <TabsContent value="curriculum" className="mt-0">
          <CurriculumTab courseId={courseId} />
        </TabsContent>

        <TabsContent value="students" className="mt-0" ref={studentsTabRef}>
          <StudentsTab courseId={courseId} initialBatchFilter={batchFilter} />
        </TabsContent>

        {!isInstructor() && (
          <TabsContent value="batches" className="mt-0">
            <BatchesTab courseId={courseId} />
          </TabsContent>
        )}

        <TabsContent value="submissions" className="mt-0">
          <SubmissionsTab courseId={courseId} initialSubmissionType={initialSubmissionType} />
        </TabsContent>

        {!isInstructor() && (
          <TabsContent value="settings" className="mt-0">
            <SettingsTab courseId={courseId} />
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
};

export default CourseViewTabs;
