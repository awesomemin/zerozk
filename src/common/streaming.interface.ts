export interface Streaming {
  liveId: number;
  liveTitle: string;
  liveThumbnailImageUrl: string;
  concurrentUserCount: number;
  openDate: string;
  adult: boolean;
  tags: string[];
  categoryType: 'GAME' | 'SPORTS' | 'ETC';
  liveCategory: string;
  liveCategoryValue: string;
  channelId: string;
  channelName: string;
  channelImageUrl: string;
}
