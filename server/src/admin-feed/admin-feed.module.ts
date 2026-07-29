import { Module } from '@nestjs/common';
import { AdminFeedService } from './admin-feed.service';
import { AdminFeedController } from './admin-feed.controller';

@Module({
  controllers: [AdminFeedController],
  providers: [AdminFeedService],
  exports: [AdminFeedService],
})
export class AdminFeedModule {}
