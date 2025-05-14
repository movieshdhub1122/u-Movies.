import { PlayCircle } from 'lucide-react';

interface VideoPlayerPlaceholderProps {
  title: string;
}

export function VideoPlayerPlaceholder({ title }: VideoPlayerPlaceholderProps) {
  return (
    <div 
      className="aspect-video w-full bg-card border border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center text-muted-foreground shadow-inner"
      data-ai-hint="video player"
    >
      <PlayCircle className="h-16 w-16 mb-4 text-accent" />
      <p className="text-lg font-semibold">Video Player: {title}</p>
      <p className="text-sm">(Fast-loading player placeholder)</p>
    </div>
  );
}
