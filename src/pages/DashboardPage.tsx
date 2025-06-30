
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  MessageSquare
} from 'lucide-react';
import PerformanceWidget from '@/components/shared/PerformanceWidget';

const DashboardPage = () => {
  // Dummy data for dashboard widgets
  const upcomingDeadlines = [
    {
      id: '1',
      title: 'JavaScript Fundamentals Quiz',
      course: 'Full Stack Bootcamp',
      dueDate: '2024-01-25',
      type: 'Assessment',
      priority: 'high'
    },
    {
      id: '2',
      title: 'React Project Submission',
      course: 'Frontend Development',
      dueDate: '2024-01-27',
      type: 'Assignment',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Weekly Progress Review',
      course: 'Data Science Course',
      dueDate: '2024-01-28',
      type: 'Review',
      priority: 'low'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'New student enrolled',
      course: 'Full Stack Bootcamp',
      time: '2 hours ago',
      type: 'enrollment'
    },
    {
      id: '2',
      action: 'Assessment submitted',
      course: 'React Fundamentals',
      time: '4 hours ago',
      type: 'submission'
    },
    {
      id: '3',
      action: 'Course content updated',
      course: 'JavaScript Basics',
      time: '1 day ago',
      type: 'update'
    },
    {
      id: '4',
      action: 'New discussion post',
      course: 'Web Development',
      time: '2 days ago',
      type: 'discussion'
    }
  ];

  const topPerformingCourses = [
    {
      id: '1',
      title: 'Full Stack Web Development',
      students: 124,
      completionRate: 89,
      averageScore: 85
    },
    {
      id: '2',
      title: 'Python for Data Science',
      students: 89,
      completionRate: 76,
      averageScore: 82
    },
    {
      id: '3',
      title: 'React Native Development',
      students: 67,
      completionRate: 92,
      averageScore: 88
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive-light text-destructive-dark border-destructive';
      case 'medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'low': return 'bg-success-light text-success-dark border-success';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return <Users className="h-4 w-4 text-primary" />;
      case 'submission': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'update': return <BookOpen className="h-4 w-4 text-warning" />;
      case 'discussion': return <MessageSquare className="h-4 w-4 text-accent" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">Dashboard</h1>
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
          {/* Upcoming Deadlines */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{deadline.title}</h3>
                      <p className="text-xs text-muted-foreground">{deadline.course}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getPriorityColor(deadline.priority)}>
                        {deadline.priority}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{new Date(deadline.dueDate).toLocaleDateString()}</p>
                        <p className="text-xs text-muted-foreground">{deadline.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Courses */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Top Performing Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingCourses.map((course, index) => (
                  <div key={course.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{course.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{course.students} students</span>
                        <span>•</span>
                        <span>{course.completionRate}% completion</span>
                        <span>•</span>
                        <span>Avg. {course.averageScore}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
              <CardTitle className="font-heading text-xl">Quick Actions</CardTitle>
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
              <CardTitle className="font-heading text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.course}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-4dp">
            <CardHeader>
              <CardTitle className="font-heading text-xl">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Platform Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-xs text-success">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-xs text-success">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning"></div>
                  <span className="text-xs text-warning">78% Used</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
