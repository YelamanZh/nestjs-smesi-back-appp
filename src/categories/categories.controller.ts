import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from 'src/categories/providers/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получить все категории' })
  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Создать категорию' })
  @Public()
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Обновить категорию' })
  @Public()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiBearerAuth('JWT')
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
