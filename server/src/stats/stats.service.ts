import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  private readonly logger = new Logger(StatsService.name);

  constructor(private prisma: PrismaService) {}

  async getContentStats() {
    if (!this.prisma.isConnected) {
      return {
        message: 'PostgreSQL database is currently disconnected. Start PostgreSQL to see real stats.',
        totalVibes: 0,
        counts: {
          hashtags: { total: 0, unique: 0, tags: [] },
          youtubeLinks: 0,
          audioTracks: 0,
          photos: 0,
        },
      };
    }

    try {
      const vibes = await this.prisma.vibe.findMany({
        select: {
          keywords: true,
          images: true,
          videoUrls: true,
          musicUrls: true,
        },
      });

      let totalHashtags = 0;
      const hashtagSet = new Set<string>();
      let totalYoutubeLinks = 0;
      let totalAudioTracks = 0;
      let totalPhotos = 0;


      for (const vibe of vibes) {
        // 1. Hashtags / Keywords
        if (Array.isArray(vibe.keywords)) {
          totalHashtags += vibe.keywords.length;
          vibe.keywords.forEach((tag) => hashtagSet.add(tag.toLowerCase().trim()));
        }

        // 2. Youtube links
        if (vibe.videoUrls.some((u) => u.includes('youtube.com') || u.includes('youtu.be'))) {
          totalYoutubeLinks++;
        }

        // 3. Audio content
        if (vibe.musicUrls.length > 0) {
          totalAudioTracks++;
        }

        // 4. Photo content
        if (Array.isArray(vibe.images)) {
          totalPhotos += vibe.images.length;
        }

      }

      return {
        totalVibes: vibes.length,
        counts: {
          hashtags: {
            total: totalHashtags,
            unique: hashtagSet.size,
            tags: Array.from(hashtagSet),
          },
          youtubeLinks: totalYoutubeLinks,
          audioTracks: totalAudioTracks,
          photos: totalPhotos,
        },
      };
    } catch (error) {
      this.logger.error('Error fetching content stats', error);
      return {
        error: 'Failed to retrieve stats from database',
        totalVibes: 0,
        counts: {
          hashtags: { total: 0, unique: 0, tags: [] },
          youtubeLinks: 0,
          audioTracks: 0,
          photos: 0,
        },
      };
    }
  }
}
