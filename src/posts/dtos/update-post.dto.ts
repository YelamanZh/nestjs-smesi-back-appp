import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: 'Название поста', example: 'Новости компании' })
  @IsNotEmpty()
  @IsString()
  title: string; // Название поста

  @ApiProperty({ description: 'Контент поста', example: 'Содержание поста.' })
  @IsNotEmpty()
  @IsString()
  content: string; // Контент поста

  @ApiProperty({
    description: 'Массив ссылок на изображения',
    example: ['image1.jpg', 'image2.jpg'],
  })
  @IsOptional()
  @IsArray()
  images?: string[]; // Ссылки на изображения
}
