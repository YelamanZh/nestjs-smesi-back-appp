import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './providers/products.service';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получить все продукты (доступно всем)' })
  @ApiResponse({ status: 200, description: 'Список продуктов' })
  @Public()
  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Создать продукт (только админ)' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан' })
  @Roles(userRole.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Обновить продукт (только админ)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлён' })
  @Roles(userRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Удалить продукт (только админ)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удалён' })
  @Roles(userRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @ApiOperation({ summary: 'Загрузить изображение для продукта' })
  @ApiResponse({ status: 201, description: 'Изображение успешно загружено' })
  @Post(':id/upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.uploadImage(id, file);
  }
}