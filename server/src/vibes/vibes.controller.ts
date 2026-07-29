import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { VibesService } from './vibes.service';
import { CreateVibeDto } from './dto/create-vibe.dto';
import { UpdateVibeDto } from './dto/update-vibe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('vibes')
export class VibesController {
  constructor(private readonly vibesService: VibesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createVibe(@GetUser('id') userId: string, @Body() dto: CreateVibeDto) {
    return this.vibesService.createVibe(userId, dto);
  }

  @Get()
  getVibes(
    @Query('tag') tag?: string,
    @Query('activity') activity?: string,
    @Query('authorId') authorId?: string,
    @Query('inMainFeed') inMainFeed?: boolean,
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    return this.vibesService.getVibes({
      tag,
      activity,
      authorId,
      inMainFeed,
      search,
      page,
      limit,
    });
  }

  @Get(':id')
  getVibeById(@Param('id') id: string) {
    return this.vibesService.getVibeById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateVibe(
    @Param('id') id: string,
    @GetUser() user: any,
    @Body() dto: UpdateVibeDto,
  ) {
    return this.vibesService.updateVibe(id, user, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteVibe(@Param('id') id: string, @GetUser() user: any) {
    return this.vibesService.deleteVibe(id, user);
  }

  @Post(':id/updates')
  @UseGuards(JwtAuthGuard)
  addVibeUpdate(
    @Param('id') id: string,
    @GetUser() user: any,
    @Body() dto: any,
  ) {
    return this.vibesService.addVibeUpdate(id, user, dto);
  }
}

