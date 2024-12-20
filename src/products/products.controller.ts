import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './providers/products.service';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/categories/dtos/update-product.dto';
import { Product } from 'src/categories/product.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { userRole } from '../users/enums/userRole.enum';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create a new product (admin only)' })
  @ApiResponse({ status: 201, description: 'Product created successfully', type: Product })
  @Roles(userRole.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Update a product (admin only)' })
  @ApiResponse({ status: 200, description: 'Product updated successfully', type: Product })
  @Roles(userRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product (admin only)' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @Roles(userRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products', type: [Product] })
  @Roles(userRole.ADMIN)
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product details', type: Product })
  @Roles(userRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findById(id);
  }
}