
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flame, LayoutGrid, Megaphone, LayoutDashboard } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/trending', label: 'Trending', icon: Flame },
  { href: '/categories', label: 'Categories', icon: LayoutGrid },
  { href: '/advertise', label: 'Advertise with Us', icon: Megaphone },
  // Note: The Admin Dashboard link is currently public.
  // Proper authentication and authorization should be implemented to restrict access.
  { href: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard },
];

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
              tooltip={item.label}
              className={cn(
                (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <a>
                <item.icon />
                <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
