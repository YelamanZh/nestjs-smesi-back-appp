import { CreateCategoryDto } from 'src/categories/dtos/create-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
