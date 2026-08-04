import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateStreamItemDto } from './dto/create-stream-item.dto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Get all active room points grouped by top tags and activity contexts.
   */
  async getRoomsSummary() {
    if (!this.prisma.isConnected) {
      return { rooms: [] };
    }

    try {
      // Fetch top active hashtags to form rooms
      const topHashtags = await this.prisma.hashtag.findMany({
        take: 12,
        orderBy: { useCount: 'desc' },
      });

      const rooms = await Promise.all(
        topHashtags.map(async (tag) => {
          const vibeCount = await this.prisma.vibe.count({
            where: { keywords: { has: tag.name } },
          });

          const latestVibe = await this.prisma.vibe.findFirst({
            where: { keywords: { has: tag.name } },
            orderBy: { createdAt: 'desc' },
            select: {
              roomConfig: true,
              images: true,
              videoUrls: true,
              musicUrls: true,
              createdAt: true,
            },
          });

          return {
            id: `room-${tag.name}`,
            title: `#${tag.name.toUpperCase()} ROOM`,
            tag: tag.name,
            totalCollectedPoints: vibeCount,
            lastActivityAt: latestVibe?.createdAt || tag.lastUsedAt,
            previewMedia: {
              imagesCount: latestVibe?.images?.length || 0,
              hasVideo: (latestVibe?.videoUrls?.length ?? 0) > 0,
              hasAudio: (latestVibe?.musicUrls?.length ?? 0) > 0,
            },
            themeConfig: latestVibe?.roomConfig || {
              bgTheme: 'cyberpunk-dark',
              neonColor: '#00ffcc',
            },
          };
        }),
      );

      return { rooms };
    } catch (error) {
      this.logger.error('Error fetching rooms summary', error);
      return { rooms: [] };
    }
  }

  /**
   * Get specific room by tag name or activity context.
   */
  async getRoomByTag(tagOrActivity: string) {
    if (!this.prisma.isConnected) {
      throw new NotFoundException(`Room '${tagOrActivity}' not available (DB offline)`);
    }

    // If tagOrActivity is a UUID, attempt to load the actual room first
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tagOrActivity);
    if (isUuid) {
      try {
        const room = await this.getRoomById(tagOrActivity);
        if (room) {
          return { room };
        }
      } catch (_) {}
    }

    const cleanTag = tagOrActivity.toLowerCase().replace(/^#+/, '').trim();

    // Query vibes associated with this tag
    const vibes = await this.prisma.vibe.findMany({
      where: {
        OR: [
          { keywords: { has: cleanTag } },
          { title: { contains: cleanTag, mode: 'insensitive' } },
        ],
      },
      include: {
        author: {
          select: { id: true, username: true, email: true, role: true },
        },
        updates: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    if (vibes.length === 0) {
      throw new NotFoundException(`No vibe points collected yet for room tag '#${cleanTag}'`);
    }

    // Extract playlists for room widgets
    const videoPlaylist = vibes.flatMap((v) =>
      v.videoUrls.map((url) => ({ vibeId: v.id, title: v.title, videoUrl: url })),
    );

    const audioPlaylist = vibes.flatMap((v) =>
      v.musicUrls.map((url) => ({ vibeId: v.id, title: v.title, musicUrl: url })),
    );

    const imageGallery = vibes.flatMap((v) => v.images);

    // Merge room theme configurations from collected vibe points
    const mergedRoomConfig = vibes.find((v) => v.roomConfig)?.roomConfig || {
      theme: 'neon-space',
      accentColor: '#8a2be2',
      widgetLayout: ['audio-player', 'video-canvas', 'vibe-stream'],
    };

    return {
      room: {
        id: `room-${cleanTag}`,
        tag: cleanTag,
        title: `#${cleanTag.toUpperCase()} ROOM`,
        collectedPointsCount: vibes.length,
        themeConfig: mergedRoomConfig,
        widgetsData: {
          videoPlaylist,
          audioPlaylist,
          imageGallery,
        },
        vibePointsStream: vibes,
      },
    };
  }

  /**
   * Stream data points for a tag or activity context.
   */
  async streamRoomData(tag?: string, page = 1, limit = 20) {
    if (!this.prisma.isConnected) {
      return { dataPoints: [], total: 0 };
    }

    const where: any = {};
    if (tag) {
      where.keywords = { has: tag.toLowerCase().replace(/^#+/, '').trim() };
    }

    const skip = (page - 1) * limit;

    const [dataPoints, total] = await Promise.all([
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

    return {
      streamInfo: {
        tag: tag || null,
        page,
        limit,
        totalPoints: total,
      },
      dataPoints,
    };
  }

  /**
   * Add news announcement to room.
   */
  async addNewsToRoom(roomId: string, authorId: string, dto: { title: string; content: string }) {
    if (!this.prisma.isConnected) {
      return {
        id: `news-${Date.now()}`,
        title: dto.title,
        content: dto.content,
        authorId,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.roomNews.create({
      data: {
        title: dto.title,
        content: dto.content,
        roomId,
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  /**
   * Delete news item from room.
   */
  async deleteNewsFromRoom(roomId: string, newsId: string) {
    if (!this.prisma.isConnected) {
      return { success: true };
    }

    await this.prisma.roomNews.deleteMany({
      where: { id: newsId, roomId },
    });
    return { success: true };
  }

  /**
   * Add Markdown note to room.
   */
  async addNoteToRoom(roomId: string, authorId: string, dto: { title: string; content: string }) {
    if (!this.prisma.isConnected) {
      return {
        id: `note-${Date.now()}`,
        title: dto.title,
        content: dto.content,
        authorId,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.roomNote.create({
      data: {
        title: dto.title,
        content: dto.content,
        roomId,
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  /**
   * Update Markdown note in room.
   */
  async updateRoomNote(roomId: string, noteId: string, dto: { title?: string; content?: string }) {
    if (!this.prisma.isConnected) {
      return { id: noteId, ...dto, updatedAt: new Date().toISOString() };
    }

    return this.prisma.roomNote.update({
      where: { id: noteId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: dto.content }),
      },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  /**
   * Delete note from room.
   */
  async deleteRoomNote(roomId: string, noteId: string) {
    if (!this.prisma.isConnected) {
      return { success: true };
    }

    await this.prisma.roomNote.deleteMany({
      where: { id: noteId, roomId },
    });
    return { success: true };
  }

  async getRooms(filters: { tag?: string; isPublic?: boolean; authorId?: string }) {
    if (!this.prisma.isConnected) {
      return [];
    }
    const where: any = {};
    if (filters.tag) {
      const cleanTag = filters.tag.toLowerCase().replace(/^#+/, '').trim();
      where.tags = { has: `#${cleanTag}` };
    }
    if (filters.isPublic !== undefined) {
      where.isPublic = filters.isPublic;
    }
    if (filters.authorId) {
      where.authorId = filters.authorId;
    }

    return this.prisma.room.findMany({
      where,
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
        streamItems: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        news: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        notes: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRoomById(id: string) {
    if (!this.prisma.isConnected) {
      throw new NotFoundException(`Room with ID ${id} not available (DB offline)`);
    }
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
        streamItems: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        news: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        notes: {
          include: {
            author: {
              select: { id: true, username: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async createRoom(authorId: string, dto: CreateRoomDto) {
    if (!this.prisma.isConnected) {
      return {
        id: `room-${Date.now()}`,
        ...dto,
        authorId,
        authorName: 'operator',
        createdAt: new Date().toISOString(),
      };
    }
    return this.prisma.room.create({
      data: {
        title: dto.title,
        description: dto.description,
        poster: dto.poster,
        originVibeId: dto.originVibeId,
        isPublic: dto.isPublic !== false,
        tags: dto.tags || [],
        images: dto.images || [],
        videoUrls: dto.videoUrls || [],
        musicUrls: dto.musicUrls || [],
        youtubeUrls: dto.youtubeUrls || [],
        roomConfig: dto.roomConfig || {},
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  async updateRoom(roomId: string, authorId: string, dto: UpdateRoomDto) {
    if (!this.prisma.isConnected) {
      return { id: roomId, ...dto };
    }
    const room = await this.prisma.room.findUnique({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }
    return this.prisma.room.update({
      where: { id: roomId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.poster !== undefined && { poster: dto.poster }),
        ...(dto.isPublic !== undefined && { isPublic: dto.isPublic }),
        ...(dto.tags !== undefined && { tags: dto.tags }),
        ...(dto.images !== undefined && { images: dto.images }),
        ...(dto.videoUrls !== undefined && { videoUrls: dto.videoUrls }),
        ...(dto.musicUrls !== undefined && { musicUrls: dto.musicUrls }),
        ...(dto.youtubeUrls !== undefined && { youtubeUrls: dto.youtubeUrls }),
        ...(dto.roomConfig !== undefined && { roomConfig: dto.roomConfig }),
      },
      include: {
        author: {
          select: { id: true, username: true, email: true },
        },
      },
    });
  }

  async addStreamItemToRoom(roomId: string, authorId: string, dto: CreateStreamItemDto) {
    if (!this.prisma.isConnected) {
      return {
        id: `rsi-${Date.now()}`,
        ...dto,
        authorId,
        createdAt: new Date().toISOString(),
      };
    }
    return this.prisma.roomStreamItem.create({
      data: {
        type: dto.type,
        content: dto.content,
        mediaUrls: dto.mediaUrls || [],
        url: dto.url,
        title: dto.title,
        roomId,
        authorId,
      },
      include: {
        author: {
          select: { id: true, username: true },
        },
      },
    });
  }
}
