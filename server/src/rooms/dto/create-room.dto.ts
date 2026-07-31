export class CreateRoomDto {
  title: string;
  description?: string;
  poster?: string;
  originVibeId?: string;
  isPublic?: boolean;
  tags?: string[];
  images?: string[];
  videoUrls?: string[];
  musicUrls?: string[];
  youtubeUrls?: string[];
  roomConfig?: any;
}
