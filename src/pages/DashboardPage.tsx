
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock,
  Plus,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Dummy data for dashboard
const dashboardData = {
  totalCourses: 42,
  activeLearners: 1247,
  totalQuestions: 863,
  avgCompletion: 78,
  recentActivity: [
    {
      id: 1,
      type: 'course',
      title: 'Full Stack Web Development Bootcamp',
      action: 'Student enrolled',
      time: '2 hours ago',
      count: 5
    },
    {
      id: 2,
      type: 'assessment',
      title: 'JavaScript Fundamentals Quiz',
      action: 'New submissions',
      time: '4 hours ago',
      count: 12
    },
    {
      id: 3,
      type: 'course',
      title: 'Python for Data Science',
      action: 'Course completed',
      time: '6 hours ago',
      count: 3
    }
  ]
};

const DashboardPage = () => {
  const navigate = useNavigate();

  const statCards = [
    {
      title: 'Total Courses',
      value: dashboardData.totalCourses,
      icon: BookOpen,
      color: 'text-primary',
      bgColor: 'bg-primary-light'
    },
    {
      title: 'Active Learners',
      value: dashboardData.activeLearners.toLocaleString(),
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success-light'
    },
    {
      title: 'Question Bank',
      value: dashboardData.totalQuestions,
      icon: Activity,
      color: 'text-accent',
      bgColor: 'bg-accent-light'
    },
    {
      title: 'Avg Completion',
      value: `${dashboardData.avgCompletion}%`,
      icon: TrendingUp,
      color: 'text-secondary',
      bgColor: 'bg-secondary-light'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back! Here's what's happening with your courses.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Button 
          onClick={() => navigate('/courses/new')}
          className="bg-primary hover:bg-primary-dark shadow-4dp hover:shadow-hover transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/content-bank/questions')}
          className="border-border hover:bg-muted"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-card border-border shadow-2dp hover:shadow-4dp transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border shadow-2dp">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      {activity.count}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-card border-border shadow-2dp">
          <CardHeader>
            <CardTitle className="font-heading">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Courses Published</span>
                <span className="font-semibold text-foreground">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Draft Courses</span>
                <span className="font-semibold text-foreground">14</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Week's Enrollments</span>
                <span className="font-semibold text-success">+89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Rating</span>
                <span className="font-semibold text-foreground">4.8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
