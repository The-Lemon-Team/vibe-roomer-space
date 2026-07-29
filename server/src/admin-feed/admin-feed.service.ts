import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedItemDto } from './dto/create-feed-item.dto';
import { UpdateFeedItemDto } from './dto/update-feed-item.dto';

@Injectable()
export class AdminFeedService {
  constructor(private prisma: PrismaService) {}

  async getMainFeedItems() {
    return this.prisma.vibe.findMany({
      where: { inMainFeed: true },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllItemsForAdmin() {
    return this.prisma.vibe.findMany({
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createFeedItem(adminId: string, dto: CreateFeedItemDto) {
    return this.prisma.vibe.create({
      data: {
        title: dto.title,
        content: dto.content,
        keywords: dto.keywords || [],
        activity: dto.activity || 'CUSTOM',
        images: dto.images || [],
        videoUrl: dto.videoUrl || null,
        musicUrl: dto.musicUrl || null,
        inMainFeed: dto.inMainFeed !== undefined ? dto.inMainFeed : true,
        authorId: adminId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
    });
  }

  async toggleMainFeedStatus(id: string, inMainFeed?: boolean) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe post with ID ${id} not found`);
    }

    const newStatus = inMainFeed !== undefined ? inMainFeed : !existing.inMainFeed;
    return this.prisma.vibe.update({
      where: { id },
      data: { inMainFeed: newStatus },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
    });
  }

  async updateFeedItem(id: string, dto: UpdateFeedItemDto) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe post with ID ${id} not found`);
    }

    return this.prisma.vibe.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.keywords !== undefined && { keywords: dto.keywords }),
        ...(dto.activity !== undefined && { activity: dto.activity }),
        ...(dto.images !== undefined && { images: dto.images }),
        ...(dto.videoUrl !== undefined && { videoUrl: dto.videoUrl }),
        ...(dto.musicUrl !== undefined && { musicUrl: dto.musicUrl }),
        ...(dto.inMainFeed !== undefined && { inMainFeed: dto.inMainFeed }),
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
    });
  }

  async deleteFeedItem(id: string) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe post with ID ${id} not found`);
    }
    return this.prisma.vibe.delete({ where: { id } });
  }
}
