import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminFeedService } from './admin-feed.service';
import { CreateFeedItemDto } from './dto/create-feed-item.dto';
import { UpdateFeedItemDto } from './dto/update-feed-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '../auth/role.enum';

@Controller('admin/feed')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminFeedController {
  constructor(private readonly adminFeedService: AdminFeedService) {}

  @Get()
  getAllItems() {
    return this.adminFeedService.getAllItemsForAdmin();
  }

  @Post()
  createFeedItem(@GetUser('id') adminId: string, @Body() dto: CreateFeedItemDto) {
    return this.adminFeedService.createFeedItem(adminId, dto);
  }

  @Patch(':id/toggle')
  toggleMainFeedStatus(@Param('id') id: string, @Body('inMainFeed') inMainFeed?: boolean) {
    return this.adminFeedService.toggleMainFeedStatus(id, inMainFeed);
  }

  @Patch(':id')
  updateFeedItem(@Param('id') id: string, @Body() dto: UpdateFeedItemDto) {
    return this.adminFeedService.updateFeedItem(id, dto);
  }

  @Delete(':id')
  deleteFeedItem(@Param('id') id: string) {
    return this.adminFeedService.deleteFeedItem(id);
  }
}
