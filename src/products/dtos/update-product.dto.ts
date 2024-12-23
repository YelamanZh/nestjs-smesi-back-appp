import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsDecimal,
  IsObject,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({ description: 'Название продукта', example: 'Цемент' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Описание продукта',
    example: 'Качественный цемент',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Есть ли в наличии', example: true })
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({ description: 'Цена', example: 1000.9 })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    description: 'Ссылка на изображение',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string; // Поле для одной фотографии

  @ApiProperty({ description: 'ID категории', example: 1 })
  @IsNumber()
  categoryId: number;
}
