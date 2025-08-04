'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { AlertCircle, MoreVertical, UserMinus, UserX, Mail, Eye } from 'lucide-react';
import DataTable from '@/components/shared/DataTable';

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  progress: number;
  lastActive: string;
  batch: string | null;
  status: 'active' | 'dropout' | 'graduated';
  attendance: string;
}

interface BatchStatus {
  id: string;
  name: string;
  status: 'Not Started' | 'Ongoing' | 'Completed';
}

interface MasterStudentTableProps {
  students: Student[];
  batches: BatchStatus[];
  onDeleteStudent: (studentId: string) => void;
  onDropoutStudent: (studentId: string) => void;
  onViewStudent: (studentId: string) => void;
  onContactStudent: (studentId: string) => void;
  selectedStudents?: string[];
  onSelectStudent?: (studentId: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
  showMultiSelect?: boolean;
}

const MasterStudentTable = ({
  students,
  batches,
  onDeleteStudent,
  onDropoutStudent,
  onViewStudent,
  onContactStudent,
  selectedStudents = [],
  onSelectStudent,
  onSelectAll,
  showMultiSelect = false
}: MasterStudentTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dropoutDialogOpen, setDropoutDialogOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string>('');

  // Check if a student can be deleted (only if batch hasn't started)
  const canDeleteStudent = (student: Student): boolean => {
    if (!student.batch) return true; // Not assigned to a batch
    
    const batch = batches.find(b => b.name === student.batch);
    return batch ? batch.status === 'Not Started' : true;
  };

  // Handle student action selection
  const handleStudentAction = (action: 'delete' | 'dropout' | 'view' | 'contact', student: Student) => {
    setSelectedStudentId(student.id);
    setSelectedStudentName(student.name);
    
    if (action === 'delete') {
      setDeleteDialogOpen(true);
    } else if (action === 'dropout') {
      setDropoutDialogOpen(true);
    } else if (action === 'view') {
      onViewStudent(student.id);
    } else if (action === 'contact') {
      onContactStudent(student.id);
    }
  };

  // Confirm student deletion
  const confirmDelete = () => {
    if (selectedStudentId) {
      onDeleteStudent(selectedStudentId);
      setDeleteDialogOpen(false);
      setSelectedStudentId(null);
    }
  };

  // Confirm student dropout
  const confirmDropout = () => {
    if (selectedStudentId) {
      onDropoutStudent(selectedStudentId);
      setDropoutDialogOpen(false);
      setSelectedStudentId(null);
    }
  };

  // Format student data for the table
  const formatStudentData = (student: Student) => {
    const canDelete = canDeleteStudent(student);
    const isDropped = student.status === 'dropout';
    const isSelected = selectedStudents.includes(student.id);
    
    const baseData = {
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
          variant={
            student.status === 'active' ? 'default' : 
            student.status === 'dropout' ? 'destructive' :
            student.status === 'graduated' ? 'secondary' :
            'outline'
          }
        >
          {student.status}
        </Badge>
      ),
      actions: (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStudentAction('view', student)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStudentAction('contact', student)}>
              <Mail className="h-4 w-4 mr-2" />
              Contact Student
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!isDropped && (
              <DropdownMenuItem 
                onClick={() => handleStudentAction('dropout', student)}
                className="text-warning"
              >
                <UserMinus className="h-4 w-4 mr-2" />
                Mark as Dropout
              </DropdownMenuItem>
            )}
            {canDelete && (
              <DropdownMenuItem 
                onClick={() => handleStudentAction('delete', student)}
                className="text-destructive"
              >
                <UserX className="h-4 w-4 mr-2" />
                Delete Student
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    };

    // Add checkbox column if multi-select is enabled
    if (showMultiSelect) {
      return {
        select: (
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelectStudent?.(student.id, !!checked)}
            aria-label={`Select ${student.name}`}
          />
        ),
        ...baseData
      };
    }

    return baseData;
  };

  // Handle select all functionality
  const allSelected = students.length > 0 && selectedStudents.length === students.length;
  const someSelected = selectedStudents.length > 0 && selectedStudents.length < students.length;

  const baseColumns = [
    { key: 'name', label: 'Student Name' },
    { key: 'email', label: 'Email' },
    { key: 'batch', label: 'Batch' },
    { key: 'enrolledDate', label: 'Enrolled Date' },
    { key: 'progress', label: 'Progress' },
    { key: 'attendance', label: 'Attendance (Out of 20 Classes)' },
    { key: 'lastActive', label: 'Last Active' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  // Add checkbox column if multi-select is enabled
  const studentColumns = showMultiSelect ? [
    { 
      key: 'select', 
      label: (
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onCheckedChange={(checked) => onSelectAll?.(!!checked)}
          aria-label="Select all students"
        />
      ), 
      sortable: false 
    },
    ...baseColumns
  ] : baseColumns;

  return (
    <>
      <DataTable
        data={students.map(formatStudentData)}
        columns={studentColumns}
        searchable={false}
        filterable={false}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Student
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStudentName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dropout Confirmation Dialog */}
      <Dialog open={dropoutDialogOpen} onOpenChange={setDropoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserMinus className="h-5 w-5 text-warning" />
              Mark as Dropout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to mark {selectedStudentName} as dropped out? Their progress data will be preserved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDropoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirmDropout}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MasterStudentTable; 