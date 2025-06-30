
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface SettingsTabProps {
  courseId: string;
}

const SettingsTab = ({ courseId }: SettingsTabProps) => {
  const [settings, setSettings] = useState({
    isPublished: true,
    allowSelfEnrollment: false,
    enableDiscussions: true,
    sendNotifications: true,
    requireCompletion: true,
    showLeaderboard: false
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Implementation would save to backend
  };

  const handleDeleteCourse = () => {
    console.log('Deleting course:', courseId);
    // Implementation would delete course
    setIsDeleteDialogOpen(false);
  };

  const settingItems = [
    {
      key: 'isPublished',
      label: 'Published',
      description: 'Make this course visible to students'
    },
    {
      key: 'allowSelfEnrollment',
      label: 'Allow Self-Enrollment',
      description: 'Students can enroll themselves without admin approval'
    },
    {
      key: 'enableDiscussions',
      label: 'Enable Discussions',
      description: 'Allow students to participate in course discussions'
    },
    {
      key: 'sendNotifications',
      label: 'Send Notifications',
      description: 'Send email notifications for course updates and deadlines'
    },
    {
      key: 'requireCompletion',
      label: 'Require Sequential Completion',
      description: 'Students must complete modules in order'
    },
    {
      key: 'showLeaderboard',
      label: 'Show Leaderboard',
      description: 'Display student rankings and progress comparisons'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Course Settings */}
      <Card className="shadow-4dp">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Course Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {settingItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div className="space-y-1">
                <Label className="text-sm font-medium">{item.label}</Label>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={settings[item.key as keyof typeof settings]}
                onCheckedChange={(value) => handleSettingChange(item.key, value)}
              />
            </div>
          ))}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary-dark">
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="shadow-4dp border-destructive-light">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive-light/10 p-4 rounded-lg border border-destructive-light">
            <h3 className="font-medium text-destructive mb-2">Delete Course</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete a course, there is no going back. This will permanently delete the course, 
              all its content, student enrollments, and submission data.
            </p>
            
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="bg-destructive hover:bg-destructive-dark">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Course
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete the course
                    "Full Stack Web Development Bootcamp" and remove all associated data.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteCourse}>
                    Delete Course
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
