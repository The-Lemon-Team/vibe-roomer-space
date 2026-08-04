import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFeedItemDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

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

  @IsBoolean()
  @IsOptional()
  inMainFeed?: boolean;
}
