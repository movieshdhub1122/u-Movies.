import { getVideosByCategory, mockCategories } from '@/lib/data';
import { VideoCard } from '@/components/ui/video-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CategoryPageProps {
  params: { categoryId: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = mockCategories.find(cat => cat.id === params.categoryId);
  const videos = getVideosByCategory(params.categoryId);

  if (!category) {
    return (
      <div className="container mx-auto px-4 pt-4 pb-8 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
         <Link href="/categories">
          <Button variant="link" className="mt-4">Browse all categories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-8">
      <h1 className="text-4xl font-bold mb-8 text-foreground">{category.name}</h1>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No videos found in this category yet.</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    categoryId: category.id,
  }));
}

