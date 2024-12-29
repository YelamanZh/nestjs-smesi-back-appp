import { IsObject, IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from 'src/categories/enums/productStatus.enum';

export class UpdateProductDto {
  @ApiProperty({ description: 'Название продукта' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание продукта', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'ID категории' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Цена продукта' })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Статус продукта',
    enum: ProductStatus,
    default: ProductStatus.REGULAR,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @ApiProperty({
    description: 'Изображение продукта',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: string;
}
