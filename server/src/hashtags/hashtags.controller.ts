import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';

@Controller('hashtags')
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Get('top')
  getTopHashtags(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
    return this.hashtagsService.getTopHashtags(limit);
  }

  @Get('autocomplete')
  autocomplete(
    @Query('query') query: string,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.hashtagsService.autocomplete(query, limit);
  }

  @Get()
  getAllHashtags(
    @Query('query') query?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
  ) {
    return this.hashtagsService.getAllHashtags(query, page, limit);
  }
}
