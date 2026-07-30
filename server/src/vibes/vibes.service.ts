import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashtagsService } from '../hashtags/hashtags.service';
import { CreateVibeDto } from './dto/create-vibe.dto';
import { UpdateVibeDto } from './dto/update-vibe.dto';
import { Role } from '../generated/client';

@Injectable()
export class VibesService {
  constructor(
    private prisma: PrismaService,
    private hashtagsService: HashtagsService,
  ) {}

  async createVibe(userId: string, dto: CreateVibeDto) {
    const keywords = dto.keywords || [];

    // Extract any #hashtag in title or content
    const textToScan = `${dto.title || ''} ${dto.content || ''}`;
    const hashtagMatches = textToScan.match(/#[\w\u0400-\u04FF]+/g) || [];
    const parsedTags = hashtagMatches.map((t) => t.replace('#', ''));

    const allTags = Array.from(new Set([...keywords, ...parsedTags]));

    const vibe = await this.prisma.vibe.create({
      data: {
        title: dto.title,
        content: dto.content,
        keywords: allTags,
        activity: dto.activity || 'CUSTOM',
        images: dto.images || [],
        videoUrl: dto.videoUrl || null,
        musicUrl: dto.musicUrl || null,
        roomConfig: dto.roomConfig || null,
        authorId: userId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
    });

    // Auto-register hashtags for menu analytics & autocomplete
    await this.hashtagsService.registerHashtags(allTags);

    return vibe;
  }

  async getVibes(params: {
    tag?: string;
    activity?: string;
    authorId?: string;
    inMainFeed?: boolean;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    if (!this.prisma.isConnected) {
      return { data: [], total: 0, page: params.page || 1, limit: params.limit || 20 };
    }

    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (params.tag) {
      where.keywords = { has: params.tag.toLowerCase().trim() };
    }

    if (params.activity) {
      where.activity = params.activity;
    }

    if (params.authorId) {
      where.authorId = params.authorId;
    }

    if (params.inMainFeed !== undefined) {
      where.inMainFeed = params.inMainFeed;
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { content: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.vibe.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: { id: true, username: true, email: true, role: true },
          },
          updates: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vibe.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async getVibeById(id: string) {
    const vibe = await this.prisma.vibe.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
        updates: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!vibe) {
      throw new NotFoundException(`Vibe with ID '${id}' not found`);
    }

    return vibe;
  }

  async updateVibe(id: string, user: { id: string; role: Role }, dto: UpdateVibeDto) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe with ID '${id}' not found`);
    }

    if (existing.authorId !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to update this vibe');
    }

    const keywords = dto.keywords !== undefined ? dto.keywords : existing.keywords;
    const textToScan = `${dto.title || existing.title} ${dto.content || existing.content}`;
    const hashtagMatches = textToScan.match(/#[\w\u0400-\u04FF]+/g) || [];
    const parsedTags = hashtagMatches.map((t) => t.replace('#', ''));
    const allTags = Array.from(new Set([...keywords, ...parsedTags]));

    const updated = await this.prisma.vibe.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: dto.content }),
        keywords: allTags,
        ...(dto.activity !== undefined && { activity: dto.activity }),
        ...(dto.images !== undefined && { images: dto.images }),
        ...(dto.videoUrl !== undefined && { videoUrl: dto.videoUrl }),
        ...(dto.musicUrl !== undefined && { musicUrl: dto.musicUrl }),
        ...(dto.roomConfig !== undefined && { roomConfig: dto.roomConfig }),
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
      },
    });

    await this.hashtagsService.registerHashtags(allTags);

    return updated;
  }

  async deleteVibe(id: string, user: { id: string; role: Role }) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe with ID '${id}' not found`);
    }

    if (existing.authorId !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this vibe');
    }

    return this.prisma.vibe.delete({ where: { id } });
  }

  async addVibeUpdate(id: string, user: { id: string; role: Role }, dto: { content: string; mediaUrls?: string[] }) {
    const existing = await this.prisma.vibe.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Vibe with ID '${id}' not found`);
    }

    if (existing.authorId !== user.id && user.role !== Role.ADMIN) {
      throw new ForbiddenException('You do not have permission to add updates to this vibe');
    }

    const vibeUpdate = await this.prisma.vibeUpdate.create({
      data: {
        content: dto.content,
        mediaUrls: dto.mediaUrls || [],
        vibeId: id,
      },
    });

    return vibeUpdate;
  }
}

