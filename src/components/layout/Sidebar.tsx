import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Icon as LucideIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  isActive?: boolean; // Added for clarity, can be derived
}

const mainNavItems: Omit<NavItem, 'isActive'>[] = [
  { label: 'Dashboard', icon: LayoutGrid, href: '#' },
  { label: 'Leads', icon: Users, href: '#' },
  { label: 'Customers', icon: User, href: '#' },
  { label: 'Proposals', icon: FileText, href: '#' },
  { label: 'Invoices', icon: Receipt, href: '#' },
  { label: 'Items', icon: ShoppingCart, href: '#' },
  { label: 'Mail', icon: Mail, href: '#' },
  { label: 'Shoebox', icon: Archive, href: '#' },
  { label: 'Calendar', icon: CalendarDays, href: '#' },
];

const secondaryNavItems: Omit<NavItem, 'isActive'>[] = [
  { label: 'Help', icon: HelpCircle, href: '#' },
  { label: 'Settings', icon: Settings, href: '#' },
];

interface SidebarProps {
  isOpen: boolean;
  className?: string;
  // In a real app, activePath might come from routing context or props
  // For this example, it's internal state
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, className }) => {
  const [activePath, setActivePath] = React.useState<string>('Dashboard');

  return (
    <aside
      className={cn(
        "flex flex-col h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground w-64 p-4 border-r border-border z-40",
        "transition-transform duration-300 ease-in-out",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex items-center space-x-3 p-2 mb-4">
        <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold">
          BO
        </div>
        {/* Optional: Company Name if needed */}
        {/* <span className="font-semibold text-lg text-prd-primary-text">Platform</span> */}
      </div>

      <div className="flex-grow flex flex-col justify-between overflow-y-auto">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActivePath(item.label);
                // In a real app with mobile overlay sidebar, you might want to close it on nav:
                // if (isOpen && window.innerWidth < 1024) { /* call a close function via prop */ }
              }}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium",
                "transition-colors duration-150 ease-in-out",
                item.label === activePath
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "hover:bg-primary/10 hover:text-primary text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        
        <nav>
          <Separator className="bg-border my-3" />
          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault(); 
                  // Potentially set active path or navigate
                }}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium",
                  "hover:bg-primary/10 hover:text-primary text-sidebar-foreground",
                  "transition-colors duration-150 ease-in-out"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
