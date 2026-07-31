import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateStreamItemDto } from './dto/create-stream-item.dto';
import { CreateRoomNewsDto } from './dto/create-room-news.dto';
import { CreateRoomNoteDto } from './dto/create-room-note.dto';
import { UpdateRoomNoteDto } from './dto/update-room-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getRooms(
    @Query('tag') tag?: string,
    @Query('isPublic') isPublic?: string,
    @Query('authorId') authorId?: string,
  ) {
    const isPub = isPublic === 'true' ? true : isPublic === 'false' ? false : undefined;
    return this.roomsService.getRooms({ tag, isPublic: isPub, authorId });
  }

  @Get('summary')
  getRoomsSummary() {
    return this.roomsService.getRoomsSummary();
  }

  @Get('stream')
  streamRoomData(
    @Query('tag') tag?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    return this.roomsService.streamRoomData(tag, page, limit);
  }

  @Get('id/:id')
  getRoomById(@Param('id') id: string) {
    return this.roomsService.getRoomById(id);
  }

  @Get(':tag')
  getRoomByTag(@Param('tag') tag: string) {
    return this.roomsService.getRoomByTag(tag);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createRoom(
    @GetUser('id') userId: string,
    @Body() dto: CreateRoomDto,
  ) {
    return this.roomsService.createRoom(userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateRoom(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: UpdateRoomDto,
  ) {
    return this.roomsService.updateRoom(id, userId, dto);
  }

  @Post(':id/stream')
  @UseGuards(JwtAuthGuard)
  addStreamItemToRoom(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: CreateStreamItemDto,
  ) {
    return this.roomsService.addStreamItemToRoom(id, userId, dto);
  }

  @Post(':id/news')
  @UseGuards(JwtAuthGuard)
  addNewsToRoom(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: CreateRoomNewsDto,
  ) {
    return this.roomsService.addNewsToRoom(id, userId, dto);
  }

  @Delete(':id/news/:newsId')
  @UseGuards(JwtAuthGuard)
  deleteNewsFromRoom(
    @Param('id') id: string,
    @Param('newsId') newsId: string,
  ) {
    return this.roomsService.deleteNewsFromRoom(id, newsId);
  }

  @Post(':id/notes')
  @UseGuards(JwtAuthGuard)
  addNoteToRoom(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: CreateRoomNoteDto,
  ) {
    return this.roomsService.addNoteToRoom(id, userId, dto);
  }

  @Patch(':id/notes/:noteId')
  @UseGuards(JwtAuthGuard)
  updateRoomNote(
    @Param('id') id: string,
    @Param('noteId') noteId: string,
    @Body() dto: UpdateRoomNoteDto,
  ) {
    return this.roomsService.updateRoomNote(id, noteId, dto);
  }

  @Delete(':id/notes/:noteId')
  @UseGuards(JwtAuthGuard)
  deleteRoomNote(
    @Param('id') id: string,
    @Param('noteId') noteId: string,
  ) {
    return this.roomsService.deleteRoomNote(id, noteId);
  }
}
