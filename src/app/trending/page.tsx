import { mockVideos } from '@/lib/data';
import { VideoCard } from '@/components/ui/video-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TrendingPage() {
  // For now, show some of the mock videos as "trending"
  const trendingVideos = mockVideos.slice(0, 6).sort(() => 0.5 - Math.random()); // Randomize for effect

  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground text-center">Trending Videos</h1>
      
      {trendingVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
            <p className="text-muted-foreground text-lg mb-4">No trending videos at the moment. Check back later!</p>
            <Link href="/">
                <Button>Explore Homepage</Button>
            </Link>
        </div>
      )}
    </div>
  );
}

