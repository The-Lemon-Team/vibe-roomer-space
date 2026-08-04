import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import {
  buildLocalMediaUrl,
  MediaBlobInfo,
  MediaBlobResult,
  MediaBlobUpdateResult,
  MediaService,
  resolveUploadsDir,
} from './media.service';

@Injectable()
export class LocalMediaService extends MediaService {
  private readonly uploadsDir = resolveUploadsDir();

  private async ensureUploadsDir(): Promise<void> {
    await fs.mkdir(this.uploadsDir, { recursive: true });
  }

  private sanitizeFilename(filename: string): string {
    return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
  }

  private makeStoredFilename(file: Express.Multer.File): string {
    const ext = path.extname(file.originalname).toLowerCase();
    return `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  }

  async putBlob(file: Express.Multer.File): Promise<MediaBlobResult> {
    await this.ensureUploadsDir();

    const filename = this.makeStoredFilename(file);
    await fs.writeFile(path.join(this.uploadsDir, filename), file.buffer);

    return {
      filename,
      url: this.getPublicUrl(filename),
      size: file.size,
    };
  }

  async listBlobs(): Promise<MediaBlobInfo[]> {
    await this.ensureUploadsDir();

    const entries = await fs.readdir(this.uploadsDir, { withFileTypes: true });
    const imageExts = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif']);

    const files = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && imageExts.has(path.extname(entry.name).toLowerCase()))
        .map(async (entry) => {
          const fullPath = path.join(this.uploadsDir, entry.name);
          const stats = await fs.stat(fullPath);

          return {
            filename: entry.name,
            url: this.getPublicUrl(entry.name),
            size: stats.size,
            updatedAt: stats.mtime.toISOString(),
          };
        }),
    );

    return files.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  getPublicUrl(filename: string): string {
    return buildLocalMediaUrl(this.sanitizeFilename(filename));
  }

  async updateBlob(filename: string, file: Express.Multer.File): Promise<MediaBlobUpdateResult> {
    await this.ensureUploadsDir();

    const safeFilename = this.sanitizeFilename(filename);
    await fs.writeFile(path.join(this.uploadsDir, safeFilename), file.buffer);

    return {
      message: `Media file '${safeFilename}' successfully updated`,
      filename: safeFilename,
      url: this.getPublicUrl(safeFilename),
      size: file.size,
    };
  }

  async deleteBlob(filename: string): Promise<{ message: string }> {
    const safeFilename = this.sanitizeFilename(filename);
    const fullPath = path.join(this.uploadsDir, safeFilename);

    try {
      await fs.unlink(fullPath);
    } catch (error: any) {
      if (error?.code === 'ENOENT') {
        throw new NotFoundException(`Media file '${safeFilename}' not found or could not be deleted`);
      }
      throw error;
    }

    return { message: `Media file '${safeFilename}' successfully deleted` };
  }
}
