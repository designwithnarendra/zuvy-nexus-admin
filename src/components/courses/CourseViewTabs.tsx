
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, BookOpen, Users, Settings, FileText, UserCheck } from 'lucide-react';
import GeneralDetailsTab from './GeneralDetailsTab';
import CurriculumTab from './CurriculumTab';
import StudentsTab from './StudentsTab';
import SettingsTab from './SettingsTab';
import SubmissionsTab from './SubmissionsTab';
import BatchesTab from './BatchesTab';

interface CourseViewTabsProps {
  courseId: string;
}

const CourseViewTabs = ({ courseId }: CourseViewTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-card border border-border rounded-lg p-1 h-12">
        <TabsTrigger 
          value="general" 
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">General Details</span>
          <span className="sm:hidden">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="curriculum"
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Curriculum</span>
          <span className="sm:hidden">Content</span>
        </TabsTrigger>
        <TabsTrigger 
          value="students"
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Students</span>
          <span className="sm:hidden">Students</span>
        </TabsTrigger>
        <TabsTrigger 
          value="batches"
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <UserCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Batches</span>
          <span className="sm:hidden">Batches</span>
        </TabsTrigger>
        <TabsTrigger 
          value="submissions"
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Submissions</span>
          <span className="sm:hidden">Submits</span>
        </TabsTrigger>
        <TabsTrigger 
          value="settings"
          className="flex items-center justify-center gap-2 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </TabsTrigger>
      </TabsList>

      <div className="mt-6">
        <TabsContent value="general" className="mt-0">
          <GeneralDetailsTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="curriculum" className="mt-0">
          <CurriculumTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="students" className="mt-0">
          <StudentsTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="batches" className="mt-0">
          <BatchesTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="submissions" className="mt-0">
          <SubmissionsTab courseId={courseId} />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <SettingsTab courseId={courseId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default CourseViewTabs;
