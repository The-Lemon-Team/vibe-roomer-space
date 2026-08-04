import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as path from 'path';
import {
  MediaBlobInfo,
  MediaBlobResult,
  MediaBlobUpdateResult,
  MediaService,
} from './media.service';

@Injectable()
export class SupabaseMediaService extends MediaService {
  private readonly logger = new Logger(SupabaseMediaService.name);
  private readonly supabase: SupabaseClient;
  private readonly bucket: string;

  constructor() {
    super();
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    this.bucket = process.env.SUPABASE_STORAGE_BUCKET || 'media';

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables. ' +
          'Please set them in your .env file.',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  }

  async putBlob(file: Express.Multer.File): Promise<MediaBlobResult> {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    const { error } = await this.supabase.storage.from(this.bucket).upload(uniqueName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

    if (error) {
      this.logger.error(`Upload failed: ${error.message}`);
      throw new InternalServerErrorException(`Failed to upload file: ${error.message}`);
    }

    const url = this.getPublicUrl(uniqueName);
    return { filename: uniqueName, url, size: file.size };
  }

  async listBlobs(): Promise<MediaBlobInfo[]> {
    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .list('', { limit: 200, sortBy: { column: 'updated_at', order: 'desc' } });

    if (error) {
      this.logger.warn(`Failed to list files: ${error.message}`);
      return [];
    }

    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

    return (data ?? [])
      .filter((file) => {
        const ext = path.extname(file.name).toLowerCase();
        return imageExts.includes(ext);
      })
      .map((file) => ({
        filename: file.name,
        url: this.getPublicUrl(file.name),
        size: file.metadata?.size ?? 0,
        updatedAt: file.updated_at ?? file.created_at ?? new Date().toISOString(),
      }));
  }

  getPublicUrl(filename: string): string {
    const { data } = this.supabase.storage.from(this.bucket).getPublicUrl(filename);
    return data.publicUrl;
  }

  async updateBlob(filename: string, file: Express.Multer.File): Promise<MediaBlobUpdateResult> {
    const { error } = await this.supabase.storage.from(this.bucket).upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

    if (error) {
      this.logger.error(`Update failed for '${filename}': ${error.message}`);
      throw new InternalServerErrorException(`Failed to update file '${filename}': ${error.message}`);
    }

    return {
      message: `Media file '${filename}' successfully updated`,
      filename,
      url: this.getPublicUrl(filename),
      size: file.size,
    };
  }

  async deleteBlob(filename: string): Promise<{ message: string }> {
    const { error } = await this.supabase.storage.from(this.bucket).remove([filename]);

    if (error) {
      this.logger.error(`Delete failed for '${filename}': ${error.message}`);
      throw new NotFoundException(`Media file '${filename}' not found or could not be deleted`);
    }

    return { message: `Media file '${filename}' successfully deleted` };
  }
}
