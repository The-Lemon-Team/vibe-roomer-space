import { IsArray, IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { ActivityContext } from '../../generated/client';

export class UpdateVibeDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

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

  @IsObject()
  @IsOptional()
  roomConfig?: Record<string, any>;
}
