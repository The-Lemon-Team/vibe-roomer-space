import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getRoomsSummary() {
    return this.roomsService.getRoomsSummary();
  }

  @Get('stream')
  streamRoomData(
    @Query('tag') tag?: string,
    @Query('activity') activity?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    return this.roomsService.streamRoomData(tag, activity, page, limit);
  }

  @Get(':tag')
  getRoomByTag(@Param('tag') tag: string) {
    return this.roomsService.getRoomByTag(tag);
  }
}
