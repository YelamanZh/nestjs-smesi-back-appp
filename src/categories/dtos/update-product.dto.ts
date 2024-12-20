import { PartialType } from '@nestjs/swagger';
import { CreateProductDto, ProductStatus } from './create-product.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  specifications?: string;

  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
}
