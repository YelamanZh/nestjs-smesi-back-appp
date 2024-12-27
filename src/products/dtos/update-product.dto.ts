import { PartialType } from '@nestjs/mapped-types';
import { ApiBody, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
import { ProductStatus } from 'src/categories/product.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({ description: 'Название продукта', example: 'Цемент' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Описание продукта', example: 'Качественный цемент' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Есть ли в наличии', example: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({
    description: 'Статус продукта',
    example: 'новинка',
    enum: ProductStatus,
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Цена продукта', example: 1500.5 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
  description: 'Характеристики продукта (JSON-объект)',
  example: {
    color: 'белый',
    waterproof: true,
    maxGrainSize: '2.5 мм',
    mixingRatio: '1:3',
    materialConsumption: '10 кг/м²',
    mobilityClass: 'М100',
    applicationTemperature: 'от +5 до +35',
    solutionViability: '2 часа',
    materialClass: 'Класс 1',
    effectiveActivity: '50 Бк/кг',
    adhesionStrength: '1.2 МПа',
    compressiveStrength: '30 МПа',
    strengthGrade: 'М300',
    dryingTime: '24 часа',
    frostResistance: '50 циклов',
  },
  type: 'object',
  additionalProperties: true, // Указание, что объект может иметь дополнительные свойства
})
@IsOptional()
@IsObject()
specifications?: Record<string, any>;


  @ApiPropertyOptional({ description: 'ID категории', example: 1 })
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional({
    description: 'Изображение продукта',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: any;
}
