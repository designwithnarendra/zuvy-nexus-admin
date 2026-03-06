'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, Database, Settings, LogOut, Check, ArrowLeft, Users, Shield } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { Organisation } from '@/types/index';
import { mockOrganisations } from '@/types/mock-rbac-data';
import AllCoursesPage from '../courses/AllCoursesPage';
import QuestionBankPage from '../content-bank/QuestionBankPage';
import OrganisationManageRoles from '@/components/settings/OrganisationManageRoles';
import UsersPage from '@/components/settings/UsersPage';

interface OrganisationDetailPageProps {
  orgId: string;
}

const OrganisationDetailPage = ({ orgId }: OrganisationDetailPageProps) => {
  const router = useRouter();
  const { logout, currentUser } = useUser();
  const [activeTab, setActiveTab] = useState('courses');
  const [activeRolesSubTab, setActiveRolesSubTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEntering, setIsEntering] = useState(true);
  const [isSwitchingOrganisation, setIsSwitchingOrganisation] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsEntering(false));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Find the organisation
  const organisation = mockOrganisations.find(org => org.id === orgId);

  // Filter organisations based on search
  const filteredOrganisations = mockOrganisations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!organisation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Organisation not found</h1>
          <Button onClick={() => router.push('/settings/organisations')}>
            Back to Organisations
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/role-selector');
  };

  const handleOrganisationSwitch = (nextOrgId: string) => {
    if (!organisation) return;
    if (nextOrgId === organisation.id || isSwitchingOrganisation) return;
    setIsSwitchingOrganisation(true);
    setTimeout(() => {
      router.push(`/settings/organisations/${nextOrgId}`);
    }, 120);
  };

  const handleBackToAllOrgs = () => {
    if (isSwitchingOrganisation) return;
    setIsSwitchingOrganisation(true);
    setTimeout(() => {
      router.push('/settings/organisations');
    }, 120);
  };

  const tabsData = [
    {
      id: 'courses',
      label: 'Course Studio',
      icon: Layers,
      component: AllCoursesPage
    },
    {
      id: 'content-bank',
      label: 'Content Bank',
      icon: Database,
      component: QuestionBankPage
    },
    {
      id: 'roles',
      label: 'Roles and Permissions',
      icon: Settings,
      component: OrganisationManageRoles
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between w-full px-6">
          <div className="flex items-center gap-8">
            {/* Organization Header */}
            <div className="flex items-center gap-4">
              {/* Organization Logo/Avatar + Name with Dropdown */}
              <Select value={organisation.id} onValueChange={handleOrganisationSwitch}>
                <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0 bg-transparent hover:bg-slate-50 rounded-lg px-3 py-2 w-80">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className={`bg-orange-500 w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                      {organisation.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium truncate">{organisation.name}</span>
                  </div>
                </SelectTrigger>
                <SelectContent align="start" className="w-80">
                  {/* Search field */}
                  <div className="px-3 py-2 border-b">
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 text-sm w-full"
                    />
                  </div>

                  {/* Header */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Switch Organization
                  </div>

                  {/* Organization items */}
                  {filteredOrganisations.map((org) => (
                    <SelectItem key={org.id} value={org.id} className="cursor-pointer">
                      <div className="flex items-center gap-2">
                        <div className={`bg-orange-500 w-6 h-6 rounded flex items-center justify-center text-white font-semibold text-xs`}>
                          {org.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium">{org.name}</span>
                        {org.id === organisation.id && (
                          <Check className="w-4 h-4 ml-2 text-green-600" />
                        )}
                      </div>
                    </SelectItem>
                  ))}

                  {/* Back to all orgs option */}
                  <div className="border-t mt-2">
                    <button
                      onClick={handleBackToAllOrgs}
                      className={cn(
                        "group w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 rounded transition-colors",
                        isSwitchingOrganisation && "pointer-events-none opacity-60"
                      )}
                    >
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-[3px]" />
                      <span>Back to all orgs</span>
                    </button>
                  </div>
                </SelectContent>
              </Select>

              {/* Divider */}
              <div className="w-px h-6 bg-border flex-shrink-0" />

              {/* Zuvy Logo */}
              <Link href="/settings/organisations" className="flex items-center flex-shrink-0 hover:opacity-80 transition-opacity">
                <Image
                  src="/zuvy-logo-horizontal.png"
                  alt="Zuvy"
                  width={80}
                  height={32}
                  className="h-6 w-auto"
                />
              </Link>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center space-x-1">
              {tabsData.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "relative overflow-hidden flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-[calc(100%-1.25rem)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:transition-transform after:duration-200",
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-soft after:hidden"
                        : "text-muted-foreground hover:text-primary hover:bg-primary-light after:bg-primary hover:after:scale-x-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: User and Logout */}
          <div className="ml-auto flex items-center gap-3">
            {currentUser && (
              <Badge 
                className={cn(
                  "px-3 py-1 text-sm font-medium border transition-colors duration-200",
                  currentUser.role === 'SuperAdmin' 
                    ? "bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    : currentUser.role === 'Admin'
                    ? "bg-info/10 text-info border-info/20 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                )}
              >
                {currentUser.role === 'SuperAdmin' ? 'Super Admin' : currentUser.role}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-white hover:bg-red-500"
              title="Logout"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 pt-16 transition-all duration-200",
          (isEntering || isSwitchingOrganisation) ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        <div className="p-6">
          {activeTab === 'courses' && (
            <div className="-mx-6 -mt-14">
              <AllCoursesPage />
            </div>
          )}
          {activeTab === 'content-bank' && (
            <div className="-mx-6 -mt-14">
              <QuestionBankPage />
            </div>
          )}
          {activeTab === 'roles' && (
            <div className="w-full">
              {/* Roles and Permissions Sub-tabs */}
              <div className="mb-8">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => setActiveRolesSubTab('users')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      activeRolesSubTab === 'users'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </button>
                  <button
                    onClick={() => setActiveRolesSubTab('manage-roles')}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      activeRolesSubTab === 'manage-roles'
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Manage Role Functions</span>
                  </button>
                </nav>
              </div>

              {/* Sub-tab content */}
              {activeRolesSubTab === 'users' && <UsersPage hideInviteSection={true} />}
              {activeRolesSubTab === 'manage-roles' && <OrganisationManageRoles />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrganisationDetailPage;
