import { Controller, Post, Body, UseGuards, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { userRole } from 'src/users/enums/userRole.enum';
import { CatalogService } from './providers/catalog.service';
import { CreateCategoryDto } from 'src/categories/dtos/create-category.dto';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateCategoryDto } from 'src/categories/dtos/update-categoty.dto';
import { UpdateProductDto } from 'src/categories/dtos/update-product.dto';

@ApiTags('Catalog')
@Controller('catalog')
@UseGuards(AccessTokenGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'Category created successfully.' })
  @Roles(userRole.ADMIN)
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.catalogService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully.' })
  @Roles(userRole.ADMIN)
  @Patch('categories/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.catalogService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully.' })
  @Roles(userRole.ADMIN)
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: number) {
    return this.catalogService.deleteCategory(id);
  }

  @ApiOperation({ summary: 'Add a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @Roles(userRole.ADMIN)
  @Post('products')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.catalogService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @Roles(userRole.ADMIN)
  @Patch('products/:id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.catalogService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @Roles(userRole.ADMIN)
  @Delete('products/:id')
  deleteProduct(@Param('id') id: number) {
    return this.catalogService.deleteProduct(id);
  }
}