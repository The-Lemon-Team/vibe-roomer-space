import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  private uploadsDir = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  getUploadsDir(): string {
    return this.uploadsDir;
  }

  getFileMeta(filename: string) {
    const filePath = path.join(this.uploadsDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Media file '${filename}' not found`);
    }
    const stats = fs.statSync(filePath);
    return {
      filename,
      filePath,
      size: stats.size,
      updatedAt: stats.mtime,
    };
  }

  async updateFile(filename: string, file: Express.Multer.File) {
    const targetPath = path.join(this.uploadsDir, filename);
    if (!fs.existsSync(targetPath)) {
      throw new NotFoundException(`Media file '${filename}' to update does not exist`);
    }
    try {
      fs.writeFileSync(targetPath, file.buffer);
      const stats = fs.statSync(targetPath);
      return {
        message: `Media file '${filename}' successfully updated`,
        filename,
        size: stats.size,
        updatedAt: stats.mtime,
      };
    } catch (err) {
      throw new InternalServerErrorException(`Failed to update file '${filename}'`);
    }
  }

  deleteFile(filename: string) {
    const filePath = path.join(this.uploadsDir, filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`Media file '${filename}' not found`);
    }
    fs.unlinkSync(filePath);
    return { message: `Media file '${filename}' successfully deleted` };
  }
}
