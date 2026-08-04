import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuTagScope } from './menu-tag-scope.enum';
import { CreateMenuTagDto } from './dto/create-menu-tag.dto';

@Injectable()
export class MenuTagsService {
  private readonly logger = new Logger(MenuTagsService.name);

  constructor(private prisma: PrismaService) {}

  private normalizeName(raw: string): string {
    return raw.toLowerCase().replace(/^#+/, '').trim();
  }

  private formatTag(tag: { id: string; name: string; scope: MenuTagScope; sortOrder: number }) {
    return {
      id: tag.id,
      name: `#${tag.name}`,
      scope: tag.scope,
      sortOrder: tag.sortOrder,
    };
  }

  async getMenuTags(scope?: MenuTagScope) {
    if (!this.prisma.isConnected) {
      return [];
    }

    const tags = await this.prisma.menuTag.findMany({
      where: scope ? { scope } : undefined,
      orderBy: [{ scope: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return tags.map((t) => this.formatTag(t));
  }

  async createMenuTag(dto: CreateMenuTagDto) {
    if (!this.prisma.isConnected) {
      throw new ConflictException('Database is not available');
    }

    const name = this.normalizeName(dto.name);
    if (!name) {
      throw new ConflictException('Tag name is required');
    }

    const existing = await this.prisma.menuTag.findUnique({
      where: { name_scope: { name, scope: dto.scope } },
    });
    if (existing) {
      throw new ConflictException(`Tag #${name} already exists in ${dto.scope} menu`);
    }

    let sortOrder = dto.sortOrder;
    if (sortOrder === undefined) {
      const last = await this.prisma.menuTag.findFirst({
        where: { scope: dto.scope },
        orderBy: { sortOrder: 'desc' },
        select: { sortOrder: true },
      });
      sortOrder = (last?.sortOrder ?? -1) + 1;
    }

    try {
      const tag = await this.prisma.menuTag.create({
        data: { name, scope: dto.scope, sortOrder },
      });
      return this.formatTag(tag);
    } catch (error) {
      this.logger.error(`Failed to create menu tag #${name}`, error);
      throw new ConflictException(`Could not create tag #${name}`);
    }
  }

  async deleteMenuTag(id: string) {
    if (!this.prisma.isConnected) {
      throw new NotFoundException('Database is not available');
    }

    try {
      await this.prisma.menuTag.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException(`Menu tag ${id} not found`);
    }
  }
}
