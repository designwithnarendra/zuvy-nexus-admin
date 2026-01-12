'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Organisation, ManagementType } from '@/types/index';
import { mockOrganisations } from '@/types/mock-rbac-data';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import DataTable from '@/components/shared/DataTable';
import AddOrganisationModal from './AddOrganisationModal';

const OrganisationsPage = () => {
  const router = useRouter();
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrganisation, setEditingOrganisation] = useState<Organisation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingOrganisation, setDeletingOrganisation] = useState<Organisation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [managementTypeFilter, setManagementTypeFilter] = useState<string>('all');
  
  // Management Type Change Modal States
  const [isManagementTypeChangeModalOpen, setIsManagementTypeChangeModalOpen] = useState(false);
  const [pendingManagementTypeChange, setPendingManagementTypeChange] = useState<{
    orgId: string;
    newType: ManagementType;
    currentType: ManagementType;
  } | null>(null);
  const [zuvyAssigneeData, setZuvyAssigneeData] = useState({
    name: '',
    email: ''
  });
  const [managementTypeChangeErrors, setManagementTypeChangeErrors] = useState<Record<string, string>>({});

  const handleAddOrganisation = (newOrg: Omit<Organisation, 'id' | 'dateAdded'>) => {
    const organisation: Organisation = {
      id: `org_${Date.now()}`,
      ...newOrg,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setOrganisations(prev => [...prev, organisation]);
    setIsAddModalOpen(false);
    toast.success('Organization added successfully!', {
      description: `${organisation.name} has been added to the platform.`
    });
  };

  const handleEditOrganisation = (updatedOrg: Organisation) => {
    setOrganisations(prev => prev.map(org => 
      org.id === updatedOrg.id ? updatedOrg : org
    ));
    setIsEditModalOpen(false);
    setEditingOrganisation(null);
    toast.success('Organization updated successfully!', {
      description: `${updatedOrg.name} has been updated.`
    });
  };

  const handleManagementTypeChange = (orgId: string, newType: ManagementType) => {
    const org = organisations.find(o => o.id === orgId);
    if (org) {
      if (newType === 'Zuvy Managed' && org.managementType === 'Self Managed') {
        // Changing from Self Managed to Zuvy Managed - show modal to collect Zuvy Assignee details
        setPendingManagementTypeChange({
          orgId,
          newType,
          currentType: org.managementType
        });
        setZuvyAssigneeData({ name: '', email: '' });
        setManagementTypeChangeErrors({});
        setIsManagementTypeChangeModalOpen(true);
      } else if (newType === 'Self Managed' && org.managementType === 'Zuvy Managed') {
        // Changing from Zuvy Managed to Self Managed - show confirmation dialog
        setPendingManagementTypeChange({
          orgId,
          newType,
          currentType: org.managementType
        });
        setIsManagementTypeChangeModalOpen(true);
      }
    }
  };

  const handleDeleteClick = (org: Organisation) => {
    setDeletingOrganisation(org);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingOrganisation) {
      setOrganisations(prev => prev.filter(org => org.id !== deletingOrganisation.id));
      toast.success('Organization deleted successfully!', {
        description: `${deletingOrganisation.name} has been removed from the platform.`
      });
      setIsDeleteModalOpen(false);
      setDeletingOrganisation(null);
    }
  };

  const handleConfirmManagementTypeChange = () => {
    if (!pendingManagementTypeChange) return;

    const { orgId, newType, currentType } = pendingManagementTypeChange;

    // If changing to Zuvy Managed, validate Zuvy Assignee data
    if (newType === 'Zuvy Managed') {
      const newErrors: Record<string, string> = {};
      
      if (!zuvyAssigneeData.name.trim()) {
        newErrors.name = 'Zuvy Assignee Name is required';
      }
      if (!zuvyAssigneeData.email.trim()) {
        newErrors.email = 'Zuvy Assignee Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(zuvyAssigneeData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (Object.keys(newErrors).length > 0) {
        setManagementTypeChangeErrors(newErrors);
        return;
      }
    }

    // Update the organisation
    const org = organisations.find(o => o.id === orgId);
    if (org) {
      const updatedOrg: Organisation = {
        ...org,
        managementType: newType
      };

      if (newType === 'Zuvy Managed') {
        updatedOrg.zuvyAssigneeName = zuvyAssigneeData.name;
        updatedOrg.zuvyAssigneeEmail = zuvyAssigneeData.email;
      } else if (newType === 'Self Managed') {
        // Remove Zuvy Assignee data
        updatedOrg.zuvyAssigneeName = undefined;
        updatedOrg.zuvyAssigneeEmail = undefined;
      }

      setOrganisations(prev => prev.map(o => o.id === orgId ? updatedOrg : o));
      
      const actionText = newType === 'Zuvy Managed' ? 'changed to Zuvy Managed' : 'changed to Self Managed';
      toast.success('Management type updated!', {
        description: `${org.name} ${actionText}.`
      });
    }

    // Close modal and reset
    setIsManagementTypeChangeModalOpen(false);
    setPendingManagementTypeChange(null);
    setZuvyAssigneeData({ name: '', email: '' });
    setManagementTypeChangeErrors({});
  };

  const handleCancelManagementTypeChange = () => {
    setIsManagementTypeChangeModalOpen(false);
    setPendingManagementTypeChange(null);
    setZuvyAssigneeData({ name: '', email: '' });
    setManagementTypeChangeErrors({});
  };

  const handleEditClick = (org: Organisation) => {
    setEditingOrganisation(org);
    setIsEditModalOpen(true);
  };

  // Filter organisations based on search term and management type
  const filteredOrganisations = organisations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.pointOfContactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.pointOfContactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.zuvyAssigneeName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (org.zuvyAssigneeEmail?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesManagementType = managementTypeFilter === 'all' || org.managementType === managementTypeFilter;
    
    return matchesSearch && matchesManagementType;
  });

  const organisationColumns = [
    { key: 'name', label: 'Organisation' },
    { key: 'managementType', label: 'Management Type' },
    { key: 'pointOfContact', label: 'Point of Contact' },
    { key: 'zuvyAssignee', label: 'Zuvy Assignee' },
    { key: 'dateAdded', label: 'Date Added' },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  const formattedOrganisations = filteredOrganisations.map(org => ({
    ...org,
    name: (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/settings/organisations/${org.id}`);
        }}
        className="font-medium text-primary hover:underline transition-colors text-left cursor-pointer"
        type="button"
      >
        {org.name}
      </button>
    ),
    managementType: (
      <Select
        value={org.managementType}
        onValueChange={(value: ManagementType) => handleManagementTypeChange(org.id, value)}
      >
        <SelectTrigger className="w-[170px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Self Managed">Self Managed</SelectItem>
          <SelectItem value="Zuvy Managed">Zuvy Managed</SelectItem>
        </SelectContent>
      </Select>
    ),
    pointOfContact: (
      <div className="flex flex-col">
        <span className="font-medium">{org.pointOfContactName}</span>
        <span className="text-xs text-muted-foreground">{org.pointOfContactEmail}</span>
      </div>
    ),
    zuvyAssignee: org.managementType === 'Zuvy Managed' ? (
      <div className="flex flex-col">
        <span className="font-medium">{org.zuvyAssigneeName}</span>
        <span className="text-xs text-muted-foreground">{org.zuvyAssigneeEmail}</span>
      </div>
    ) : (
      <span className="text-muted-foreground">-</span>
    ),
    actions: (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEditClick(org)}
          className="h-8 w-8 hover:bg-primary hover:text-white"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteClick(org)}
          className="h-8 w-8 text-destructive hover:bg-red-500 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }));

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-h5 mb-2">
            Organisations ({filteredOrganisations.length})
          </h1>
          <p className="text-muted-foreground">
            Manage organizations onboarded on the platform
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Organisation
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search organisations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={managementTypeFilter} onValueChange={setManagementTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Self Managed">Self Managed</SelectItem>
            <SelectItem value="Zuvy Managed">Zuvy Managed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table with integrated search and filters */}
      <DataTable
        data={formattedOrganisations}
        columns={organisationColumns}
        searchable={false}
        filterable={true}
        itemsPerPage={10}
      />

      {/* Add Organisation Modal */}
      {isAddModalOpen && (
        <AddOrganisationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddOrganisation}
        />
      )}

      {/* Edit Organisation Modal */}
      {isEditModalOpen && editingOrganisation && (
        <AddOrganisationModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingOrganisation(null);
          }}
          onSubmit={(data) => {
            handleEditOrganisation({
              ...editingOrganisation,
              ...data
            });
          }}
          initialData={editingOrganisation}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the organisation "{deletingOrganisation?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Management Type Change Modal */}
      <Dialog open={isManagementTypeChangeModalOpen} onOpenChange={handleCancelManagementTypeChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingManagementTypeChange?.newType === 'Zuvy Managed'
                ? 'Add Zuvy Assignee Details'
                : 'Confirm Management Type Change'}
            </DialogTitle>
          </DialogHeader>

          {pendingManagementTypeChange?.newType === 'Zuvy Managed' ? (
            // Form for adding Zuvy Assignee when changing to Zuvy Managed
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please provide Zuvy Assignee details to proceed with this change.
              </p>

              <div className="space-y-2">
                <Label htmlFor="zuvyName">Zuvy Assignee Name *</Label>
                <Input
                  id="zuvyName"
                  value={zuvyAssigneeData.name}
                  onChange={(e) => {
                    setZuvyAssigneeData({ ...zuvyAssigneeData, name: e.target.value });
                    if (managementTypeChangeErrors.name) {
                      setManagementTypeChangeErrors({ ...managementTypeChangeErrors, name: '' });
                    }
                  }}
                  placeholder="Enter Zuvy Assignee name"
                  className={managementTypeChangeErrors.name ? 'border-red-500' : ''}
                />
                {managementTypeChangeErrors.name && (
                  <p className="text-sm text-red-500">{managementTypeChangeErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="zuvyEmail">Zuvy Assignee Email Id *</Label>
                <Input
                  id="zuvyEmail"
                  type="email"
                  value={zuvyAssigneeData.email}
                  onChange={(e) => {
                    setZuvyAssigneeData({ ...zuvyAssigneeData, email: e.target.value });
                    if (managementTypeChangeErrors.email) {
                      setManagementTypeChangeErrors({ ...managementTypeChangeErrors, email: '' });
                    }
                  }}
                  placeholder="Enter email address"
                  className={managementTypeChangeErrors.email ? 'border-red-500' : ''}
                />
                {managementTypeChangeErrors.email && (
                  <p className="text-sm text-red-500">{managementTypeChangeErrors.email}</p>
                )}
              </div>
            </div>
          ) : (
            // Confirmation message when changing to Self Managed
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Changing to <strong>Self Managed</strong> will remove the Zuvy Assignee information. 
                This action cannot be undone. Do you want to proceed?
              </p>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={handleCancelManagementTypeChange}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmManagementTypeChange}>
              {pendingManagementTypeChange?.newType === 'Zuvy Managed' ? 'Add & Update' : 'Confirm & Remove'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default OrganisationsPage;
