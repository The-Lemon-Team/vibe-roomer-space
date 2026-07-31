import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as path from 'path';

@Injectable()
export class MediaService {
  private readonly logger = new Logger(MediaService.name);
  private readonly supabase: SupabaseClient;
  private readonly bucket: string;

  constructor() {
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

  // ── Upload ─────────────────────────────────────────────────────────────────

  async uploadFile(file: Express.Multer.File): Promise<{ filename: string; url: string; size: number }> {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(uniqueName, file.buffer, {
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

  // ── List ──────────────────────────────────────────────────────────────────

  async listFiles(): Promise<{ filename: string; url: string; size: number; updatedAt: string }[]> {
    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .list('', { limit: 200, sortBy: { column: 'updated_at', order: 'desc' } });

    if (error) {
      this.logger.warn(`Failed to list files: ${error.message}`);
      return [];
    }

    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];

    return (data ?? [])
      .filter((f) => {
        const ext = path.extname(f.name).toLowerCase();
        return imageExts.includes(ext);
      })
      .map((f) => ({
        filename: f.name,
        url: this.getPublicUrl(f.name),
        size: f.metadata?.size ?? 0,
        updatedAt: f.updated_at ?? f.created_at ?? new Date().toISOString(),
      }));
  }

  // ── Public URL ────────────────────────────────────────────────────────────

  getPublicUrl(filename: string): string {
    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(filename);
    return data.publicUrl;
  }

  // ── Update (upsert) ───────────────────────────────────────────────────────

  async updateFile(
    filename: string,
    file: Express.Multer.File,
  ): Promise<{ message: string; filename: string; url: string; size: number }> {
    const { error } = await this.supabase.storage
      .from(this.bucket)
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      this.logger.error(`Update failed for '${filename}': ${error.message}`);
      throw new InternalServerErrorException(`Failed to update file '${filename}': ${error.message}`);
    }

    const url = this.getPublicUrl(filename);
    return {
      message: `Media file '${filename}' successfully updated`,
      filename,
      url,
      size: file.size,
    };
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  async deleteFile(filename: string): Promise<{ message: string }> {
    const { error } = await this.supabase.storage
      .from(this.bucket)
      .remove([filename]);

    if (error) {
      this.logger.error(`Delete failed for '${filename}': ${error.message}`);
      throw new NotFoundException(`Media file '${filename}' not found or could not be deleted`);
    }

    return { message: `Media file '${filename}' successfully deleted` };
  }
}
