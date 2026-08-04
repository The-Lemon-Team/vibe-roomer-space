import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaLibraryService } from './media-library.service';
import { LocalMediaService } from './local-media.service';
import { getMediaProvider, MediaService } from './media.service';
import { SupabaseMediaService } from './supabase-media.service';

@Module({
  controllers: [MediaController],
  providers: [
    {
      provide: MediaService,
      useFactory: () => {
        // Only construct the active provider so local mode does not require
        // SUPABASE_* env vars (SupabaseMediaService validates them in its ctor).
        return getMediaProvider() === 'supabase'
          ? new SupabaseMediaService()
          : new LocalMediaService();
      },
    },
    MediaLibraryService,
  ],
  exports: [MediaService, MediaLibraryService],
})
export class MediaModule {}
