import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ description: 'Заголовок новости', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Содержание новости', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Изображения новости',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  images?: any[];

  @ApiProperty({
    description: 'Превью-изображение',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  previewImage?: any;
}
