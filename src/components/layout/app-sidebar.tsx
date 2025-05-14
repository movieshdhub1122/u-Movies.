// src/components/layout/app-sidebar.tsx
'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { CineLogo } from '@/components/cine-logo';
import { AppSidebarNav } from './app-sidebar-nav';
import { Button } from '@/components/ui/button';
import { Menu, PanelLeftClose } from 'lucide-react'; 
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader
        className={cn(
          "h-16 flex items-center", 
          state === 'collapsed' ? "justify-center p-2" : "justify-end p-4" // Changed to justify-end when expanded
        )}
      >
        {state === 'collapsed' ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-10 w-10" 
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </Button>
        ) : (
          // CineLogo is removed when sidebar is expanded
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className="h-10 w-10"
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        )}
      </SidebarHeader>
      <SidebarContent className="flex-1 p-0">
        <AppSidebarNav />
      </SidebarContent>
      <SidebarFooter className="p-2">
        {/* Future: User profile quick actions or settings */}
      </SidebarFooter>
    </Sidebar>
  );
}

