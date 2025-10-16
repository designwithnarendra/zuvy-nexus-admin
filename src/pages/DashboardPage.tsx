
'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  MessageSquare,
  TrendingDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import PerformanceWidget from '@/components/shared/PerformanceWidget';

const DashboardPage = () => {
  const router = useRouter();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const recentActivity = [
    {
      id: '1',
      action: 'New student enrolled',
      course: 'Full Stack Bootcamp',
      batch: 'Batch 2024-A',
      time: '2 hours ago',
      type: 'enrollment'
    },
    {
      id: '2',
      action: 'Assessment submitted',
      course: 'React Fundamentals',
      batch: 'Batch 2024-B',
      time: '4 hours ago',
      type: 'submission'
    },
    {
      id: '3',
      action: 'Course content updated',
      course: 'JavaScript Basics',
      batch: 'Batch 2024-A',
      time: '1 day ago',
      type: 'update'
    },
    {
      id: '4',
      action: 'Student completed module',
      course: 'Web Development',
      batch: 'Batch 2024-C',
      time: '2 days ago',
      type: 'completion'
    }
  ];

  const allActivities = [
    ...recentActivity,
    {
      id: '5',
      action: 'New student enrolled',
      course: 'Python for Data Science',
      batch: 'Batch 2024-B',
      time: '2 days ago',
      type: 'enrollment'
    },
    {
      id: '6',
      action: 'Assessment submitted',
      course: 'Machine Learning',
      batch: 'Batch 2024-A',
      time: '3 days ago',
      type: 'submission'
    },
    {
      id: '7',
      action: 'Course content updated',
      course: 'DevOps Engineering',
      batch: 'Batch 2024-C',
      time: '3 days ago',
      type: 'update'
    },
    {
      id: '8',
      action: 'Student completed module',
      course: 'React Native Development',
      batch: 'Batch 2024-B',
      time: '3 days ago',
      type: 'completion'
    },
    {
      id: '9',
      action: 'New student enrolled',
      course: 'UI/UX Design',
      batch: 'Batch 2024-A',
      time: '3 days ago',
      type: 'enrollment'
    },
    {
      id: '10',
      action: 'Assessment submitted',
      course: 'Advanced JavaScript',
      batch: 'Batch 2024-C',
      time: '3 days ago',
      type: 'submission'
    }
  ];

  const highPerformingCourses = [
    {
      id: '1',
      title: 'Full Stack Web Development',
      students: 124,
      completionRate: 89
    },
    {
      id: '3',
      title: 'React Native Development',
      students: 67,
      completionRate: 92
    },
    {
      id: '5',
      title: 'DevOps Engineering',
      students: 93,
      completionRate: 85
    }
  ];

  const lowPerformingCourses = [
    {
      id: '6',
      title: 'Advanced Algorithms',
      students: 45,
      completionRate: 32,
      issues: ['Low engagement', 'High dropout']
    },
    {
      id: '7',
      title: 'Database Design',
      students: 67,
      completionRate: 41,
      issues: ['Content difficulty', 'Poor reviews']
    },
    {
      id: '8',
      title: 'System Architecture',
      students: 38,
      completionRate: 28,
      issues: ['Complex material', 'Low completion']
    },
    {
      id: '9',
      title: 'Cloud Computing Basics',
      students: 78,
      completionRate: 45,
      issues: ['Technical barriers', 'Support needed']
    },
    {
      id: '10',
      title: 'Cybersecurity Fundamentals',
      students: 52,
      completionRate: 35,
      issues: ['High complexity', 'Resource gaps']
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return <Users className="h-4 w-4 text-primary" />;
      case 'submission': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'update': return <BookOpen className="h-4 w-4 text-warning" />;
      case 'completion': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-h5 mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your courses.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <PerformanceWidget
          title="Total Students"
          value="1,247"
          change="+12%"
          trend="up"
          type="number"
        />
        <PerformanceWidget
          title="Active Courses"
          value="23"
          change="0"
          trend="neutral"
          type="number"
        />
        <PerformanceWidget
          title="Avg. Completion Rate"
          value="84%"
          change="+3%"
          trend="up"
          type="progress"
        />
        <PerformanceWidget
          title="Questions in Bank"
          value="856"
          change="+45"
          trend="up"
          type="number"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* High Performing Courses */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-body1 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  High Performing Courses
                </div>
                <span className="text-body2 font-normal text-muted-foreground">
                  Completion Rate &gt; 80%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {highPerformingCourses.map((course, index) => (
                  <div 
                    key={course.id} 
                    className="flex items-center gap-4 p-3 border rounded-lg cursor-pointer hover:bg-primary-light transition-colors"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-body2">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-body2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-caption text-muted-foreground mt-1">
                        <span>{course.students} students</span>
                        <span>•</span>
                        <span>{course.completionRate}% completion</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Performing Courses */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-body1 font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  Low Performing Courses
                </div>
                <span className="text-body2 font-normal text-muted-foreground">
                  Completion Rate &lt; 80%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowPerformingCourses.slice(0, 5).map((course, index) => (
                  <div 
                    key={course.id} 
                    className="flex items-center gap-4 p-3 border rounded-lg bg-destructive-light/10 cursor-pointer hover:bg-destructive-light/20 transition-colors"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center font-bold text-body2">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-body2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-caption text-muted-foreground mt-1">
                        <span>{course.students} students</span>
                        <span>•</span>
                        <span>{course.completionRate}% completion</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {course.issues.slice(0, 2).map((issue, i) => (
                          <Badge key={i} variant="outline" className="text-caption bg-destructive-light text-destructive-dark">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-body1 font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-primary hover:bg-primary-dark" asChild>
                <a href="/courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Create New Course
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/content-bank">
                  <Users className="h-4 w-4 mr-2" />
                  Add Questions
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-body1 font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-body2 font-medium">{activity.action}</p>
                      <p className="text-caption text-muted-foreground">{activity.course} - {activity.batch}</p>
                    </div>
                    <span className="text-caption text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => setIsActivityModalOpen(true)}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Modal */}
      <Dialog open={isActivityModalOpen} onOpenChange={setIsActivityModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-body1 font-semibold">All Recent Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {allActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body2 font-medium">{activity.action}</p>
                  <p className="text-caption text-muted-foreground">{activity.course} - {activity.batch}</p>
                </div>
                <span className="text-caption text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardPage;
