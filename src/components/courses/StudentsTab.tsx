
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserPlus, Search, AlertTriangle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import DataTable from '../shared/DataTable';
import PerformanceWidget from '../shared/PerformanceWidget';

interface StudentsTabProps {
  courseId: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  progress: number;
  lastActive: string;
  batch: string;
  status: 'Active' | 'At Risk' | 'Completed' | 'Dropped';
}

interface AtRiskStudent {
  id: string;
  name: string;
  reasons: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

const StudentsTab = ({ courseId }: StudentsTabProps) => {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data
  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      enrolledDate: '2024-01-15',
      progress: 75,
      lastActive: '2024-01-20',
      batch: 'Batch A',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      enrolledDate: '2024-01-16',
      progress: 45,
      lastActive: '2024-01-18',
      batch: 'Batch A',
      status: 'At Risk'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      enrolledDate: '2024-01-17',
      progress: 100,
      lastActive: '2024-01-21',
      batch: 'Batch B',
      status: 'Completed'
    }
  ];

  const atRiskStudents: AtRiskStudent[] = [
    {
      id: '2',
      name: 'Jane Smith',
      reasons: ['Low assignment completion', 'Infrequent login'],
      riskLevel: 'High'
    }
  ];

  const submissionsData = [
    {
      assessment: 'JavaScript Fundamentals Quiz',
      submissionRate: 85,
      averageScore: 78,
      totalStudents: 124
    },
    {
      assessment: 'React Components Assignment',
      submissionRate: 72,
      averageScore: 82,
      totalStudents: 124
    },
    {
      assessment: 'Final Project',
      submissionRate: 95,
      averageScore: 88,
      totalStudents: 124
    }
  ];

  const studentColumns = [
    { key: 'name', label: 'Student Name' },
    { key: 'email', label: 'Email' },
    { key: 'batch', label: 'Batch' },
    { key: 'progress', label: 'Progress' },
    { key: 'lastActive', label: 'Last Active' },
    { key: 'status', label: 'Status' }
  ];

  const formatStudentData = (student: Student) => ({
    ...student,
    progress: (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all"
            style={{ width: `${student.progress}%` }}
          />
        </div>
        <span className="text-sm">{student.progress}%</span>
      </div>
    ),
    status: (
      <Badge 
        variant={student.status === 'Active' ? 'default' : 
                student.status === 'At Risk' ? 'destructive' :
                student.status === 'Completed' ? 'secondary' : 'outline'}
      >
        {student.status}
      </Badge>
    )
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success';
      case 'At Risk': return 'text-destructive';
      case 'Completed': return 'text-primary';
      case 'Dropped': return 'text-muted-foreground';
      default: return 'text-foreground';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-destructive-light text-destructive-dark border-destructive';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Low': return 'bg-success-light text-success-dark border-success';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Tabs defaultValue="management" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card border border-border rounded-lg p-1">
          <TabsTrigger 
            value="management"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="h-4 w-4" />
            Student Management
          </TabsTrigger>
          <TabsTrigger 
            value="performance"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            Performance Insights
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="management" className="mt-0 space-y-6">
            {/* Student Management Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-semibold text-2xl">Student Management</h2>
                <p className="text-muted-foreground">Manage course enrollments and student organization</p>
              </div>
              <Dialog open={isEnrollModalOpen} onOpenChange={setIsEnrollModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-dark shadow-4dp">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Enroll Students
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Enroll New Students</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search users to enroll..."
                        className="pl-10"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Search feature would allow finding and selecting users to enroll in this course.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Students Table */}
            <Card className="shadow-4dp">
              <CardContent className="p-6">
                <DataTable
                  data={students.map(formatStudentData)}
                  columns={studentColumns}
                  searchable
                  filterable
                />
              </CardContent>
            </Card>

            {/* Batch Management */}
            <Card className="shadow-4dp">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Batch Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Batch A</h3>
                    <p className="text-sm text-muted-foreground mb-2">45 students</p>
                    <p className="text-xs text-muted-foreground">Started: Jan 15, 2024</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Batch B</h3>
                    <p className="text-sm text-muted-foreground mb-2">38 students</p>
                    <p className="text-xs text-muted-foreground">Started: Jan 22, 2024</p>
                  </div>
                  <div className="p-4 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                    <Button variant="outline" size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Create New Batch
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-0 space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <PerformanceWidget
                title="Completion Rate"
                value="78%"
                change="+5%"
                trend="up"
                type="progress"
              />
              <PerformanceWidget
                title="Average Score"
                value="82.5"
                change="+2.3"
                trend="up"
                type="number"
              />
              <PerformanceWidget
                title="Active Students"
                value="118"
                change="-3"
                trend="down"
                type="number"
              />
              <PerformanceWidget
                title="At-Risk Students"
                value="12"
                change="+2"
                trend="up"
                type="alert"
              />
            </div>

            {/* At-Risk Students */}
            <Card className="shadow-4dp">
              <CardHeader>
                <CardTitle className="font-heading text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  At-Risk Student Identifier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atRiskStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-medium">{student.name}</h3>
                        <Badge className={getRiskLevelColor(student.riskLevel)}>
                          {student.riskLevel} Risk
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Risk Factors:</p>
                        <ul className="text-sm space-y-1">
                          {student.reasons.map((reason, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 pt-3 border-t flex gap-2">
                        <Button variant="outline" size="sm">Contact Student</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submissions Overview */}
            <Card className="shadow-4dp">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Submissions Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Submission Rate</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissionsData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.assessment}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all"
                                style={{ width: `${item.submissionRate}%` }}
                              />
                            </div>
                            <span className="text-sm">{item.submissionRate}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>{item.averageScore}</span>
                            {item.averageScore >= 80 ? (
                              <TrendingUp className="h-3 w-3 text-success" />
                            ) : item.averageScore >= 70 ? (
                              <Minus className="h-3 w-3 text-warning" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-destructive" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.totalStudents}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default StudentsTab;
