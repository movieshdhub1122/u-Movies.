'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { VideoCard } from '@/components/ui/video-card';
import { mockVideos } from '@/lib/data';
import type { Video } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SearchX, Loader2 } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure this effect runs only on the client after hydration
    setIsLoading(true);
    if (query) {
      const results = mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(query.toLowerCase()) ||
          video.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(results);
    } else {
      setFilteredVideos([]);
    }
    setIsLoading(false);
  }, [query]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-4 pb-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">Loading search results...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      {query ? (
        <>
          <h1 className="text-3xl font-bold mb-8 text-foreground">
            Search Results for: <span className="text-accent">{query}</span>
          </h1>
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <SearchX className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-foreground mb-2">No videos found for "{query}".</p>
              <p className="text-muted-foreground mb-6">Try a different search term or explore our categories.</p>
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Search uMovies</h1>
          <p className="text-lg text-muted-foreground">Please enter a search term in the bar above to find videos.</p>
        </div>
      )}
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 pt-4 pb-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">Loading search...</p>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
