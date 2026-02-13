'use client'

import React from 'react';
import { Download, Search, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface AuditLog {
  id: string;
  user: {
    name: string;
    email: string;
    initials: string;
  };
  action: string;
  module: string;
  target: string;
  timestamp: string;
  dateLabel?: string;
  details: {
    type: string;
    from: string;
    to: string;
    items?: string[]; // For displaying topics/items as chips
  };
  showDetails?: boolean;
  userRole: 'Admin' | 'Instructor' | 'Ops';
  category: string;
  date: 'today' | 'thisWeek' | 'older';
}

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  // Lazy loading state (global, not per group)
  const INITIAL_BATCH_SIZE = 20;
  const LOAD_MORE_BATCH_SIZE = 20;
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);

  const handleExport = () => {
    console.log('Exporting audit log...');
  };

  const roles = ['Admin', 'Instructor', 'Ops'];
  const actions = ['Create', 'Update', 'Delete', 'Publish', 'Grade', 'Upload', 'Download', 'Archive'];
  const dateRanges = ['Today', 'Past 7 Days', 'Past 30 Days'];

  // Mock audit log data - Comprehensive coverage of all platform features
  const auditLogs: AuditLog[] = [
    // TODAY - COURSE STUDIO ACTIONS
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'published course',
      module: 'Course Studio',
      target: '"Full Stack Web Development Bootcamp"',
      timestamp: '09:15 PM',
      details: {
        type: 'STATUS',
        from: 'Draft',
        to: 'Published',
      },
      showDetails: true,
      userRole: 'Admin',
      category: 'COURSES',
      date: 'today',
    },
    {
      id: '2',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'updated course image for',
      module: 'Course Studio',
      target: '"Python for Data Science"',
      timestamp: '08:45 PM',
      details: {
        type: 'IMAGE',
        from: 'Previous image',
        to: 'New image uploaded',
      },
      showDetails: false,
      userRole: 'Admin',
      category: 'COURSES',
      date: 'today',
    },
    {
      id: '3',
      user: {
        name: 'Narendra Singh',
        email: 'narendra.s@zuvy.org',
        initials: 'NS',
      },
      action: 'added module',
      module: 'Course Studio',
      target: 'Advanced JavaScript Concepts to Full Stack Web Development',
      timestamp: '07:32 PM',
      details: {
        type: 'MODULE',
        from: 'N/A',
        to: 'Duration: 3 weeks',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'CURRICULUM',
      date: 'today',
    },
    {
      id: '4',
      user: {
        name: 'Alex Rodriguez',
        email: 'alex.r@zuvy.org',
        initials: 'AR',
      },
      action: 'deleted module',
      module: 'Course Studio',
      target: '"Deprecated PHP Basics" from "Legacy Course"',
      timestamp: '06:20 PM',
      details: {
        type: 'MODULE_DELETE',
        from: 'Active',
        to: 'Deleted',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'CURRICULUM',
      date: 'today',
    },
    {
      id: '5',
      user: {
        name: 'Lisa Park',
        email: 'lisa.p@zuvy.org',
        initials: 'LP',
      },
      action: 'created new batch',
      module: 'Course Studio',
      target: '"Full Stack Batch 2024-C" for "Full Stack Web Development" - 40 students',
      timestamp: '05:10 PM',
      details: {
        type: 'BATCH',
        from: 'N/A',
        to: 'Created',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'BATCHES',
      date: 'today',
    },

    // TODAY - CONTENT BANK ACTIONS
    {
      id: '6',
      user: {
        name: 'Priya Sharma',
        email: 'priya.s@zuvy.org',
        initials: 'PS',
      },
      action: 'created MCQ question',
      module: 'Content Bank',
      target: '"JavaScript Variable Declaration" for "React Fundamentals" topic',
      timestamp: '04:45 PM',
      details: {
        type: 'QUESTION_TYPE',
        from: 'N/A',
        to: 'MCQ',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'QUESTIONS',
      date: 'today',
    },
    {
      id: '7',
      user: {
        name: 'David Wilson',
        email: 'david.w@zuvy.org',
        initials: 'DW',
      },
      action: 'bulk uploaded',
      module: 'Content Bank',
      target: '32 questions to "React Fundamentals" topic',
      timestamp: '03:30 PM',
      details: {
        type: 'UPLOAD_TYPE',
        from: 'Manual',
        to: 'Bulk Upload',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'QUESTIONS',
      date: 'today',
    },
    {
      id: '8',
      user: {
        name: 'Mike Chen',
        email: 'mike.c@zuvy.org',
        initials: 'MC',
      },
      action: 'generated AI content for',
      module: 'Content Bank',
      target: '"Node.js Best Practices" topic - 8 questions',
      timestamp: '02:15 PM',
      details: {
        type: 'AI_GENERATION',
        from: 'N/A',
        to: 'Generated',
      },
      showDetails: false,
      userRole: 'Admin',
      category: 'QUESTIONS',
      date: 'today',
    },
    {
      id: '9',
      user: {
        name: 'Emily Davis',
        email: 'emily.d@zuvy.org',
        initials: 'ED',
      },
      action: 'created open-ended question',
      module: 'Content Bank',
      target: '"Design a REST API" for "Node.js Advanced" topic',
      timestamp: '01:00 PM',
      details: {
        type: 'QUESTION_TYPE',
        from: 'N/A',
        to: 'Open Ended',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'QUESTIONS',
      date: 'today',
    },
    {
      id: '10',
      user: {
        name: 'Raj Kumar',
        email: 'raj.k@zuvy.org',
        initials: 'RK',
      },
      action: 'added 5 new topics',
      module: 'Content Bank',
      target: 'Question Bank',
      timestamp: '11:45 AM',
      details: {
        type: 'TOPICS_ADDED',
        from: 'N/A',
        to: 'N/A',
        items: ['React Hooks', 'Context API', 'Performance Optimization', 'Custom Hooks', 'React Patterns'],
      },
      showDetails: true,
      userRole: 'Ops',
      category: 'QUESTIONS',
      date: 'today',
    },

    // THIS WEEK - STUDENT MANAGEMENT
    {
      id: '11',
      user: {
        name: 'Anna Thompson',
        email: 'anna.t@zuvy.org',
        initials: 'AT',
      },
      action: 'added student',
      module: 'Course Studio',
      target: 'Kate Hernandez to "Full Stack Batch 2024-A"',
      timestamp: '04:30 PM',
      dateLabel: '4 days ago',
      details: {
        type: 'ENROLLMENT',
        from: 'Not enrolled',
        to: 'Enrolled',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'STUDENTS',
      date: 'thisWeek',
    },
    {
      id: '12',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'bulk uploaded',
      module: 'Course Studio',
      target: '25 students to "Advanced JavaScript" batch for Python Course',
      timestamp: '02:00 PM',
      dateLabel: '4 days ago',
      details: {
        type: 'BULK_UPLOAD',
        from: 'File processed',
        to: 'Students added',
      },
      showDetails: false,
      userRole: 'Admin',
      category: 'STUDENTS',
      date: 'thisWeek',
    },
    {
      id: '13',
      user: {
        name: 'Mike Chen',
        email: 'mike.c@zuvy.org',
        initials: 'MC',
      },
      action: 'updated student batch for',
      module: 'Course Studio',
      target: 'Bob Johnson in "Full Stack Web Development"',
      timestamp: '10:15 AM',
      dateLabel: '3 days ago',
      details: {
        type: 'BATCH_CHANGE',
        from: 'Batch 2024-A',
        to: 'Batch 2024-B',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'STUDENTS',
      date: 'thisWeek',
    },
    {
      id: '14',
      user: {
        name: 'Lisa Park',
        email: 'lisa.p@zuvy.org',
        initials: 'LP',
      },
      action: 'removed student',
      module: 'Course Studio',
      target: 'Chris Martinez from "Python Batch 2024-A"',
      timestamp: '03:45 PM',
      dateLabel: '2 days ago',
      details: {
        type: 'REMOVAL',
        from: 'Enrolled',
        to: 'Removed',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'STUDENTS',
      date: 'thisWeek',
    },

    // THIS WEEK - SUBMISSIONS & GRADING
    {
      id: '15',
      user: {
        name: 'Priya Sharma',
        email: 'priya.s@zuvy.org',
        initials: 'PS',
      },
      action: 'graded submission in',
      module: 'Submissions',
      target: '"DOM Fundamentals Quiz" for "Full Stack Web Development" - John Doe',
      timestamp: '06:20 PM',
      dateLabel: '2 days ago',
      details: {
        type: 'GRADE',
        from: 'Pending',
        to: '75%',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'SUBMISSIONS',
      date: 'thisWeek',
    },
    {
      id: '16',
      user: {
        name: 'Alex Rodriguez',
        email: 'alex.r@zuvy.org',
        initials: 'AR',
      },
      action: 'approved re-attempt for',
      module: 'Submissions',
      target: '"React State Management Assessment" in "Advanced JavaScript" - Mark Davis',
      timestamp: '02:30 PM',
      dateLabel: '2 days ago',
      details: {
        type: 'RE_ATTEMPT',
        from: 'Denied',
        to: 'Approved',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'SUBMISSIONS',
      date: 'thisWeek',
    },
    {
      id: '17',
      user: {
        name: 'David Wilson',
        email: 'david.w@zuvy.org',
        initials: 'DW',
      },
      action: 'downloaded report for',
      module: 'Submissions',
      target: '"Web Development Fundamentals Assessment" in Python Course',
      timestamp: '11:00 AM',
      dateLabel: '1 day ago',
      details: {
        type: 'REPORT',
        from: 'On platform',
        to: 'Downloaded',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'SUBMISSIONS',
      date: 'thisWeek',
    },

    // THIS WEEK - ROLES & PERMISSIONS
    {
      id: '18',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'updated role permissions for',
      module: 'Roles and Permissions',
      target: '"Instructor" role in "Course Studio" - Web Development department',
      timestamp: '04:00 PM',
      dateLabel: '1 day ago',
      details: {
        type: 'PERMISSION',
        from: 'Viewer',
        to: 'Creator',
      },
      showDetails: true,
      userRole: 'Admin',
      category: 'ROLES',
      date: 'thisWeek',
    },
    {
      id: '19',
      user: {
        name: 'Mike Chen',
        email: 'mike.c@zuvy.org',
        initials: 'MC',
      },
      action: 'created new role',
      module: 'Roles and Permissions',
      target: '"Content Manager" with permissions (View, Create, Edit, Delete, Publish, Download, Import, Export)',
      timestamp: '10:30 AM',
      dateLabel: '1 day ago',
      details: {
        type: 'ROLE_CREATE',
        from: 'N/A',
        to: 'Created',
      },
      showDetails: false,
      userRole: 'Admin',
      category: 'ROLES',
      date: 'thisWeek',
    },

    // OLDER - SETTINGS & CONFIGURATION
    {
      id: '20',
      user: {
        name: 'Raj Kumar',
        email: 'raj.k@zuvy.org',
        initials: 'RK',
      },
      action: 'updated course type for',
      module: 'Settings',
      target: '"Advanced Python" in "Programming" department',
      timestamp: '05:30 PM',
      dateLabel: 'January 30, 2026',
      details: {
        type: 'COURSE_TYPE',
        from: 'Public',
        to: 'Private',
      },
      showDetails: true,
      userRole: 'Ops',
      category: 'SETTINGS',
      date: 'older',
    },
    {
      id: '21',
      user: {
        name: 'Emily Davis',
        email: 'emily.d@zuvy.org',
        initials: 'ED',
      },
      action: 'enabled module sequencing for',
      module: 'Settings',
      target: '"Web Development Bootcamp" - Course structure updated',
      timestamp: '03:15 PM',
      dateLabel: 'January 29, 2026',
      details: {
        type: 'MODULE_LOCK',
        from: 'Disabled',
        to: 'Enabled',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'SETTINGS',
      date: 'older',
    },
    {
      id: '22',
      user: {
        name: 'Anna Thompson',
        email: 'anna.t@zuvy.org',
        initials: 'AT',
      },
      action: 'archived course',
      module: 'Course Studio',
      target: '"Legacy PHP Course" - All student data archived',
      timestamp: '02:00 PM',
      dateLabel: 'January 28, 2026',
      details: {
        type: 'DELETE',
        from: 'Active',
        to: 'Archived',
      },
      showDetails: false,
      userRole: 'Admin',
      category: 'COURSES',
      date: 'older',
    },

    // OLDER - USER MANAGEMENT
    {
      id: '23',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'added new user',
      module: 'Settings',
      target: 'james.taylor@zuvy.org in "Web Development" department - Role: Instructor',
      timestamp: '11:45 AM',
      dateLabel: 'January 27, 2026',
      details: {
        type: 'USER_CREATE',
        from: 'Inactive',
        to: 'Active',
      },
      showDetails: true,
      userRole: 'Admin',
      category: 'USERS',
      date: 'older',
    },
    {
      id: '24',
      user: {
        name: 'Mike Chen',
        email: 'mike.c@zuvy.org',
        initials: 'MC',
      },
      action: 'changed role for user',
      module: 'Settings',
      target: 'jessica.lee@zuvy.org in "Content Management"',
      timestamp: '09:30 AM',
      dateLabel: 'January 26, 2026',
      details: {
        type: 'ROLE_CHANGE',
        from: 'Instructor',
        to: 'Ops',
      },
      showDetails: true,
      userRole: 'Admin',
      category: 'USERS',
      date: 'older',
    },
    {
      id: '25',
      user: {
        name: 'Raj Kumar',
        email: 'raj.k@zuvy.org',
        initials: 'RK',
      },
      action: 'deactivated user account',
      module: 'Settings',
      target: 'robert.brown@zuvy.org - Former Instructor in "Programming"',
      timestamp: '07:15 PM',
      dateLabel: 'January 25, 2026',
      details: {
        type: 'USER_STATUS',
        from: 'Active',
        to: 'Deactivated',
      },
      showDetails: true,
      userRole: 'Ops',
      category: 'USERS',
      date: 'older',
    },

    // OLDER - QUESTION/TOPIC MANAGEMENT
    {
      id: '26',
      user: {
        name: 'Priya Sharma',
        email: 'priya.s@zuvy.org',
        initials: 'PS',
      },
      action: 'deleted question from',
      module: 'Content Bank',
      target: '"Outdated CSS Question" in "Advanced CSS" topic - Easy difficulty',
      timestamp: '04:45 PM',
      dateLabel: 'January 24, 2026',
      details: {
        type: 'QUESTION_DELETE',
        from: 'In use: 2 tests',
        to: 'Deleted',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'QUESTIONS',
      date: 'older',
    },
    {
      id: '27',
      user: {
        name: 'David Wilson',
        email: 'david.w@zuvy.org',
        initials: 'DW',
      },
      action: 'created coding problem in',
      module: 'Content Bank',
      target: '"Implement Binary Search" in "Algorithms" topic - Hard difficulty',
      timestamp: '02:20 PM',
      dateLabel: 'January 23, 2026',
      details: {
        type: 'QUESTION_TYPE',
        from: 'N/A',
        to: 'Coding',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'QUESTIONS',
      date: 'older',
    },

    // OLDER - BATCH MANAGEMENT
    {
      id: '28',
      user: {
        name: 'Lisa Park',
        email: 'lisa.p@zuvy.org',
        initials: 'LP',
      },
      action: 'updated batch details for',
      module: 'Course Studio',
      target: '"Full Stack Batch 2024-A" in "Full Stack Web Development"',
      timestamp: '11:00 AM',
      dateLabel: 'January 22, 2026',
      details: {
        type: 'CAP_ENROLLMENT',
        from: '30 students',
        to: '35 students',
      },
      showDetails: true,
      userRole: 'Instructor',
      category: 'BATCHES',
      date: 'older',
    },
    {
      id: '29',
      user: {
        name: 'Alex Rodriguez',
        email: 'alex.r@zuvy.org',
        initials: 'AR',
      },
      action: 'archived batch for',
      module: 'Course Studio',
      target: '"Python Batch 2023-B" in "Python Programming Fundamentals"',
      timestamp: '08:45 AM',
      dateLabel: 'January 21, 2026',
      details: {
        type: 'ARCHIVE',
        from: 'Active',
        to: 'Archived',
      },
      showDetails: false,
      userRole: 'Instructor',
      category: 'BATCHES',
      date: 'older',
    },

    // OLDER - ORGANIZATION CHANGES
    {
      id: '30',
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@zuvy.org',
        initials: 'SJ',
      },
      action: 'updated organization settings for',
      module: 'Settings',
      target: '"Amazon Future Engineer" program - Logo and domain updated',
      timestamp: '05:30 PM',
      dateLabel: 'January 20, 2026',
      details: {
        type: 'ORGANIZATION',
        from: 'Old branding',
        to: 'New branding',
      },
      showDetails: true,
      userRole: 'Admin',
      category: 'ORGANIZATION',
      date: 'older',
    },
  ];

  const getInitialsBgColor = (initials: string) => {
    const colors = ['bg-blue-100', 'bg-purple-100', 'bg-green-100', 'bg-yellow-100', 'bg-pink-100'];
    const charCode = initials.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const getModuleColor = (module: string) => {
    const moduleColors: Record<string, { bg: string; text: string; border: string }> = {
      'Course Studio': {
        bg: 'hsl(207, 85%, 90%)',
        text: 'hsl(207, 79%, 30%)',
        border: 'hsl(207, 79%, 60%)',
      },
      'Content Bank': {
        bg: 'hsl(88, 85%, 88%)',
        text: 'hsl(88, 60%, 25%)',
        border: 'hsl(88, 70%, 50%)',
      },
      'Settings': {
        bg: 'hsl(38, 92%, 88%)',
        text: 'hsl(32, 95%, 30%)',
        border: 'hsl(38, 92%, 60%)',
      },
      'Submissions': {
        bg: 'hsl(300, 82%, 88%)',
        text: 'hsl(300, 70%, 30%)',
        border: 'hsl(300, 75%, 55%)',
      },
    };

    return moduleColors[module] || {
      bg: 'hsl(48, 30%, 90%)',
      text: 'hsl(0, 0%, 54%)',
      border: 'hsl(48, 23%, 90%)',
    };
  };

  // Apply filters to audit logs
  const filteredLogs = auditLogs.filter(log => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      log.user.name.toLowerCase().includes(searchLower) ||
      log.user.email.toLowerCase().includes(searchLower) ||
      log.action.toLowerCase().includes(searchLower) ||
      log.module.toLowerCase().includes(searchLower) ||
      log.target.toLowerCase().includes(searchLower);

    if (!matchesSearch) return false;

    // Role filter
    if (selectedRole !== 'all') {
      if (log.userRole !== selectedRole) {
        return false;
      }
    }

    // Action filter
    if (selectedAction !== 'all') {
      if (!log.action.toLowerCase().includes(selectedAction.toLowerCase())) {
        return false;
      }
    }

    // Date range filter
    if (selectedDateRange !== 'all') {
      if (selectedDateRange === 'Today' && log.date !== 'today') return false;
      if (selectedDateRange === 'Past 7 Days' && log.date === 'older') return false;
    }

    return true;
  });

  // Only show up to visibleCount logs, then group
  const visibleLogs = filteredLogs.slice(0, visibleCount);
  const groupedLogs = {
    today: visibleLogs.filter(log => log.date === 'today'),
    thisWeek: visibleLogs.filter(log => log.date === 'thisWeek'),
    older: visibleLogs.filter(log => log.date === 'older'),
  };
  const hasMore = filteredLogs.length > visibleCount;

  const renderLogGroup = (title: string, logs: AuditLog[], groupKey: 'today' | 'thisWeek' | 'older', count: number) => {
    const showDate = groupKey !== 'today';
    return (
      <div key={groupKey}>
        <div
          className="px-6 py-4 text-sm font-semibold text-slate-600"
          style={{ backgroundColor: 'hsl(48, 30%, 90%)', borderBottom: '2px solid hsl(48, 23%, 90%)' }}
        >
          <span>{title} ({count})</span>
        </div>

        <div className="divide-y divide-slate-50">
            {logs.map((log, index) => (
              <React.Fragment key={log.id}>
                <div className="px-6 py-5 hover:bg-slate-50 transition-colors">
                  <div className="space-y-3">
                    {/* Main Entry Row */}
                    <div className="flex gap-5 items-center group">
                      {/* Avatar */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${getInitialsBgColor(log.user.initials)} flex items-center justify-center border-2 border-slate-200 shadow-sm`}>
                        <span className="text-xs font-bold text-foreground">
                          {log.user.initials}
                        </span>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm leading-relaxed">
                              <span className="font-bold text-foreground">{log.user.name}</span>
                              <span className="text-muted-foreground ml-2 text-xs">({log.user.email})</span>
                              <span className="mx-2 text-muted-foreground">{log.action}</span>
                              {(() => {
                                // List of prepositions to render as normal text
                                const prepositions = ['to', 'in', 'from', 'for'];
                                // Helper to check if inside quotes
                                let inQuotes = false;
                                // Split on quotes to handle quoted and unquoted segments
                                const quoteSplit = log.target.split(/(")/g);
                                let afterPrep = false;
                                return quoteSplit.map((segment, i) => {
                                  if (segment === '"') {
                                    inQuotes = !inQuotes;
                                    return <span key={i}>"</span>;
                                  }
                                  if (inQuotes) {
                                    // Everything inside quotes: bold, same color
                                    return <span key={i} className="font-bold text-foreground">{segment}</span>;
                                  }
                                  // Outside quotes: split on prepositions
                                  const parts = segment.split(new RegExp(` (${prepositions.join('|')}) `, 'g'));
                                  return parts.map((part, idx) => {
                                    if (prepositions.includes(part)) {
                                      afterPrep = true;
                                      return (
                                        <span key={i + '-' + idx} className="text-foreground"> {part} </span>
                                      );
                                    }
                                    if (afterPrep && part.trim() !== '') {
                                      afterPrep = false;
                                      return (
                                        <span key={i + '-' + idx} className="font-bold text-muted-foreground">{part}</span>
                                      );
                                    }
                                    return (
                                      <span key={i + '-' + idx} className="font-bold text-foreground">{part}</span>
                                    );
                                  });
                                });
                              })()}
                            </div>
                            
                            {/* Module Badge - Moved to bottom */}
                            <div className="mt-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                {log.module}
                              </span>
                            </div>
                          </div>
                          
                          {/* Time Badge */}
                          <div className="flex-shrink-0">
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md border border-border/40">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                                {showDate && log.dateLabel ? `${log.dateLabel}, ${log.timestamp}` : log.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Details Box - Only show when needed */}
                    {log.showDetails && (
                      <div className="ml-14 pl-4 py-2 border-l-2 border-border/40">
                        <div className="flex flex-col gap-2 w-full">
                          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                            Property Update
                          </span>
                          {/* Topics/Items as chips */}
                          {log.details.items && log.details.items.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {log.details.items.map((item, idx) => (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-accent text-accent-foreground border border-accent/30"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-muted/20 text-muted-foreground border border-muted/40">
                                {log.details.from}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-success/10 text-success border border-success/30">
                                {log.details.to}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {index < logs.length - 1 && (
                  <div className="mx-6 border-t border-border/60" />
                )}
              </React.Fragment>
            ))}
              {/* Load More button will be rendered globally below */}
          </div>
        </div>
      );
    };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-0.5">
          <h1 className="font-heading text-h5">User Activity Log</h1>
          <p className="text-muted-foreground">
            Track and monitor all actions performed within your workspace
          </p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-primary hover:bg-primary-dark shadow-4dp"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters Section */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by user, action, or module..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* All Roles Dropdown */}
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* All Action Dropdown */}
        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Action</SelectItem>
            {actions.map((action) => (
              <SelectItem key={action} value={action}>
                {action}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Dropdown */}
        <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            {dateRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main Content - Audit Log with Separate Cards */}
      <div className="space-y-6">
        {groupedLogs.today.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
            {renderLogGroup('Today', groupedLogs.today, 'today', groupedLogs.today.length)}
          </div>
        )}
        {groupedLogs.thisWeek.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
            {renderLogGroup('This Week', [...groupedLogs.thisWeek].reverse(), 'thisWeek', groupedLogs.thisWeek.length)}
          </div>
        )}
        {groupedLogs.older.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
            {renderLogGroup('Older', groupedLogs.older, 'older', groupedLogs.older.length)}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center py-4">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(visibleCount + LOAD_MORE_BATCH_SIZE)}
            >
              Load More
            </Button>
          </div>
        )}

        {filteredLogs.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center text-slate-600">
            <p>No audit logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
