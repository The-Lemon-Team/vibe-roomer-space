export class CreateRoomDto {
  title: string;
  description?: string;
  poster?: string;
  originVibeId?: string;
  isPublic?: boolean;
  tags?: string[];
  images?: string[];
  videoUrl?: string;
  musicUrl?: string;
  youtubeUrl?: string;
  roomConfig?: any;
}
