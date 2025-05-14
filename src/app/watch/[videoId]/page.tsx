import { getVideoById, getCommentsForVideo, mockRelatedVideos } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, Bookmark, CalendarDays, Eye } from 'lucide-react';
import { VideoCard } from '@/components/ui/video-card';
import { CommentSummarizer } from '@/components/features/comment-summarizer';
import { VideoPlayer } from '@/components/shared/video-player';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface WatchPageProps {
  params: { videoId: string };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const video = getVideoById(params.videoId);
  
  if (!video) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Link href="/">
          <Button variant="link" className="mt-4">Go back to Home</Button>
        </Link>
      </div>
    );
  }
  
  const comments = getCommentsForVideo(params.videoId);
  const relatedVideos = mockRelatedVideos; // Using mock for now

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto">
      {/* Main content: Video player and details */}
      <div className="flex-grow lg:w-2/3">
        {video.videoFileUrl ? (
          <VideoPlayer src={video.videoFileUrl} title={video.title} />
        ) : (
          <div 
            className="aspect-video w-full bg-card border border-dashed border-muted-foreground/50 rounded-lg flex flex-col items-center justify-center text-muted-foreground shadow-inner"
            data-ai-hint="video player error"
          >
            <p className="text-lg font-semibold">Video not available</p>
            <p className="text-sm">(Video source URL is missing)</p>
          </div>
        )}

        <div className="py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{video.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Eye className="mr-1.5 h-4 w-4" />
              <span>{video.views}</span>
            </div>
            {video.uploadDate && (
              <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                <span>Uploaded: {video.uploadDate}</span>
              </div>
            )}
             {video.category && (
              <Badge variant="secondary">{video.category}</Badge>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-3 border-y">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={video.channelAvatarUrl || `https://picsum.photos/seed/${video.channelName}/40/40`} alt={video.channelName} data-ai-hint="profile avatar"/>
                <AvatarFallback>{video.channelName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{video.channelName || 'uMovies Channel'}</p>
                <p className="text-xs text-muted-foreground">1.2M Subscribers</p> {/* Mock data */}
              </div>
              <Button variant="outline" size="sm">Subscribe</Button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm"><ThumbsUp className="mr-1.5 h-4 w-4" /> 15K</Button> {/* Mock data */}
              <Button variant="outline" size="sm"><ThumbsDown className="mr-1.5 h-4 w-4" /> 500</Button> {/* Mock data */}
              <Button variant="outline" size="sm"><Share2 className="mr-1.5 h-4 w-4" /> Share</Button>
              <Button variant="outline" size="sm"><Bookmark className="mr-1.5 h-4 w-4" /> Save</Button>
            </div>
          </div>

          {video.description && (
            <Card className="mt-4 bg-secondary/50">
              <CardHeader>
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground whitespace-pre-line">{video.description}</p>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 p-4 border rounded-lg bg-card shadow">
             <h3 className="text-md font-semibold text-foreground">Sponsor Mention</h3>
             <p className="text-sm text-muted-foreground mt-1">This video is proudly sponsored by <a href="#" className="text-accent hover:underline">AwesomeBrand</a>. Check them out!</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" /> Comments ({comments.length})
          </h2>
          <CommentSummarizer comments={comments} videoId={params.videoId} />
          <div className="space-y-6 mt-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3 p-3 border rounded-lg bg-card shadow-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.avatarUrl || `https://picsum.photos/seed/${comment.user}/40/40`} alt={comment.user} data-ai-hint="user avatar"/>
                  <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-foreground">{comment.user}</p>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                  <p className="text-sm text-foreground mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="lg:w-1/3 lg:max-w-sm mt-8 lg:mt-0">
        <h2 className="text-xl font-semibold text-foreground mb-4">Related Videos</h2>
        <div className="space-y-4">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </div>
      </div>
    </div>
  );
}