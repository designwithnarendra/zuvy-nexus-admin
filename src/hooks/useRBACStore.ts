'use client'

import { useState, useCallback } from 'react';
import { User, Role, Action, RoleActionPermission, InviteLink, UserRole } from '@/types/index';
import { 
  mockUsers, 
  mockRoles, 
  mockActions, 
  mockRoleActionPermissions, 
  mockInviteLinks 
} from '@/types/mock-rbac-data';

interface RBACStore {
  // State
  users: User[];
  roles: Role[];
  actions: Action[];
  permissions: RoleActionPermission[];
  inviteLinks: InviteLink[];
  
  // User operations
  addUser: (user: Omit<User, 'id' | 'dateAdded'>) => Promise<User>;
  updateUser: (userId: string, updates: Partial<User>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
  changeUserRole: (userId: string, newRole: UserRole) => Promise<User>;
  
  // Role operations
  addRole: (role: Omit<Role, 'id'>) => Promise<Role>;
  updateRole: (roleId: string, updates: Partial<Role>) => Promise<Role>;
  deleteRole: (roleId: string) => Promise<void>;
  
  // Action operations
  addAction: (action: Omit<Action, 'id'>) => Promise<Action>;
  updateAction: (actionId: string, updates: Partial<Action>) => Promise<Action>;
  deleteAction: (actionId: string) => Promise<void>;
  
  // Permission operations
  updatePermission: (roleId: string, actionId: string, allowed: boolean, scopeType?: string) => Promise<void>;
  
  // Invite operations
  generateInviteLink: (role: UserRole) => Promise<InviteLink>;
  useInviteLink: (token: string, userId: string) => Promise<boolean>;
  
  // Query operations
  getUsersByRole: (role: UserRole) => User[];
  getRolePermissions: (roleId: string) => RoleActionPermission[];
  canUserPerformAction: (userId: string, actionId: string) => boolean;
}

export const useRBACStore = (): RBACStore => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [permissions, setPermissions] = useState<RoleActionPermission[]>(mockRoleActionPermissions);
  const [inviteLinks, setInviteLinks] = useState<InviteLink[]>(mockInviteLinks);

  // User operations
  const addUser = useCallback(async (userData: Omit<User, 'id' | 'dateAdded'>): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      dateAdded: new Date().toISOString(),
      status: 'active'
    };
    
    setUsers(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const updateUser = useCallback(async (userId: string, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let updatedUser: User | null = null;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        updatedUser = { ...user, ...updates };
        return updatedUser;
      }
      return user;
    }));
    
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    return updatedUser;
  }, []);

  const deleteUser = useCallback(async (userId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setUsers(prev => prev.filter(user => user.id !== userId));
  }, []);

  const changeUserRole = useCallback(async (userId: string, newRole: UserRole): Promise<User> => {
    return updateUser(userId, { role: newRole });
  }, [updateUser]);

  // Role operations
  const addRole = useCallback(async (roleData: Omit<Role, 'id'>): Promise<Role> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRole: Role = {
      ...roleData,
      id: `role-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setRoles(prev => [...prev, newRole]);
    return newRole;
  }, []);

  const updateRole = useCallback(async (roleId: string, updates: Partial<Role>): Promise<Role> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let updatedRole: Role | null = null;
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        updatedRole = { ...role, ...updates };
        return updatedRole;
      }
      return role;
    }));
    
    if (!updatedRole) {
      throw new Error('Role not found');
    }
    
    return updatedRole;
  }, []);

  const deleteRole = useCallback(async (roleId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if role is in use
    const isRoleInUse = users.some(user => {
      const userRole = roles.find(r => r.name === user.role);
      return userRole?.id === roleId;
    });
    
    if (isRoleInUse) {
      throw new Error('Cannot delete role that is assigned to users');
    }
    
    setRoles(prev => prev.filter(role => role.id !== roleId));
    // Also remove associated permissions
    setPermissions(prev => prev.filter(permission => permission.roleId !== roleId));
  }, [users, roles]);

  // Action operations
  const addAction = useCallback(async (actionData: Omit<Action, 'id'>): Promise<Action> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAction: Action = {
      ...actionData,
      id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    
    setActions(prev => [...prev, newAction]);
    return newAction;
  }, []);

  const updateAction = useCallback(async (actionId: string, updates: Partial<Action>): Promise<Action> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let updatedAction: Action | null = null;
    setActions(prev => prev.map(action => {
      if (action.id === actionId) {
        updatedAction = { ...action, ...updates };
        return updatedAction;
      }
      return action;
    }));
    
    if (!updatedAction) {
      throw new Error('Action not found');
    }
    
    return updatedAction;
  }, []);

  const deleteAction = useCallback(async (actionId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setActions(prev => prev.filter(action => action.id !== actionId));
    // Also remove associated permissions
    setPermissions(prev => prev.filter(permission => permission.actionId !== actionId));
  }, []);

  // Permission operations
  const updatePermission = useCallback(async (
    roleId: string, 
    actionId: string, 
    allowed: boolean, 
    scopeType: string = 'full'
  ): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setPermissions(prev => {
      const existingIndex = prev.findIndex(p => p.roleId === roleId && p.actionId === actionId);
      
      if (existingIndex >= 0) {
        // Update existing permission
        const updated = [...prev];
        updated[existingIndex] = { 
          ...updated[existingIndex], 
          allowed, 
          scopeType: scopeType as any 
        };
        return updated;
      } else {
        // Add new permission
        return [...prev, {
          roleId,
          actionId,
          allowed,
          scopeType: scopeType as any
        }];
      }
    });
  }, []);

  // Invite operations
  const generateInviteLink = useCallback(async (role: UserRole): Promise<InviteLink> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const token = `${role.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiry
    
    const inviteLink: InviteLink = {
      id: `invite-${Date.now()}`,
      role,
      token,
      expiresAt: expiresAt.toISOString(),
      createdBy: 'current-user-id', // In real app, this would be current user
      createdAt: new Date().toISOString(),
      used: false
    };
    
    setInviteLinks(prev => [...prev, inviteLink]);
    return inviteLink;
  }, []);

  const useInviteLink = useCallback(async (token: string, userId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const invite = inviteLinks.find(inv => inv.token === token && !inv.used);
    
    if (!invite) {
      return false;
    }
    
    const now = new Date();
    const expiryDate = new Date(invite.expiresAt);
    
    if (now > expiryDate) {
      return false;
    }
    
    // Mark invite as used
    setInviteLinks(prev => prev.map(inv => 
      inv.id === invite.id 
        ? { ...inv, used: true, usedBy: userId, usedAt: new Date().toISOString() }
        : inv
    ));
    
    return true;
  }, [inviteLinks]);

  // Query operations
  const getUsersByRole = useCallback((role: UserRole): User[] => {
    return users.filter(user => user.role === role);
  }, [users]);

  const getRolePermissions = useCallback((roleId: string): RoleActionPermission[] => {
    return permissions.filter(permission => permission.roleId === roleId);
  }, [permissions]);

  const canUserPerformAction = useCallback((userId: string, actionId: string): boolean => {
    const user = users.find(u => u.id === userId);
    if (!user) return false;
    
    const userRole = roles.find(r => r.name === user.role);
    if (!userRole) return false;
    
    // Super Admin can do everything
    if (userRole.name === 'Super Admin') return true;
    
    const permission = permissions.find(
      p => p.roleId === userRole.id && p.actionId === actionId
    );
    
    return permission?.allowed || false;
  }, [users, roles, permissions]);

  return {
    // State
    users,
    roles,
    actions,
    permissions,
    inviteLinks,
    
    // Operations
    addUser,
    updateUser,
    deleteUser,
    changeUserRole,
    addRole,
    updateRole,
    deleteRole,
    addAction,
    updateAction,
    deleteAction,
    updatePermission,
    generateInviteLink,
    useInviteLink,
    getUsersByRole,
    getRolePermissions,
    canUserPerformAction
  };
};