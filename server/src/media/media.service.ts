import * as path from 'path';

export type MediaProvider = 'supabase' | 'local';

/** Result of a low-level blob write. */
export type MediaBlobResult = {
  filename: string;
  url: string;
  size: number;
};

export type MediaBlobInfo = {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
};

export type MediaBlobUpdateResult = MediaBlobResult & {
  message: string;
};

/**
 * Low-level blob storage for media bytes (local disk or Supabase Storage).
 * App code should prefer MediaLibraryService for register-and-return flows.
 */
export abstract class MediaService {
  abstract putBlob(file: Express.Multer.File): Promise<MediaBlobResult>;
  abstract listBlobs(): Promise<MediaBlobInfo[]>;
  abstract getPublicUrl(filename: string): string;
  abstract updateBlob(filename: string, file: Express.Multer.File): Promise<MediaBlobUpdateResult>;
  abstract deleteBlob(filename: string): Promise<{ message: string }>;
}

export function getMediaProvider(): MediaProvider {
  // Local disk is the default; opt into Supabase explicitly.
  return process.env.MEDIA_PROVIDER === 'supabase' ? 'supabase' : 'local';
}

export function getUploadsDir(): string {
  return process.env.UPLOADS_DIR || './uploads';
}

export function resolveUploadsDir(): string {
  const uploadsDir = getUploadsDir();
  return path.isAbsolute(uploadsDir) ? uploadsDir : path.resolve(process.cwd(), uploadsDir);
}

export function buildLocalMediaUrl(filename: string): string {
  return `/uploads/${encodeURIComponent(filename)}`;
}
