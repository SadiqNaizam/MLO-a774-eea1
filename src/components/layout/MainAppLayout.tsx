import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar'; // Relative import
import Header from './Header';   // Relative import

interface MainAppLayoutProps {
  children: React.ReactNode;
  title?: string; // To be passed to the Header component
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title, className }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <Sidebar isOpen={isMobileSidebarOpen} />
      <Header
        title={title}
        onToggleSidebar={toggleMobileSidebar}
      />
      <main
        className={cn(
          "min-h-screen", // Ensures main content area can fill screen height
          "pt-16",        // Padding top for fixed header (h-16)
          "lg:pl-64",     // Padding left for fixed sidebar (w-64) on large screens
          "transition-[padding-left] duration-300 ease-in-out" // Smooth transition for padding-left
        )}
      >
        {/* 
          Layout Requirements -> mainContent -> layout: "p-8 mt-16"
          'mt-16' is handled by 'pt-16' on the main tag.
          'p-8' is applied to this inner div.
          Layout Requirements -> overall -> sizing -> mainContent: "overflow-y-auto"
          This is achieved by ensuring the body or this main tag allows scrolling if content overflows.
          By default, block elements will expand and cause page scroll if taller than viewport.
          If specific inner scrolling is needed, add `h-[calc(100vh-4rem)] overflow-y-auto` to this div.
          For now, standard page scroll is assumed.
        */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
