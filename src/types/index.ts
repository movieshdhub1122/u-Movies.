export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoFileUrl?: string; // Optional for now, but crucial for actual playback
  views: string; // e.g., "1.2M views" or "10K views"
  duration: string; // e.g., "12:34"
  uploadDate?: string; // e.g., "2 weeks ago" or "Oct 24, 2023"
  description?: string;
  channelName?: string;
  channelAvatarUrl?: string;
  category?: string;
  comments?: VideoComment[];
  sponsorTag?: string; // Added for admin video management
}

export interface Category {
  id: string;
  name: string;
  thumbnailUrl?: string; // Optional: for a representative image for the category
}

export interface AdPlacement {
  id: string;
  type: 'banner-top' | 'banner-inline' | 'video-sponsor';
  imageUrl?: string;
  linkUrl?: string;
  description?: string;
}

export interface VideoComment {
  id: string;
  user: string;
  avatarUrl?: string;
  text: string;
  timestamp?: string; // e.g., "2 hours ago"
}