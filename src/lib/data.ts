import type { Video, Category, AdPlacement, VideoComment } from '@/types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Epic Sci-Fi Adventure Trailer',
    thumbnailUrl: 'https://picsum.photos/seed/movie1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    views: '2.5M views',
    duration: '2:35',
    uploadDate: '3 days ago',
    channelName: 'MovieMagic',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar1/40/40',
    description: 'A breathtaking journey to a galaxy far, far away. Experience the ultimate battle between good and evil in this stunning sci-fi epic. Coming this summer!',
    category: 'Sci-Fi',
    sponsorTag: 'Galaxy Studios',
    comments: [
      { id: 'c1', user: 'SciFiFan101', text: 'Looks amazing! Can\'t wait!', timestamp: '1 hour ago' },
      { id: 'c2', user: 'CinemaGeek', text: 'The visuals are stunning.', timestamp: '2 hours ago' },
      { id: 'c3', user: 'RandomUser', text: 'Hope the story is good.', timestamp: '3 hours ago' },
    ],
  },
  {
    id: '2',
    title: 'Heartwarming Drama Short Film',
    thumbnailUrl: 'https://picsum.photos/seed/drama1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    views: '800K views',
    duration: '15:42',
    uploadDate: '1 week ago',
    channelName: 'IndieFlix',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar2/40/40',
    description: 'A touching story about friendship and perseverance. This short film will warm your heart and leave you inspired. Starring award-winning actors.',
    category: 'Drama',
    comments: [
      { id: 'c4', user: 'FilmBuff', text: 'So touching!', timestamp: '5 hours ago' },
      { id: 'c5', user: 'ShortFilmFan', text: 'Beautifully made.', timestamp: '6 hours ago' },
    ],
  },
  {
    id: '3',
    title: 'Thrilling Action Scene Compilation',
    thumbnailUrl: 'https://picsum.photos/seed/action1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', // Using a different sample video
    views: '1.2M views',
    duration: '8:19',
    uploadDate: '2 days ago',
    channelName: 'ActionPacked',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar3/40/40',
    description: 'Get your adrenaline pumping with this compilation of the most thrilling action scenes from recent blockbusters. Explosions, car chases, and more!',
    category: 'Action',
    sponsorTag: 'Adrenaline Junkies Inc.',
  },
  {
    id: '4',
    title: 'Classic Pakistani Film "Heer Ranjha"',
    thumbnailUrl: 'https://picsum.photos/seed/pakistani1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    views: '500K views',
    duration: '2:30:00',
    uploadDate: '1 month ago',
    channelName: 'LollywoodGold',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar4/40/40',
    description: 'A timeless classic of Pakistani cinema. Follow the legendary love story of Heer and Ranjha in this beautifully restored version.',
    category: 'Pakistani Films',
  },
  {
    id: '5',
    title: 'New Comedy Special Highlights',
    thumbnailUrl: 'https://picsum.photos/seed/comedy1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    views: '650K views',
    duration: '5:50',
    uploadDate: '5 days ago',
    channelName: 'LaughFactory',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar5/40/40',
    description: 'The funniest moments from the latest stand-up comedy special. Get ready to laugh out loud!',
    category: 'Comedy',
  },
  {
    id: '6',
    title: 'Mystery Unveiled: A Detective Story',
    thumbnailUrl: 'https://picsum.photos/seed/thriller1/400/225',
    videoFileUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    views: '920K views',
    duration: '22:05',
    uploadDate: '4 days ago',
    channelName: 'CrimeTime',
    channelAvatarUrl: 'https://picsum.photos/seed/channelavatar6/40/40',
    description: 'A gripping detective story full of twists and turns. Can you solve the mystery before the detective does?',
    category: 'Thriller',
  },
];

export const mockCategories: Category[] = [
  { id: 'drama', name: 'Drama', thumbnailUrl: 'https://picsum.photos/seed/catdrama/300/150' },
  { id: 'thriller', name: 'Thriller', thumbnailUrl: 'https://picsum.photos/seed/catthriller/300/150' },
  { id: 'pakistani-films', name: 'Pakistani Films', thumbnailUrl: 'https://picsum.photos/seed/catpakistani/300/150' },
  { id: 'action', name: 'Action', thumbnailUrl: 'https://picsum.photos/seed/cataction/300/150' },
  { id: 'comedy', name: 'Comedy', thumbnailUrl: 'https://picsum.photos/seed/catcomedy/300/150' },
  { id: 'sci-fi', name: 'Sci-Fi', thumbnailUrl: 'https://picsum.photos/seed/catscifi/300/150' },
  { id: 'uncategorized', name: 'Uncategorized', thumbnailUrl: 'https://picsum.photos/seed/catuncat/300/150' },
];

export const mockFeaturedVideos: Video[] = mockVideos.slice(0, 2);

export const mockAdPlacements: AdPlacement[] = [
  {
    id: 'ad-top-banner',
    type: 'banner-top',
    imageUrl: 'https://picsum.photos/seed/adbanner1/1200/320',
    linkUrl: '#',
    description: 'Top Banner Ad - Prime Placement',
  },
  {
    id: 'ad-inline-banner',
    type: 'banner-inline',
    imageUrl: 'https://picsum.photos/seed/adbanner2/800/200',
    linkUrl: '#',
    description: 'Inline Banner Ad - Between Video Rows',
  },
];

export const getVideosByCategory = (categoryId: string): Video[] => {
  const category = mockCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  return mockVideos.filter(video => video.category === category.name);
};

export const getVideoById = (videoId: string): Video | undefined => {
  return mockVideos.find(video => video.id === videoId);
};

export const mockRelatedVideos: Video[] = mockVideos.slice(2, 5).map(v => ({...v, id: v.id + '_related'}));

export const mockComments: VideoComment[] = [
    { id: 'comment1', user: 'User123', text: 'Great video, really enjoyed it!', timestamp: '1 day ago', avatarUrl: 'https://picsum.photos/seed/avatar1/40/40' },
    { id: 'comment2', user: 'MovieBuff22', text: 'This is one of the best films I have seen this year. The acting was superb and the storyline was captivating.', timestamp: '2 days ago', avatarUrl: 'https://picsum.photos/seed/avatar2/40/40' },
    { id: 'comment3', user: 'CinePhile', text: 'I have mixed feelings about this one. While the cinematography was excellent, the plot felt a bit predictable. Still worth a watch for the visuals alone.', timestamp: '3 days ago', avatarUrl: 'https://picsum.photos/seed/avatar3/40/40' },
    { id: 'comment4', user: 'WatcherXYZ', text: 'Could someone explain the ending? I am a bit confused.', timestamp: '4 days ago', avatarUrl: 'https://picsum.photos/seed/avatar4/40/40' },
    { id: 'comment5', user: 'FanGirl007', text: 'Absolutely loved it! Watched it twice already. The lead actor is my favorite!', timestamp: '5 days ago', avatarUrl: 'https://picsum.photos/seed/avatar5/40/40' },
];

export const getCommentsForVideo = (videoId: string): VideoComment[] => {
  const video = getVideoById(videoId);
  return video?.comments || mockComments.slice(0, Math.floor(Math.random() * mockComments.length) + 1);
};

export type NewVideoData = {
  title: string;
  description?: string;
  categoryId: string;
  thumbnailUrl?: string;
  videoFileUrl: string;
  sponsorTag?: string;
  channelName?: string;
  duration: string; // e.g. "10:30"
  channelAvatarUrl?: string;
};

export function addMockVideo(newVideoData: NewVideoData): Video {
  const category = mockCategories.find(c => c.id === newVideoData.categoryId);
  const newVideo: Video = {
    id: `vid-${Date.now().toString()}-${Math.random().toString(36).substring(7)}`,
    title: newVideoData.title,
    thumbnailUrl: newVideoData.thumbnailUrl || `https://picsum.photos/seed/newvideo${mockVideos.length + 1}/400/225`,
    videoFileUrl: newVideoData.videoFileUrl,
    views: '0 views',
    duration: newVideoData.duration || '0:00',
    uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
    channelName: newVideoData.channelName || 'uMovies Admin',
    channelAvatarUrl: newVideoData.channelAvatarUrl || `https://picsum.photos/seed/channelavatar${mockVideos.length + 1}/40/40`,
    description: newVideoData.description,
    category: category ? category.name : 'Uncategorized',
    sponsorTag: newVideoData.sponsorTag,
    comments: [],
  };
  mockVideos.unshift(newVideo); // Add to the beginning of the array to show newest first
  return newVideo;
}

export function deleteMockVideo(videoId: string): boolean {
  const videoIndex = mockVideos.findIndex(v => v.id === videoId);
  if (videoIndex > -1) {
    mockVideos.splice(videoIndex, 1);
    return true;
  }
  return false;
}

// Placeholder for edit function
export function editMockVideo(videoId: string, updatedData: Partial<Video & NewVideoData>): Video | undefined {
  const videoIndex = mockVideos.findIndex(v => v.id === videoId);
  if (videoIndex > -1) {
    mockVideos[videoIndex] = { ...mockVideos[videoIndex], ...updatedData };
    // Ensure category name is updated if categoryId was part of updatedData
    if (updatedData.categoryId) {
        const category = mockCategories.find(c => c.id === updatedData.categoryId);
        mockVideos[videoIndex].category = category ? category.name : 'Uncategorized';
    }
    return mockVideos[videoIndex];
  }
  return undefined;
}
