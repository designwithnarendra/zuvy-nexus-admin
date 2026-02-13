'use client'

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  Clock, 
  User, 
  FileText,
  ChevronDown,
  ChevronUp 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  resource: string;
  resourceType: 'Course' | 'User' | 'Content' | 'Role' | 'Organisation' | 'Settings';
  actor: {
    name: string;
    role: string;
    email: string;
  };
  details: string;
  status: 'success' | 'failure' | 'pending';
  ipAddress: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: '2026-02-06T14:32:00Z',
    action: 'Created',
    resource: 'Advanced JavaScript Course',
    resourceType: 'Course',
    actor: {
      name: 'Sarah Johnson',
      role: 'Instructor',
      email: 'sarah.johnson@zuvy.com'
    },
    details: 'Created new course with 12 modules',
    status: 'success',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'audit-002',
    timestamp: '2026-02-06T13:15:00Z',
    action: 'Modified',
    resource: 'Student: John Doe',
    resourceType: 'User',
    actor: {
      name: 'Admin User',
      role: 'Admin',
      email: 'admin@zuvy.com'
    },
    details: 'Updated enrollment status to active',
    status: 'success',
    ipAddress: '192.168.1.101'
  },
  {
    id: 'audit-003',
    timestamp: '2026-02-06T12:45:00Z',
    action: 'Deleted',
    resource: 'MCQ: Database Concepts',
    resourceType: 'Content',
    actor: {
      name: 'Content Manager',
      role: 'Instructor',
      email: 'content@zuvy.com'
    },
    details: 'Removed question from question bank',
    status: 'success',
    ipAddress: '192.168.1.102'
  },
  {
    id: 'audit-004',
    timestamp: '2026-02-06T11:20:00Z',
    action: 'Modified',
    resource: 'Ops Role',
    resourceType: 'Role',
    actor: {
      name: 'Super Admin',
      role: 'SuperAdmin',
      email: 'superadmin@zuvy.com'
    },
    details: 'Updated permissions for Content Bank module',
    status: 'success',
    ipAddress: '192.168.1.103'
  },
  {
    id: 'audit-005',
    timestamp: '2026-02-06T10:00:00Z',
    action: 'Accessed',
    resource: 'User Management',
    resourceType: 'Settings',
    actor: {
      name: 'Sarah Johnson',
      role: 'Instructor',
      email: 'sarah.johnson@zuvy.com'
    },
    details: 'Accessed user management dashboard',
    status: 'failure',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'audit-006',
    timestamp: '2026-02-05T16:30:00Z',
    action: 'Created',
    resource: 'Batch: Spring 2026 Cohort',
    resourceType: 'Course',
    actor: {
      name: 'Admin User',
      role: 'Admin',
      email: 'admin@zuvy.com'
    },
    details: 'Created new batch with 45 students',
    status: 'success',
    ipAddress: '192.168.1.101'
  },
];

const AuditLogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<AuditLogEntry['resourceType'] | 'all'>('all');

  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter(log => {
      const matchesSearch = 
        log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.actor.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterType === 'all' || log.resourceType === filterType;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const getResourceTypeColor = (type: AuditLogEntry['resourceType']) => {
    switch (type) {
      case 'Course':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'User':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Content':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Role':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Organisation':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Settings':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: AuditLogEntry['status']) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'failure':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Audit Log</h1>
          <p className="text-muted-foreground">Track all activities and changes across the platform</p>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              {/* Search and Filter Row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by resource, action, or actor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              {/* Resource Type Filter */}
              <div className="flex gap-2 flex-wrap">
                {(['all', 'Course', 'User', 'Content', 'Role', 'Organisation', 'Settings'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type === 'all' ? 'all' : type)}
                    className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                      filterType === type
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {type === 'all' ? 'All' : type}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Logs List */}
        <div className="space-y-3">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <Card
                key={log.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-semibold text-foreground">{log.action}</span>
                          <span className="text-foreground/60">·</span>
                          <span className="text-foreground font-medium">{log.resource}</span>
                          <Badge 
                            variant="outline"
                            className={`${getResourceTypeColor(log.resourceType)}`}
                          >
                            {log.resourceType}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{log.actor.name}</span>
                          </div>
                          <span>·</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatDate(log.timestamp)}</span>
                          </div>
                          <span>·</span>
                          <Badge 
                            variant="outline"
                            className={`${getStatusColor(log.status)} capitalize`}
                          >
                            {log.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-1">
                      {expandedId === log.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === log.id && (
                    <div className="mt-4 pt-4 border-t border-border space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Actor</span>
                          <p className="font-medium text-foreground">{log.actor.name}</p>
                          <p className="text-xs text-muted-foreground">{log.actor.email}</p>
                          <p className="text-xs text-muted-foreground">{log.actor.role}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Details</span>
                          <p className="font-medium text-foreground">{log.details}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Timestamp</span>
                          <p className="font-medium text-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">IP Address</span>
                          <p className="font-medium text-foreground">{log.ipAddress}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No audit logs found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination Info */}
        <div className="text-sm text-muted-foreground text-center">
          Showing {filteredLogs.length} of {mockAuditLogs.length} entries
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;
