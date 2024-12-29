import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { CatalogService } from './providers/catalog.service';
import { CreateCategoryDto } from 'src/categories/dtos/create-category.dto';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateCategoryDto } from 'src/categories/dtos/update-category.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({ summary: 'Создать новую категорию, только админ' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана.' })
  @Roles(userRole.ADMIN)
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.catalogService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Обновить категорию, только админ' })
  @ApiResponse({ status: 200, description: 'Категория успешно обновлена.' })
  @Roles(userRole.ADMIN)
  @Patch('categories/:id')
  updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.catalogService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Удалить категорию, только админ' })
  @ApiResponse({ status: 200, description: 'Категория успешно удалена.' })
  @Roles(userRole.ADMIN)
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: number) {
    return this.catalogService.deleteCategory(id);
  }

  @ApiOperation({ summary: 'Добавить новый продукт, только админ' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(userRole.ADMIN)
  @Post('products')
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.catalogService.createProduct(createProductDto, file);
  }

  @ApiOperation({ summary: 'Обновить продукт, только админ' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлён.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(userRole.ADMIN)
  @Patch('products/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.catalogService.updateProduct(id, updateProductDto, file);
  }

  @ApiOperation({ summary: 'Удалить продукт, только админ' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удалён.' })
  @Roles(userRole.ADMIN)
  @Delete('products/:id')
  deleteProduct(@Param('id') id: number) {
    return this.catalogService.deleteProduct(id);
  }
}
