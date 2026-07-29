import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateVibeUpdateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mediaUrls?: string[];
}
