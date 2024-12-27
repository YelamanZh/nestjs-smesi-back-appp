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
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './providers/products.service';
import { CreateProductDto } from '../categories/dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBody, ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';

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

  @ApiOperation({ summary: 'Создать продукт с изображением (только админ)' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Создание продукта с изображением',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Цемент' },
        description: { type: 'string', example: 'Качественный цемент для строительства' },
        inStock: { type: 'boolean', example: true },
        status: { type: 'string', example: 'новинка' },
        price: { type: 'number', example: 1500.5 },
        specifications: {
          type: 'object',
          example: {
            color: 'белый',
            dryingTime: '24 часа',
            applicationTemperature: 'от +5 до +35',
          },
        },
        categoryId: { type: 'number', example: 1 },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Изображение продукта',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Roles(userRole.ADMIN)
  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Проверка и преобразование specifications
    if (typeof createProductDto.specifications === 'string') {
      try {
        createProductDto.specifications = JSON.parse(createProductDto.specifications);
      } catch (error) {
        throw new BadRequestException('Invalid specifications format');
      }
    }

    return this.productsService.create(createProductDto, file);
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
}
