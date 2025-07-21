import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Layers, Database, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      active: location.pathname === '/'
    },
    {
      name: 'Course Studio',
      href: '/courses',
      icon: Layers,
      active: location.pathname.startsWith('/courses')
    },
    {
      name: 'Content Bank',
      href: '/content-bank',
      icon: Database,
      active: location.pathname.startsWith('/content-bank')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between w-full px-6">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">Z</span>
              </div>
              <span className="font-heading font-semibold text-xl">Zuvy Admin</span>
            </Link>
            
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      item.active
                        ? "bg-primary text-primary-foreground shadow-2dp"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-red-500 hover:text-red-600"
            title="Logout"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
