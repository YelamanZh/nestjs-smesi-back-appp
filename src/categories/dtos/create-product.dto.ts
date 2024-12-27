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
  name: string; // Название продукта

  @ApiPropertyOptional({
    description: 'Описание продукта',
    example: 'Качественный цемент для строительства',
  })
  @IsString()
  description?: string; // Описание продукта

  @ApiProperty({ description: 'Есть ли в наличии', example: true })
  @IsBoolean()
  inStock: boolean; // В наличии или нет

  @ApiProperty({
    description: 'Статус продукта',
    example: 'новинка',
    enum: ['новинка', 'акция', 'рекомендуем', 'хит', 'обычный'],
  })
  @IsEnum(ProductStatus)
  status: ProductStatus; // Статус продукта

  @ApiProperty({ description: 'Цена продукта', example: 1500.5 })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Цена должна быть числом' })
  price: number; // Цена продукта

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
      strengthClass: 'М300',
      dryingTime: '24 часа',
      frostResistance: '50 циклов',
    },
  })
  @IsObject()
  specifications: Record<string, any>;
  @ApiProperty({ description: 'ID категории', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number; // ID категории

  @ApiProperty({
    description: 'Изображение продукта',
    type: 'string',
    format: 'binary',
  })
  file: any;

}
