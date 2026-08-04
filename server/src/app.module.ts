import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminFeedModule } from './admin-feed/admin-feed.module';
import { StatsModule } from './stats/stats.module';
import { MediaModule } from './media/media.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { VibesModule } from './vibes/vibes.module';
import { RoomsModule } from './rooms/rooms.module';
import { MenuTagsModule } from './menu-tags/menu-tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Prefer repo-root .env (shared with Docker/Prisma docs), then server/.env
      envFilePath: [
        join(process.cwd(), '../.env'),
        join(process.cwd(), '.env'),
      ],
    }),
    PrismaModule,
    AuthModule,
    AdminFeedModule,
    StatsModule,
    MediaModule,
    HashtagsModule,
    VibesModule,
    RoomsModule,
    MenuTagsModule,
  ],
})
export class AppModule {}
