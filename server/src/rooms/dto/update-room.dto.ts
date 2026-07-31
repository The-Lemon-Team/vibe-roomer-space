export class UpdateRoomDto {
  title?: string;
  description?: string;
  poster?: string;
  isPublic?: boolean;
  tags?: string[];
  images?: string[];
  videoUrls?: string[];
  musicUrls?: string[];
  youtubeUrls?: string[];
  roomConfig?: any;
}
