
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, BookOpen, Users, Settings } from 'lucide-react';
import GeneralDetailsTab from './GeneralDetailsTab';
import CurriculumTab from './CurriculumTab';
import StudentsTab from './StudentsTab';
import SettingsTab from './SettingsTab';

interface CourseViewTabsProps {
  courseId: string;
}

const CourseViewTabs = ({ courseId }: CourseViewTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-card border border-border rounded-lg p-1">
        <TabsTrigger 
          value="general" 
          className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">General Details</span>
          <span className="sm:hidden">General</span>
        </TabsTrigger>
        <TabsTrigger 
          value="curriculum"
          className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Curriculum</span>
          <span className="sm:hidden">Content</span>
        </TabsTrigger>
        <TabsTrigger 
          value="students"
          className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Students & Performance</span>
          <span className="sm:hidden">Students</span>
        </TabsTrigger>
        <TabsTrigger 
          value="settings"
          className="flex items-center justify-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
        
        <TabsContent value="settings" className="mt-0">
          <SettingsTab courseId={courseId} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default CourseViewTabs;
