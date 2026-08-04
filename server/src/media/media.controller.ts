import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { MediaLibraryService } from './media-library.service';

/** Multer interceptor using in-memory storage — no files touch disk. */
const memoryMulter = FileInterceptor('file', {
  storage: memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB cap
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException(`Unsupported file type: ${file.mimetype}`), false);
    }
  },
});

@Controller('media')
export class MediaController {
  constructor(private readonly mediaLibrary: MediaLibraryService) {}

  // ── Unsplash proxy (official API — requires UNSPLASH_ACCESS_KEY) ──────────

  @Get('unsplash/search')
  async searchUnsplash(@Query('query') query: string) {
    if (!query) {
      return { results: [] };
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      throw new BadRequestException(
        'Unsplash search is not configured. Set UNSPLASH_ACCESS_KEY in your environment.',
      );
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=24`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
            'Accept-Version': 'v1',
          },
        },
      );
      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(
          `Unsplash API returned ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ''}`,
        );
      }
      return await response.json();
    } catch (err: any) {
      throw new BadRequestException('Could not search Unsplash: ' + err.message);
    }
  }

  // ── List registered library images ────────────────────────────────────────

  @Get()
  async listMedia() {
    return this.mediaLibrary.listImages();
  }

  // ── Upload + register in the media library ────────────────────────────────

  @Post('upload')
  @UseInterceptors(memoryMulter)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No media file provided for upload');
    }
    return this.mediaLibrary.addImage(file);
  }

  // ── Redirect to the active media URL (Supabase CDN or local uploads path) ──

  @Get(':filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const url = this.mediaLibrary.getPublicUrl(filename);
    return res.redirect(301, url);
  }

  // ── Update / replace a file ───────────────────────────────────────────────

  @Put(':filename')
  @UseInterceptors(memoryMulter)
  async updateFile(
    @Param('filename') filename: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No replacement file provided');
    }
    return this.mediaLibrary.replaceImage(filename, file);
  }

  // ── Delete a file ─────────────────────────────────────────────────────────

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.mediaLibrary.removeImage(filename);
  }
}
