export class UpdateRoomDto {
  title?: string;
  description?: string;
  poster?: string;
  isPublic?: boolean;
  tags?: string[];
  images?: string[];
  videoUrl?: string;
  musicUrl?: string;
  youtubeUrl?: string;
  roomConfig?: any;
}
