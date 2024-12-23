import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string; // Название категории

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string; // Описание категории
}