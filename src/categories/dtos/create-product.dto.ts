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

  @ApiProperty({ description: 'Цена продукта', example: 1500.5 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Характеристики продукта',
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
  file: any;
}
