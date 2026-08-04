import { IsEnum, IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { MenuTagScope } from '../menu-tag-scope.enum';

export class CreateMenuTagDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEnum(MenuTagScope)
  scope: MenuTagScope;

  @IsInt()
  @Min(0)
  @IsOptional()
  sortOrder?: number;
}
