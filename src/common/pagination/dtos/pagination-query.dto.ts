import { IsOptional, IsPositive } from 'class-validator';

import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Преобразование в число
  limit?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number) // Преобразование в число
  page?: number;
}