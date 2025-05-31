import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronDown, CalendarDays, Bell, Menu as MenuIcon, Plus, Settings, LogOut, UserCircle, Briefcase } from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className={cn(
      "flex items-center justify-between h-16 px-6 bg-card text-card-foreground",
      "fixed top-0 left-0 lg:left-64 right-0 z-30", // Adjusted left for lg screens
      "border-b border-border shadow-sm"
    )}>
      <div className="flex items-center">
        {/* Sidebar toggle for smaller screens - visible on < lg */}
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2 lg:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-xl md:text-2xl font-semibold text-prd-primary-text">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-prd-secondary-text text-xs sm:text-sm">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Last 6 months
              <ChevronDown className="ml-1.5 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem>Last 12 months</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Create
              <ChevronDown className="ml-1.5 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Briefcase className="mr-2 h-4 w-4" />New Lead</DropdownMenuItem>
            <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" />New Customer</DropdownMenuItem>
            <DropdownMenuItem><FileText className="mr-2 h-4 w-4" />New Proposal</DropdownMenuItem>
            <DropdownMenuItem><Receipt className="mr-2 h-4 w-4" />New Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="text-prd-secondary-text">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src="https://avatar.vercel.sh/jane-doe" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
            <DropdownMenuItem><Briefcase className="mr-2 h-4 w-4" />Billing</DropdownMenuItem>
            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="mr-2 h-4 w-4" />Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
