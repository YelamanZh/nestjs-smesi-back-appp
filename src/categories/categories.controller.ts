import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-categoty.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Категории')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получить все категории (доступно всем)' })
  @ApiResponse({ status: 200, description: 'Список категорий' })
  @Public()
  @Get()
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Создать категорию (только админ)' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана' })
  @Roles(userRole.ADMIN)
  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Обновить категорию (только админ)' })
  @ApiResponse({ status: 200, description: 'Категория успешно обновлена' })
  @Roles(userRole.ADMIN)
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Удалить категорию (только админ)' })
  @ApiResponse({ status: 200, description: 'Категория успешно удалена' })
  @Roles(userRole.ADMIN)
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}