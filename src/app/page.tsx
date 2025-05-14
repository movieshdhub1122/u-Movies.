import { VideoCard } from '@/components/ui/video-card';
import { AdBanner } from '@/components/ui/ad-banner';
import { mockFeaturedVideos, mockVideos, mockCategories, mockAdPlacements } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function HomePage() {
  const topAd = mockAdPlacements.find(ad => ad.type === 'banner-top');
  const inlineAd = mockAdPlacements.find(ad => ad.type === 'banner-inline');

  return (
    <div className="container mx-auto px-4 pt-2 pb-8"> {/* Reduced pt-4 to pt-2 */}
      {topAd && <div className="mb-4"><AdBanner ad={topAd} /></div>} {/* Changed my-4 to mb-4 */}

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Featured Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFeaturedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {mockCategories.slice(0,3).map((category, index) => (
        <section key={category.id} className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
            <Button variant="link" asChild>
              <Link href={`/categories/${category.id}`}>View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVideos
              .filter((video) => video.category === category.name)
              .slice(0, 4)
              .map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
          </div>
          {index === 0 && inlineAd && <div className="mt-8"><AdBanner ad={inlineAd} /></div>}
        </section>
      ))}
       <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-foreground">All Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.slice(0,8).map((video) => ( // Show a limited number of all videos
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
}
