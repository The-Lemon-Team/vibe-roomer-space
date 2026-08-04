import { Module } from '@nestjs/common';
import { MenuTagsController } from './menu-tags.controller';
import { MenuTagsService } from './menu-tags.service';

@Module({
  controllers: [MenuTagsController],
  providers: [MenuTagsService],
  exports: [MenuTagsService],
})
export class MenuTagsModule {}
