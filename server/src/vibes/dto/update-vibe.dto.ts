import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

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


  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  videoUrls?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  musicUrls?: string[];

  @IsObject()
  @IsOptional()
  roomConfig?: Record<string, any>;
}
