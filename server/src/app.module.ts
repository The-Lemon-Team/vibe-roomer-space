import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminFeedModule } from './admin-feed/admin-feed.module';
import { StatsModule } from './stats/stats.module';
import { MediaModule } from './media/media.module';
import { HashtagsModule } from './hashtags/hashtags.module';
import { VibesModule } from './vibes/vibes.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminFeedModule,
    StatsModule,
    MediaModule,
    HashtagsModule,
    VibesModule,
    RoomsModule,
  ],
})
export class AppModule {}
