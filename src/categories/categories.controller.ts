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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';

@ApiTags('Категории')
@ApiBearerAuth() // Добавляет информацию о Bearer Token в Swagger
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Получить все категории' })
  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @ApiOperation({ summary: 'Создать категорию' })
  @UseGuards(AccessTokenGuard)
  @Roles(userRole.ADMIN) // Только для админов
  @ApiBearerAuth()
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Обновить категорию' })
  @UseGuards(AccessTokenGuard)
  @Roles(userRole.ADMIN) // Только для админов
  @ApiBearerAuth()
  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Удалить категорию' })
  @UseGuards(AccessTokenGuard)
  @Roles(userRole.ADMIN) // Только для админов
  @ApiBearerAuth()
  @Delete(':id')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
