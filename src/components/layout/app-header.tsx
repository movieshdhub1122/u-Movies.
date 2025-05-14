"use client";
import * as React from 'react';
import { Search, UserCircle, Sun, Moon, Mic } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { CineLogo } from '@/components/cine-logo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export function AppHeader() {
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();

  React.useEffect(() => setMounted(true), []);

  const handleMicClick = () => {
    console.log("Mic button clicked - voice search to be implemented");
    // TODO: Implement actual voice search functionality
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const currentTheme = mounted ? theme : undefined;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 sm:gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      {/* Left Section: Sidebar Trigger on mobile, Logo on desktop */}
      <div className="flex items-center">
        {isMobile ? (
          <SidebarTrigger />
        ) : (
          <CineLogo size="md" />
        )}
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 flex justify-center px-0 sm:px-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm sm:max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos..."
            className="pl-8 pr-10 w-full rounded-lg bg-muted focus:bg-background h-10 text-sm"
            aria-label="Search videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center"
            onClick={handleMicClick}
            aria-label="Search by voice"
            type="button" // To prevent form submission by mic button
          >
            <Mic className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Right Section: Theme Toggle and User Profile */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Theme Toggle Button */}
        {mounted && currentTheme ? (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                aria-label={currentTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
            >
                {currentTheme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
        ) : (
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
        )}

        {/* User Profile Button */}
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 sm:h-10 sm:w-10">
          <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">User Profile</span>
        </Button>
      </div>
    </header>
  );
}
