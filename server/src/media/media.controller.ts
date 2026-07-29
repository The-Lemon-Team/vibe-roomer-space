import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as diskFs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import { MediaService } from './media.service';

const uploadsDirectory = process.env.UPLOADS_DIR || path.join(process.cwd(), 'uploads');

if (!diskFs.existsSync(uploadsDirectory)) {
  diskFs.mkdirSync(uploadsDirectory, { recursive: true });
}

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: uploadsDirectory,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No media file provided for upload');
    }
    return {
      message: 'Media uploaded successfully',
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      url: `/media/${file.filename}`,
    };
  }

  @Get(':filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const meta = this.mediaService.getFileMeta(filename);
    return res.sendFile(meta.filePath);
  }

  @Put(':filename')
  @UseInterceptors(FileInterceptor('file'))
  updateFile(
    @Param('filename') filename: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No replacement file provided');
    }
    return this.mediaService.updateFile(filename, file);
  }

  @Delete(':filename')
  deleteFile(@Param('filename') filename: string) {
    return this.mediaService.deleteFile(filename);
  }
}
