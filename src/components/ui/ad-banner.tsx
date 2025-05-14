import Image from 'next/image';
import Link from 'next/link';
import type { AdPlacement } from '@/types';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  ad: AdPlacement;
}

export function AdBanner({ ad }: AdBannerProps) {
  let width: number;
  let height: number;
  let placeholderHeightClass: string;

  if (ad.type === 'banner-top') {
    width = 1200;
    height = 320; // Increased height
    placeholderHeightClass = 'h-[320px]'; // Updated placeholder class
  } else if (ad.type === 'banner-inline') {
    width = 800;
    height = 200; // Increased height
    placeholderHeightClass = 'h-[200px]'; // Updated placeholder class
  } else {
    // Default fallback for other ad types if any, or if type is unrecognized
    width = 1200; 
    height = 200; // Adjusted default height
    placeholderHeightClass = 'h-[200px]'; 
  }

  return (
    <div className="my-0 rounded-lg overflow-hidden shadow-md" data-ai-hint="advertisement banner">
      <Link href={ad.linkUrl || '#'} target="_blank" rel="noopener noreferrer">
        {ad.imageUrl ? (
          <Image
            src={ad.imageUrl}
            alt={ad.description || 'Advertisement'}
            width={width}
            height={height}
            className="w-full h-auto object-cover bg-muted" 
            data-ai-hint={ad.type === 'banner-top' ? "large advertisement banner" : "medium advertisement banner"}
          />
        ) : (
          <div className={cn(
            "w-full bg-muted flex items-center justify-center text-muted-foreground",
            placeholderHeightClass
          )}>
            {ad.description || 'Advertisement Placeholder'}
          </div>
        )}
      </Link>
    </div>
  );
}
