import Image from 'next/image';
import Link from 'next/link';
import type { Video } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/watch/${video.id}`} passHref>
      <Card className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <Image
            src={video.thumbnailUrl}
            alt={video.title}
            width={400}
            height={225}
            className="aspect-video object-cover w-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="video thumbnail"
          />
           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-1 group-hover:text-accent transition-colors">
            {video.title}
          </CardTitle>
          {video.channelName && (
            <p className="text-sm text-muted-foreground">{video.channelName}</p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{video.views}</span>
          </div>
          {video.uploadDate && (
             <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{video.uploadDate}</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
