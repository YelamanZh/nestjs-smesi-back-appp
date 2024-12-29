import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: 'Заголовок новости' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Содержание новости' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Изображения новости',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({
    description: 'Превью-изображение',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  previewImage?: string;
}
