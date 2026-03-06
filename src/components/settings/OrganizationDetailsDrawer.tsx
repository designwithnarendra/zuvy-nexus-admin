'use client'

import { useState, useRef, useEffect } from 'react';
import { Organisation } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X, Cloud, Edit, Trash2, Search, Plus, Shield, Users, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OrganizationDetailsDrawerProps {
  org: Organisation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (org: Organisation) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  dateAdded: string;
  avatar?: string;
}

const OrganizationDetailsDrawer = ({
  org,
  isOpen,
  onClose,
  onSave
}: OrganizationDetailsDrawerProps) => {
  const [editedOrg, setEditedOrg] = useState<Organisation | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [orgUsers, setOrgUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Instructor'
  });
  const [isDeleteOrgModalOpen, setIsDeleteOrgModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle close with animation delay
  const handleAnimatedClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 500); // Match the animation duration
  };

  // Update editedOrg when org prop changes
  useEffect(() => {
    if (org) {
      setEditedOrg(org);
      setLogoPreview(null);
      setLogoFile(null);
      setSearchTerm('');
      setRoleFilter('all');
      setIsAddUserModalOpen(false);
      setIsEditUserModalOpen(false);
      // Initialize with sample users
      setOrgUsers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@amazon.com',
          role: 'Admin',
          dateAdded: 'Jan 15, 2024',
          avatar: 'JD'
        },
        {
          id: '2',
          name: 'Alice Smith',
          email: 'alice.s@amazon.com',
          role: 'Instructor',
          dateAdded: 'Feb 10, 2024',
          avatar: 'AS'
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob.w@amazon.com',
          role: 'Ops',
          dateAdded: 'Feb 12, 2024',
          avatar: 'BW'
        }
      ]);
    }
  }, [org]);

  // Filter users based on search term and role filter
  const filteredUsers = orgUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    const user: User = {
      id: `user_${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      dateAdded: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      avatar: newUser.name.split(' ').map(n => n[0]).join('')
    };

    setOrgUsers([...orgUsers, user]);
    setNewUser({ name: '', email: '', role: 'Instructor' });
    setIsAddUserModalOpen(false);
    toast.success('User added successfully!');
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setIsEditUserModalOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser || !editingUser.name.trim() || !editingUser.email.trim() || !editingUser.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    setOrgUsers(prevUsers => 
      prevUsers.map(user => user.id === editingUser.id ? editingUser : user)
    );
    
    setIsEditUserModalOpen(false);
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    setIsDeleteUserModalOpen(true);
  };

  const confirmDeleteUser = () => {
    if (deletingUserId) {
      const user = orgUsers.find(u => u.id === deletingUserId);
      setOrgUsers(prevUsers => prevUsers.filter(u => u.id !== deletingUserId));
      setIsDeleteUserModalOpen(false);
      setDeletingUserId(null);
      toast.success('User deleted successfully!');
    }
  };

  const confirmDeleteOrganisation = () => {
    if (editedOrg) {
      setIsDeleteOrgModalOpen(false);
      onClose();
      // The parent component will handle removing from the list
      toast.success('Organization deleted successfully!', {
        description: `${editedOrg.name} has been removed from the platform.`
      });
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setOrgUsers(prevUsers => 
      prevUsers.map(user => user.id === userId ? { ...user, role: newRole } : user)
    );
    const user = orgUsers.find(u => u.id === userId);
    toast.success(`${user?.name}'s role updated to ${newRole}`);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = () => {
    if (editedOrg) {
      onSave(editedOrg);
      toast.success('Organization updated successfully!');
      handleAnimatedClose();
    }
  };

  if (!org || !editedOrg) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-md z-30 ${
          isOpen && !isAnimating ? 'animate-backdrop-in opacity-100' : 'animate-backdrop-out opacity-0 pointer-events-none'
        }`}
        onClick={handleAnimatedClose}
      />

      {/* Drawer - slides in from right with smooth animation */}
      <div
        className={`fixed top-16 right-0 bottom-0 w-2/3 bg-background shadow-2xl z-40 flex flex-col ${
          isOpen && !isAnimating ? 'animate-drawer-in translate-x-0 opacity-100' : 'animate-drawer-out translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-card/95 border-b px-6 py-4 flex items-start justify-between">
          <div className="flex gap-4 flex-1">
            {/* Logo Uploader */}
            <div className="flex-shrink-0">
              <div className="relative">
                {logoPreview || org.logo ? (
                  <div className="w-20 h-20 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden">
                    <Image
                      src={logoPreview || org.logo || ''}
                      alt={org.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload Logo"
                  >
                    <Cloud className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                {(logoPreview || org.logo) && (
                  <button
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 hidden"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Header Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold tracking-tight">{editedOrg.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {editedOrg.managementType} • Joined {new Date(editedOrg.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAnimatedClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Organization Users */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Organization Users ({filteredUsers.length})</h3>
                <p className="text-muted-foreground mt-1">Manage all users in your organization</p>
              </div>
              <Dialog open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add User</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-semibold">Name *</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-semibold">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-semibold">Select Role *</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'admin', name: 'Admin', icon: Shield, description: 'Full access to organization' },
                          { id: 'instructor', name: 'Instructor', icon: GraduationCap, description: 'Manage courses and students' },
                          { id: 'ops', name: 'Ops', icon: Users, description: 'Day to day operations' }
                        ].map((role) => {
                          const Icon = role.icon;
                          const isSelected = newUser.role === role.name;
                          return (
                            <div
                              key={role.id}
                              onClick={() => setNewUser(prev => ({ ...prev, role: role.name }))}
                              className={cn(
                                "relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200",
                                "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                                isSelected
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border hover:border-primary/50"
                              )}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={cn(
                                  "flex h-10 w-10 items-center justify-center rounded-full",
                                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                                )}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className={cn(
                                    "text-sm font-semibold",
                                    isSelected ? "text-primary" : "text-foreground"
                                  )}>
                                    {role.name}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {role.description}
                                  </p>
                                </div>
                              </div>
                              
                              {/* Selection indicator */}
                              {isSelected && (
                                <div className="absolute top-2 right-2">
                                  <div className="h-3 w-3 bg-primary rounded-full" />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddUserModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>
                        Add User
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Instructor">Instructor</SelectItem>
                  <SelectItem value="Ops">Ops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table - Using shadcn Table component */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleRoleChange(user.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Instructor">Instructor</SelectItem>
                              <SelectItem value="Ops">Ops</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{user.dateAdded}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditUser(user)}
                              className="h-8 w-8"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteUser(user.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Edit User Modal */}
            <Dialog open={isEditUserModalOpen} onOpenChange={setIsEditUserModalOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="editName" className="font-semibold">Name *</Label>
                      <Input
                        id="editName"
                        value={editingUser?.name || ''}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="editEmail" className="font-semibold">Email *</Label>
                      <Input
                        id="editEmail"
                        type="email"
                        value={editingUser?.email || ''}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-semibold">Select Role *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'admin', name: 'Admin', icon: Shield, description: 'Full access to organization' },
                        { id: 'instructor', name: 'Instructor', icon: GraduationCap, description: 'Manage courses and students' },
                        { id: 'ops', name: 'Ops', icon: Users, description: 'Day to day operations' }
                      ].map((role) => {
                        const Icon = role.icon;
                        const isSelected = editingUser?.role === role.name;
                        return (
                          <div
                            key={role.id}
                            onClick={() => setEditingUser(prev => prev ? { ...prev, role: role.name } : null)}
                            className={cn(
                              "relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200",
                              "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                              isSelected
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full",
                                isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                              )}>
                                <Icon className="h-5 w-5" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className={cn(
                                  "text-sm font-semibold",
                                  isSelected ? "text-primary" : "text-foreground"
                                )}>
                                  {role.name}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                  {role.description}
                                </p>
                              </div>
                            </div>
                            
                            {/* Selection indicator */}
                            {isSelected && (
                              <div className="absolute top-2 right-2">
                                <div className="h-3 w-3 bg-primary rounded-full" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditUserModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateUser}>
                      Update User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-card/95 border-t px-6 py-4 flex items-center justify-between">
          <button 
            className="text-red-600 font-medium hover:text-red-700 transition-colors"
            onClick={() => setIsDeleteOrgModalOpen(true)}
          >
            Delete Organisation
          </button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleAnimatedClose}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary-mid text-white" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>

        {/* Delete Organisation Confirmation Modal */}
        <Dialog open={isDeleteOrgModalOpen} onOpenChange={setIsDeleteOrgModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete the organisation "{editedOrg?.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteOrgModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteOrganisation}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete User Confirmation Modal */}
        <Dialog open={isDeleteUserModalOpen} onOpenChange={setIsDeleteUserModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete {orgUsers.find(u => u.id === deletingUserId)?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteUserModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteUser}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default OrganizationDetailsDrawer;
