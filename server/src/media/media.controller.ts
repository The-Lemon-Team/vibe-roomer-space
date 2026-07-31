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
import { MediaService } from './media.service';

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
  constructor(private readonly mediaService: MediaService) {}

  // ── Unsplash proxy ────────────────────────────────────────────────────────

  @Get('unsplash/search')
  async searchUnsplash(@Query('query') query: string) {
    if (!query) {
      return { results: [] };
    }
    try {
      const response = await fetch(
        `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=24`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch from Unsplash api');
      }
      return await response.json();
    } catch (err: any) {
      throw new BadRequestException('Could not search Unsplash: ' + err.message);
    }
  }

  // ── List all uploaded files ───────────────────────────────────────────────

  @Get()
  async listMedia() {
    return this.mediaService.listFiles();
  }

  // ── Upload a new file ─────────────────────────────────────────────────────

  @Post('upload')
  @UseInterceptors(memoryMulter)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No media file provided for upload');
    }
    const result = await this.mediaService.uploadFile(file);
    return {
      message: 'Media uploaded successfully',
      filename: result.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: result.size,
      url: result.url,          // ← full Supabase CDN URL
    };
  }

  // ── Redirect to Supabase CDN URL (for backward-compat with old absolute paths) ──

  @Get(':filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const url = this.mediaService.getPublicUrl(filename);
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
    return this.mediaService.updateFile(filename, file);
  }

  // ── Delete a file ─────────────────────────────────────────────────────────

  @Delete(':filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.mediaService.deleteFile(filename);
  }
}
