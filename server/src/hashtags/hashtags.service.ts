import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HashtagsService {
  private readonly logger = new Logger(HashtagsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Register or increment list of hashtags whenever mentioned in a vibe post.
   */
  async registerHashtags(tags: string[]) {
    if (!tags || tags.length === 0 || !this.prisma.isConnected) {
      return;
    }

    const normalizedTags = Array.from(
      new Set(
        tags
          .map((tag) => tag.toLowerCase().replace(/^#+/, '').trim())
          .filter((tag) => tag.length > 0),
      ),
    );

    for (const tagName of normalizedTags) {
      try {
        await this.prisma.hashtag.upsert({
          where: { name: tagName },
          update: {
            useCount: { increment: 1 },
            lastUsedAt: new Date(),
          },
          create: {
            name: tagName,
            useCount: 1,
            lastUsedAt: new Date(),
          },
        });
      } catch (error) {
        this.logger.error(`Failed to register hashtag '${tagName}'`, error);
      }
    }
  }

  /**
   * Get top N hashtags (default 10) sorted by useCount for building dynamic navigation menus.
   */
  async getTopHashtags(limit = 10) {
    if (!this.prisma.isConnected) {
      return [];
    }

    try {
      return await this.prisma.hashtag.findMany({
        take: limit,
        orderBy: [{ useCount: 'desc' }, { lastUsedAt: 'desc' }],
      });
    } catch (error) {
      this.logger.error('Failed to fetch top hashtags', error);
      return [];
    }
  }

  /**
   * Autocomplete endpoint for hashtag search in frontend search bars / post creation inputs.
   */
  async autocomplete(query: string, limit = 10) {
    if (!this.prisma.isConnected || !query) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().replace(/^#+/, '').trim();

    try {
      return await this.prisma.hashtag.findMany({
        where: {
          name: {
            contains: normalizedQuery,
            mode: 'insensitive',
          },
        },
        take: limit,
        orderBy: [{ useCount: 'desc' }],
      });
    } catch (error) {
      this.logger.error(`Autocomplete error for query '${query}'`, error);
      return [];
    }
  }

  /**
   * Get all registered hashtags with pagination and search.
   */
  async getAllHashtags(query?: string, page = 1, limit = 20) {
    if (!this.prisma.isConnected) {
      return { data: [], total: 0 };
    }

    const skip = (page - 1) * limit;
    const whereCondition = query
      ? {
          name: {
            contains: query.toLowerCase().replace(/^#+/, '').trim(),
            mode: 'insensitive' as const,
          },
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.hashtag.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: [{ useCount: 'desc' }, { lastUsedAt: 'desc' }],
      }),
      this.prisma.hashtag.count({ where: whereCondition }),
    ]);

    return { data, total, page, limit };
  }
}
