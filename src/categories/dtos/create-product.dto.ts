import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ProductStatus {
  NEW = 'новинка',
  SALE = 'акция',
  RECOMMENDED = 'рекомендуем',
  HIT = 'хит',
  NONE = 'обычный',
}

export class CreateProductDto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: 'Specifications of the product' })
  @IsString()
  @IsOptional()
  specifications?: string;

  @ApiProperty({
    description: 'Status of the product',
    enum: ProductStatus,
    default: ProductStatus.NONE,
  })
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;

  @ApiProperty({ description: 'URL of the product image' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Category ID for the product' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}