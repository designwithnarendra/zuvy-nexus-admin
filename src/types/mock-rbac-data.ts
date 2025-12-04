import { 
  User, 
  Role, 
  Action, 
  RoleActionPermission, 
  InviteLink,
  UserRole,
  ActionType,
  Organisation
} from './index';

// Mock Actions based on the reference image
export const mockActions: Action[] = [
  {
    id: '1',
    name: 'User/Role Management',
    description: 'Manage users and their roles within the platform',
    category: 'User Management'
  },
  {
    id: '2',
    name: 'Create/Edit Roles & Permissions',
    description: 'Create new roles and modify existing role permissions',
    category: 'User Management'
  },
  {
    id: '3',
    name: 'Assign/Revoke Roles',
    description: 'Assign or revoke roles from users',
    category: 'User Management'
  },
  {
    id: '4',
    name: 'Access Review Reminders',
    description: 'Set up and manage access review reminders',
    category: 'Operations'
  },
  {
    id: '5',
    name: 'Create & Schedule Assessments',
    description: 'Create and schedule assessments for courses',
    category: 'Content Management'
  },
  {
    id: '6',
    name: 'View Analytics (Class Response)',
    description: 'View class response analytics and student engagement metrics',
    category: 'Analytics'
  },
  {
    id: '7',
    name: 'Create/Edit Quizzes',
    description: 'Create and edit quiz content',
    category: 'Content Management'
  },
  {
    id: '8',
    name: 'View Individual student grades',
    description: 'View and access individual student grades and performance',
    category: 'Analytics'
  },
  {
    id: '9',
    name: 'Delete/Publish Courses',
    description: 'Delete or publish course content',
    category: 'Content Management'
  },
  {
    id: '10',
    name: 'View Assigned Courses Only',
    description: 'View only courses assigned to the user',
    category: 'Content Management'
  },
  {
    id: '11',
    name: 'Instructor Analytics',
    description: 'View instructor-specific analytics and performance metrics',
    category: 'Analytics'
  },
  {
    id: '12',
    name: 'Student Onboarding',
    description: 'Manage student onboarding processes and workflows',
    category: 'Operations'
  },
  {
    id: '13',
    name: 'Request Technical Support (Self)',
    description: 'Request technical support for platform issues',
    category: 'Support'
  }
];

// Mock Roles with descriptions
export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Users who have full access to all functions of the platform',
    permissions: [],
    isSystem: true,
    color: '#f97316'
  },
  {
    id: '2',
    name: 'Ops',
    description: 'Users who see day to day operations of the courses for Zuvy',
    permissions: [],
    isSystem: true,
    color: '#3b82f6'
  },
  {
    id: '3',
    name: 'Instructor',
    description: 'Users who teach the live classes in the courses and check submissions',
    permissions: [],
    isSystem: true,
    color: '#10b981'
  }
];

// Mock Role-Action Permissions based on the reference image
export const mockRoleActionPermissions: RoleActionPermission[] = [
  // Admin - Has access to everything
  ...mockActions.map(action => ({
    roleId: '1',
    actionId: action.id,
    allowed: true,
    scopeType: 'full' as const
  })),

  // Ops permissions based on reference image
  { roleId: '2', actionId: '5', allowed: true, scopeType: 'full' }, // Create & Schedule Assessments
  { roleId: '2', actionId: '6', allowed: true, scopeType: 'full' }, // View Analytics (Class Response)
  { roleId: '2', actionId: '7', allowed: true, scopeType: 'full' }, // Create/Edit Quizzes
  { roleId: '2', actionId: '8', allowed: true, scopeType: 'full' }, // View Individual student grades
  { roleId: '2', actionId: '10', allowed: true, scopeType: 'full' }, // View Assigned Courses Only
  { roleId: '2', actionId: '12', allowed: true, scopeType: 'full' }, // Student Onboarding
  { roleId: '2', actionId: '13', allowed: true, scopeType: 'full' }, // Request Technical Support (Self)

  // Instructor permissions based on reference image
  { roleId: '3', actionId: '5', allowed: true, scopeType: 'full' }, // Create & Schedule Assessments
  { roleId: '3', actionId: '6', allowed: true, scopeType: 'full' }, // View Analytics (Class Response)
  { roleId: '3', actionId: '7', allowed: true, scopeType: 'full' }, // Create/Edit Quizzes
  { roleId: '3', actionId: '8', allowed: true, scopeType: 'full' }, // View Individual student grades
  { roleId: '3', actionId: '10', allowed: true, scopeType: 'full' }, // View Assigned Courses Only
  { roleId: '3', actionId: '11', allowed: true, scopeType: 'full' }, // Instructor Analytics
  { roleId: '3', actionId: '13', allowed: true, scopeType: 'full' }, // Request Technical Support (Self)
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@zuvy.org',
    role: 'Admin',
    roleId: 'role-1',
    dateAdded: '2024-01-20T14:15:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@zuvy.org',
    role: 'Admin',
    roleId: 'role-1',
    dateAdded: '2024-02-01T09:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@zuvy.org',
    role: 'Ops',
    roleId: 'role-2',
    dateAdded: '2024-02-05T11:30:00Z',
    status: 'active'
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@zuvy.org',
    role: 'Instructor',
    roleId: 'role-3',
    dateAdded: '2024-02-10T16:45:00Z',
    status: 'active'
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa.park@zuvy.org',
    role: 'Instructor',
    roleId: 'role-3',
    dateAdded: '2024-02-15T13:20:00Z',
    status: 'active'
  },
  {
    id: '6',
    name: 'David Wilson',
    email: 'david.wilson@zuvy.org',
    role: 'Instructor',
    roleId: 'role-3',
    dateAdded: '2024-02-20T10:00:00Z',
    status: 'active'
  },
  {
    id: '7',
    name: 'Anna Thompson',
    email: 'anna.thompson@zuvy.org',
    role: 'Ops',
    roleId: 'role-2',
    dateAdded: '2024-02-25T15:30:00Z',
    status: 'active'
  }
];

// Mock Invite Links
export const mockInviteLinks: InviteLink[] = [
  {
    id: '1',
    role: 'Ops',
    token: 'ops-invite-abc123',
    expiresAt: '2024-03-15T23:59:59Z',
    createdBy: '1',
    createdAt: '2024-02-15T10:00:00Z',
    used: false
  },
  {
    id: '2',
    role: 'Instructor',
    token: 'instructor-invite-def456',
    expiresAt: '2024-03-20T23:59:59Z',
    createdBy: '1',
    createdAt: '2024-02-20T14:30:00Z',
    used: true,
    usedBy: '7',
    usedAt: '2024-02-20T16:45:00Z'
  }
];

// Helper functions for managing mock data
export const getMockUsersByRole = (role: UserRole): User[] => {
  return mockUsers.filter(user => user.role === role);
};

export const getMockRolePermissions = (roleId: string): RoleActionPermission[] => {
  return mockRoleActionPermissions.filter(permission => permission.roleId === roleId);
};

export const getMockActionById = (actionId: string): Action | undefined => {
  return mockActions.find(action => action.id === actionId);
};

export const getMockRoleById = (roleId: string): Role | undefined => {
  return mockRoles.find(role => role.id === roleId);
};

export const canRolePerformAction = (roleId: string, actionId: string): boolean => {
  const permission = mockRoleActionPermissions.find(
    p => p.roleId === roleId && p.actionId === actionId
  );
  return permission?.allowed || false;
};

// Mock Organisations
export const mockOrganisations: Organisation[] = [
  {
    id: 'org_1',
    name: 'Amazon Future Engineer',
    managementType: 'Self Managed',
    pointOfContactName: 'John Doe',
    pointOfContactEmail: 'john.doe@amazon.com',
    logo: '/logos/amazon-future-engineer.svg',
    dateAdded: '2024-01-15'
  },
  {
    id: 'org_2',
    name: 'Microsoft',
    managementType: 'Zuvy Managed',
    pointOfContactName: 'Sarah Smith',
    pointOfContactEmail: 'sarah.smith@microsoft.com',
    zuvyAssigneeName: 'Alex Kumar',
    zuvyAssigneeEmail: 'alex.kumar@zuvy.com',
    logo: '/logos/microsoft.svg',
    dateAdded: '2024-02-20'
  },
  {
    id: 'org_3',
    name: 'Global Solutions Inc',
    managementType: 'Self Managed',
    pointOfContactName: 'Michael Johnson',
    pointOfContactEmail: 'michael@globalsolutions.com',
    dateAdded: '2024-03-10'
  },
  {
    id: 'org_4',
    name: 'Amazon Future Engineer',
    managementType: 'Zuvy Managed',
    pointOfContactName: 'Emily Brown',
    pointOfContactEmail: 'emily.brown@amazon.com',
    zuvyAssigneeName: 'Priya Sharma',
    zuvyAssigneeEmail: 'priya.sharma@zuvy.com',
    logo: '/logos/amazon-future-engineer.svg',
    dateAdded: '2024-04-05'
  },
  {
    id: 'org_5',
    name: 'Enterprise Solutions',
    managementType: 'Self Managed',
    pointOfContactName: 'David Wilson',
    pointOfContactEmail: 'david.wilson@enterprisesol.com',
    dateAdded: '2024-05-12'
  }
];

// Admin to Organization Mapping
export interface AdminOrganizationMapping {
  adminId: string;
  adminType: 'Admin-Self Managed' | 'Admin-Zuvy Managed';
  organisationIds: string[];
  defaultOrganisationId: string;
  lastAccessedOrganisationId: string;
  lastAccessedAt: string;
}

export const mockAdminOrganisationMappings: AdminOrganizationMapping[] = [
  {
    adminId: '1', // This is the Admin user from mockUsers (Sarah Johnson)
    adminType: 'Admin-Self Managed',
    organisationIds: ['org_1'], // Amazon Future Engineer
    defaultOrganisationId: 'org_1',
    lastAccessedOrganisationId: 'org_1',
    lastAccessedAt: new Date().toISOString()
  },
  {
    adminId: '2', // Second admin for Zuvy Managed (Mike Chen)
    adminType: 'Admin-Zuvy Managed',
    organisationIds: ['org_2', 'org_4'], // Microsoft and Amazon Future Engineer
    defaultOrganisationId: 'org_2',
    lastAccessedOrganisationId: 'org_2',
    lastAccessedAt: new Date().toISOString()
  }
];