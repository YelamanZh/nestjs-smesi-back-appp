import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ProductStatus } from '../product.entity';

export class CreateProductDto {
  @ApiProperty({ description: 'Название продукта', example: 'Цемент' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Описание продукта',
    example: 'Качественный цемент для строительства',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Есть ли в наличии', example: true })
  @IsNotEmpty()
  @IsBoolean()
  inStock: boolean;

  @ApiProperty({
    description: 'Статус продукта',
    example: 'новинка',
    enum: ProductStatus,
  })
  @IsNotEmpty()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiPropertyOptional({
    description: 'Характеристики продукта (JSON-объект)',
    type: 'object',
    properties: {
      color: { type: 'string', example: 'белый' },
      waterproof: { type: 'boolean', example: true },
      maxGrainSize: { type: 'string', example: '2.5 мм' },
      mixingRatio: { type: 'string', example: '1:3' },
      materialConsumption: { type: 'string', example: '10 кг/м²' },
      mobilityClass: { type: 'string', example: 'М100' },
      applicationTemperature: { type: 'string', example: 'от +5 до +35' },
      solutionViability: { type: 'string', example: '2 часа' },
      materialClass: { type: 'string', example: 'Класс 1' },
      effectiveActivity: { type: 'string', example: '50 Бк/кг' },
      adhesionStrength: { type: 'string', example: '1.2 МПа' },
      compressiveStrength: { type: 'string', example: '30 МПа' },
      strengthGrade: { type: 'string', example: 'М300' },
      dryingTime: { type: 'string', example: '24 часа' },
      frostResistance: { type: 'string', example: '50 циклов' },
    },
    additionalProperties: true,
  })
  @IsOptional()
  @IsObject()
  specifications?: Record<string, any>;

  @ApiProperty({ description: 'ID категории', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Изображение продукта',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file?: Express.Multer.File;
}
