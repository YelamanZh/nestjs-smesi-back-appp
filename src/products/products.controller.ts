import { ApiBody, ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseIntPipe, BadRequestException } from '@nestjs/common';
import { Controller, Get, Post, Patch, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from 'src/products/providers/products.service'
import { CreateProductDto } from 'src/categories/dtos/create-product.dto'
import { UpdateProductDto } from 'src/products/dtos/update-product.dto'
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получить все продукты (доступно всем)' }) @ApiResponse({ status: 200, description: 'Список продуктов' }) @Get() getAll() { return this.productsService.findAll(); }

  @ApiOperation({ summary: 'Создать продукт с изображением (только админ)' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Создание продукта с изображением',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Цемент' },
        description: { type: 'string', example: 'Качественный цемент' },
        inStock: { type: 'boolean', example: true },
        status: { type: 'string', enum: ['новинка', 'акция', 'рекомендуем', 'хит', 'обычный'] },
        price: { type: 'number', example: 1500.5 },
        specifications: {
          type: 'object',
          example: {
            color: 'белый',
            waterproof: true,
            maxGrainSize: '2.5 мм',
            mixingRatio: '1:3',
            materialConsumption: '10 кг/м²',
            mobilityClass: 'М100',
            applicationTemperature: 'от +5 до +35',
            solutionViability: '2 часа',
            materialClass: 'Класс 1',
            effectiveActivity: '50 Бк/кг',
            adhesionStrength: '1.2 МПа',
            compressiveStrength: '30 МПа',
            strengthGrade: 'М300',
            dryingTime: '24 часа',
            frostResistance: '50 циклов',
          },
        },
        categoryId: { type: 'number', example: 1 },
        file: { type: 'string', format: 'binary', description: 'Изображение продукта' },
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
     console.log('Received DTO:', JSON.stringify(createProductDto, null, 2))
    if (typeof createProductDto.specifications === 'string') {
      try {
        createProductDto.specifications = JSON.parse(createProductDto.specifications);
      } catch (error) {
        throw new BadRequestException('Invalid specifications format');
      }
    }

    return this.productsService.create(createProductDto, file);
  }

  @ApiOperation({ summary: 'Обновить продукт с изображением (только админ)' })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлён' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Обновление продукта с изображением',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Цемент' },
        description: { type: 'string', example: 'Качественный цемент' },
        inStock: { type: 'boolean', example: true },
        price: { type: 'number', example: 1200.5 },
        specifications: {
          type: 'object',
          example: {
            color: 'белый',
            waterproof: true,
            maxGrainSize: '2.5 мм',
            mixingRatio: '1:3',
            materialConsumption: '10 кг/м²',
            mobilityClass: 'М100',
            applicationTemperature: 'от +5 до +35',
            solutionViability: '2 часа',
            materialClass: 'Класс 1',
            effectiveActivity: '50 Бк/кг',
            adhesionStrength: '1.2 МПа',
            compressiveStrength: '30 МПа',
            strengthGrade: 'М300',
            dryingTime: '24 часа',
            frostResistance: '50 циклов',
          },
        },
        categoryId: { type: 'number', example: 2 },
        file: { type: 'string', format: 'binary', description: 'Новое изображение продукта' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Roles(userRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (typeof updateProductDto.specifications === 'string') {
      try {
        updateProductDto.specifications = JSON.parse(updateProductDto.specifications);
      } catch (error) {
        throw new BadRequestException('Invalid specifications format');
      }
    }

    return this.productsService.update(id, updateProductDto, file);
  }

  @ApiOperation({ summary: 'Удалить продукт (только админ)' }) @ApiResponse({ status: 200, description: 'Продукт успешно удалён' }) @Roles(userRole.ADMIN) @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.productsService.remove(id); }
}
