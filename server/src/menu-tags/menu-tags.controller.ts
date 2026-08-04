import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MenuTagsService } from './menu-tags.service';
import { CreateMenuTagDto } from './dto/create-menu-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/role.enum';
import { MenuTagScope } from './menu-tag-scope.enum';

@Controller()
export class MenuTagsController {
  constructor(private readonly menuTagsService: MenuTagsService) {}

  /** Public: tags shown on the LIVE homepage menu for all users. */
  @Get('menu-tags')
  getMenuTags(@Query('scope') scope?: string) {
    const normalized =
      scope && Object.values(MenuTagScope).includes(scope.toUpperCase() as MenuTagScope)
        ? (scope.toUpperCase() as MenuTagScope)
        : undefined;
    return this.menuTagsService.getMenuTags(normalized);
  }

  /** Admin: add a tag to the public menu. */
  @Post('admin/menu-tags')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  createMenuTag(@Body() dto: CreateMenuTagDto) {
    return this.menuTagsService.createMenuTag(dto);
  }

  /** Admin: remove a tag from the public menu. */
  @Delete('admin/menu-tags/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  deleteMenuTag(@Param('id') id: string) {
    return this.menuTagsService.deleteMenuTag(id);
  }
}
