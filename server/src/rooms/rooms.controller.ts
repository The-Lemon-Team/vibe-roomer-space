import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomNewsDto } from './dto/create-room-news.dto';
import { CreateRoomNoteDto } from './dto/create-room-note.dto';
import { UpdateRoomNoteDto } from './dto/update-room-note.dto';

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

  @Post(':id/news')
  addNewsToRoom(
    @Param('id') id: string,
    @Body() dto: CreateRoomNewsDto,
  ) {
    return this.roomsService.addNewsToRoom(id, 'user-op-01', dto);
  }

  @Delete(':id/news/:newsId')
  deleteNewsFromRoom(
    @Param('id') id: string,
    @Param('newsId') newsId: string,
  ) {
    return this.roomsService.deleteNewsFromRoom(id, newsId);
  }

  @Post(':id/notes')
  addNoteToRoom(
    @Param('id') id: string,
    @Body() dto: CreateRoomNoteDto,
  ) {
    return this.roomsService.addNoteToRoom(id, 'user-op-01', dto);
  }

  @Patch(':id/notes/:noteId')
  updateRoomNote(
    @Param('id') id: string,
    @Param('noteId') noteId: string,
    @Body() dto: UpdateRoomNoteDto,
  ) {
    return this.roomsService.updateRoomNote(id, noteId, dto);
  }

  @Delete(':id/notes/:noteId')
  deleteRoomNote(
    @Param('id') id: string,
    @Param('noteId') noteId: string,
  ) {
    return this.roomsService.deleteRoomNote(id, noteId);
  }
}
