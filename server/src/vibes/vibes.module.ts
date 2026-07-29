import { Module } from '@nestjs/common';
import { VibesService } from './vibes.service';
import { VibesController } from './vibes.controller';
import { HashtagsModule } from '../hashtags/hashtags.module';

@Module({
  imports: [HashtagsModule],
  controllers: [VibesController],
  providers: [VibesService],
  exports: [VibesService],
})
export class VibesModule {}
