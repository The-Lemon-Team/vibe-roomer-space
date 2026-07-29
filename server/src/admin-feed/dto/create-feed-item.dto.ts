import { IsArray, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ActivityContext } from '@prisma/client';

export class CreateFeedItemDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];

  @IsEnum(ActivityContext)
  @IsOptional()
  activity?: ActivityContext;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  musicUrl?: string;

  @IsBoolean()
  @IsOptional()
  inMainFeed?: boolean;
}
