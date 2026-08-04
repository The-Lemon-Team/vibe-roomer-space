import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getMediaProvider, MediaService } from './media.service';

/** Client-facing payload after an image is stored and registered. */
export type MediaLibraryItem = {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type MediaAddImageResult = MediaLibraryItem & {
  message: string;
};

/**
 * High-level media library for the rest of the app.
 * Registers images in the DB and returns client payloads; blob I/O goes through MediaService.
 */
@Injectable()
export class MediaLibraryService {
  private readonly logger = new Logger(MediaLibraryService.name);

  constructor(
    private readonly blobs: MediaService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Upload image bytes, register the asset in the media library, return everything the client needs.
   */
  async addImage(file: Express.Multer.File): Promise<MediaAddImageResult> {
    const blob = await this.blobs.putBlob(file);
    const provider = getMediaProvider();

    try {
      const asset = await this.prisma.mediaAsset.create({
        data: {
          filename: blob.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: blob.size,
          url: blob.url,
          provider,
        },
      });

      return {
        message: 'Media uploaded successfully',
        ...this.toClientItem(asset),
      };
    } catch (error) {
      this.logger.error(
        `Failed to register media asset for '${blob.filename}', rolling back blob`,
        error instanceof Error ? error.stack : undefined,
      );
      try {
        await this.blobs.deleteBlob(blob.filename);
      } catch (rollbackError) {
        this.logger.warn(
          `Blob rollback failed for '${blob.filename}': ${
            rollbackError instanceof Error ? rollbackError.message : rollbackError
          }`,
        );
      }
      throw error;
    }
  }

  async listImages(): Promise<MediaLibraryItem[]> {
    const assets = await this.prisma.mediaAsset.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (assets.length > 0) {
      return assets.map((asset) => this.toClientItem(asset));
    }

    // Empty library: surface existing blobs so older uploads still appear in the UI.
    const blobs = await this.blobs.listBlobs();
    return blobs.map((blob) => ({
      id: blob.filename,
      filename: blob.filename,
      originalName: blob.filename,
      mimeType: 'application/octet-stream',
      size: blob.size,
      url: blob.url,
      provider: getMediaProvider(),
      createdAt: blob.updatedAt,
      updatedAt: blob.updatedAt,
    }));
  }

  getPublicUrl(filename: string): string {
    return this.blobs.getPublicUrl(filename);
  }

  async replaceImage(filename: string, file: Express.Multer.File) {
    const blob = await this.blobs.updateBlob(filename, file);
    const existing = await this.prisma.mediaAsset.findUnique({ where: { filename: blob.filename } });

    if (existing) {
      const asset = await this.prisma.mediaAsset.update({
        where: { filename: blob.filename },
        data: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: blob.size,
          url: blob.url,
        },
      });

      return {
        message: blob.message,
        ...this.toClientItem(asset),
      };
    }

    return {
      message: blob.message,
      filename: blob.filename,
      url: blob.url,
      size: blob.size,
      originalName: file.originalname,
      mimeType: file.mimetype,
    };
  }

  async removeImage(filename: string): Promise<{ message: string }> {
    const result = await this.blobs.deleteBlob(filename);
    // Legacy blobs may have no registry row.
    await this.prisma.mediaAsset.deleteMany({ where: { filename } });
    return result;
  }

  private toClientItem(asset: {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  }): MediaLibraryItem {
    return {
      id: asset.id,
      filename: asset.filename,
      originalName: asset.originalName,
      mimeType: asset.mimeType,
      size: asset.size,
      url: asset.url,
      provider: asset.provider,
      createdAt: asset.createdAt.toISOString(),
      updatedAt: asset.updatedAt.toISOString(),
    };
  }
}
