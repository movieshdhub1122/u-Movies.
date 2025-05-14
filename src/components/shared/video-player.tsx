interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
}

export function VideoPlayer({ src, title, className }: VideoPlayerProps) {
  return (
    <div className={`aspect-video w-full bg-black rounded-lg shadow-lg overflow-hidden ${className || ''}`} data-ai-hint="video player">
      <video
        key={src} // Added key prop
        controls
        className="w-full h-full object-contain"
        title={title}
        // For better accessibility and SEO, consider adding a poster attribute with video.thumbnailUrl
        // poster={video.thumbnailUrl} 
      >
        <source src={src} type="video/mp4" />
        {/* You can add more source tags for different video formats (e.g., WebM, Ogg) for broader browser compatibility */}
        {/* <source src="movie.webm" type="video/webm" /> */}
        {/* <source src="movie.ogg" type="video/ogg" /> */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
