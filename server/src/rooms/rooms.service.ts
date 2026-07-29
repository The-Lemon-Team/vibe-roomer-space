import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
              activity: true,
              images: true,
              videoUrl: true,
              musicUrl: true,
              createdAt: true,
            },
          });

          return {
            id: `room-${tag.name}`,
            title: `#${tag.name.toUpperCase()} ROOM`,
            tag: tag.name,
            activity: latestVibe?.activity || 'CUSTOM',
            totalCollectedPoints: vibeCount,
            lastActivityAt: latestVibe?.createdAt || tag.lastUsedAt,
            previewMedia: {
              imagesCount: latestVibe?.images?.length || 0,
              hasVideo: !!latestVibe?.videoUrl,
              hasAudio: !!latestVibe?.musicUrl,
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
    const videoPlaylist = vibes
      .filter((v) => v.videoUrl)
      .map((v) => ({ vibeId: v.id, title: v.title, videoUrl: v.videoUrl }));

    const audioPlaylist = vibes
      .filter((v) => v.musicUrl)
      .map((v) => ({ vibeId: v.id, title: v.title, musicUrl: v.musicUrl }));

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
  async streamRoomData(tag?: string, activity?: string, page = 1, limit = 20) {
    if (!this.prisma.isConnected) {
      return { dataPoints: [], total: 0 };
    }

    const where: any = {};
    if (tag) {
      where.keywords = { has: tag.toLowerCase().replace(/^#+/, '').trim() };
    }
    if (activity) {
      where.activity = activity;
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
        activity: activity || null,
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
}
