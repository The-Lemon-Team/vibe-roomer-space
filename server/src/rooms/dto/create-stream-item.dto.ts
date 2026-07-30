export class CreateStreamItemDto {
  type: string; // 'text' | 'image' | 'video' | 'music' | 'youtube'
  content?: string;
  mediaUrls?: string[];
  url?: string;
  title?: string;
}
