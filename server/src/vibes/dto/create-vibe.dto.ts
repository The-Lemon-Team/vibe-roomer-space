import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateVibeDto {
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

  @IsObject()
  @IsOptional()
  roomConfig?: Record<string, any>;
}
