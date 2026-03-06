'use client'

import { ReactNode, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Layers, Database, Settings, LogOut, Building2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import OrganizationHeader from './OrganizationHeader';

interface MainLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const MainLayout = ({ children, hideNavigation = false }: MainLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useUser();
  const [isAuditLogPage, setIsAuditLogPage] = useState(false);
  const [showBellWiggle, setShowBellWiggle] = useState(false);
  const hasPlayedBellWiggle = useRef(false);
  const unreadAuditCount = 3; // Mock unread count for demo UI behavior
  const hasUnreadNotifications = unreadAuditCount > 0;

  useEffect(() => {
    setIsAuditLogPage(pathname === '/audit-log' || pathname === '/audit-log/');
  }, [pathname]);

  useEffect(() => {
    if (!hasUnreadNotifications || hasPlayedBellWiggle.current) return;

    hasPlayedBellWiggle.current = true;
    setShowBellWiggle(true);

    const timeout = setTimeout(() => {
      setShowBellWiggle(false);
    }, 1200);

    return () => clearTimeout(timeout);
  }, [hasUnreadNotifications]);

  // Don't show layout on role selector page
  const isRoleSelector = pathname === '/role-selector' || pathname?.startsWith('/role-selector');
  if (isRoleSelector) {
    console.log('🚀 MainLayout: Detected role-selector page, returning children only. Pathname:', pathname);
    return <>{children}</>;
  }

  // Don't show layout on organisation detail pages
  const isOrgDetail = /^\/settings\/organisations\/[^/]+\/?$/.test(pathname);
  if (isOrgDetail) {
    console.log('🚀 MainLayout: Detected organisation detail page, returning children only. Pathname:', pathname);
    return <>{children}</>;
  }

  console.log('📋 MainLayout: Rendering full layout. Pathname:', pathname);

  const allNavigationItems = [
    {
      name: 'Organisations',
      href: '/settings/organisations',
      icon: Building2,
      active: pathname.startsWith('/settings/organisations'),
      roles: ['SuperAdmin']
    },
    {
      name: 'Course Studio',
      href: '/courses',
      icon: Layers,
      active: pathname.startsWith('/courses'),
      roles: ['Admin', 'Instructor']
    },
    {
      name: 'Content Bank',
      href: '/content-bank',
      icon: Database,
      active: pathname.startsWith('/content-bank'),
      roles: ['Admin', 'Instructor', 'SuperAdmin']
    },
    {
      name: 'Roles and Permissions',
      href: '/settings',
      icon: Settings,
      active: pathname.startsWith('/settings'),
      roles: ['Admin']
    }
  ];

  // Filter navigation based on current user role
  const navigationItems = currentUser
    ? allNavigationItems.filter(item => item.roles.includes(currentUser.role))
    : allNavigationItems;

  const handleLogout = () => {
    logout();
    router.push('/role-selector');
  };

  // Check if user is Admin to show organization header
  const isAdmin = currentUser?.role === 'Admin';
  const isSuperAdmin = currentUser?.role === 'SuperAdmin';
  const isOrganisationsPage = pathname === '/settings/organisations' || pathname === '/settings/organisations/';

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation - Hidden on role-selector page */}
      {pathname !== '/role-selector' && (
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between w-full px-6">
          <div className="flex items-center gap-8">
            {/* Show Organization Header for Admins, otherwise show Zuvy Logo */}
            {isAdmin ? (
              <OrganizationHeader />
            ) : isSuperAdmin && isOrganisationsPage ? (
              <div className="flex items-center">
                <Image
                  src="/zuvy-logo-horizontal.png"
                  alt="Zuvy"
                  width={104}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            ) : (
              <Link href="/" className="flex items-center">
                <Image
                  src="/zuvy-logo-horizontal.png"
                  alt="Zuvy"
                  width={104}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            )}
            
            {pathname !== '/role-selector' && (
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative overflow-hidden flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-[calc(100%-1.25rem)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:transition-transform after:duration-200",
                      item.active
                        ? "bg-primary text-primary-foreground shadow-soft after:hidden"
                        : "text-muted-foreground hover:text-primary hover:bg-primary-light after:bg-primary hover:after:scale-x-100"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            )}
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            {currentUser && (
              <Link
                href="/audit-log"
                className={cn(
                  "relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-[calc(100%-1.25rem)] after:-translate-x-1/2 after:origin-center after:scale-x-0 after:transition-transform after:duration-200",
                  isAuditLogPage
                    ? "bg-primary text-primary-foreground after:hidden"
                    : "text-muted-foreground hover:text-primary hover:bg-primary-light after:bg-primary hover:after:scale-x-100"
                )}
                title="Audit Log"
                aria-label="Audit Log"
              >
                <Bell className={cn("h-4 w-4", showBellWiggle && "animate-bell-wiggle")} />
                <span>Audit Log</span>
              </Link>
            )}
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
              className="text-red-500 hover:text-white hover:bg-red-500 transition-transform duration-200 hover:scale-[1.08] hover:translate-y-0 hover:shadow-none"
              title="Logout"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
