import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './providers/products.service';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('Продукты')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Получить все продукты (доступно всем)' })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов успешно получен.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Цемент',
          imageUrl: 'https://example.com/image.jpg',
          description: 'Качественный цемент',
          inStock: true,
          status: 'новинка',
          price: 1000.9,
          category: {
            id: 1,
            name: 'Стройматериалы',
            description: null,
          },
        },
      ],
    },
  })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: string = '1',
    @Query('limit', ParseIntPipe) limit: string = '10',
  ) {
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    throw new BadRequestException('Page and limit must be numeric values');
  }

  return this.productsService.findAll(pageNumber, limitNumber);
  }

  @ApiOperation({ summary: 'Создать продукт с изображением (только админ)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Продукт успешно создан.',
    schema: {
      example: {
        id: 1,
        name: 'Цемент',
        imageUrl: 'https://example.com/image.jpg',
        description: 'Качественный цемент',
        inStock: true,
        status: 'новинка',
        price: 1000.9,
        category: {
          id: 1,
          name: 'Стройматериалы',
          description: null,
        },
      },
    },
  })
  @Roles(userRole.ADMIN)
  @Public()
  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, image);
  }

  @ApiOperation({ summary: 'Обновить продукт с изображением (только админ)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Продукт успешно обновлен.',
    schema: {
      example: {
        id: 1,
        name: 'Цемент',
        imageUrl: 'https://example.com/new-image.jpg',
        description: 'Обновленный цемент',
        inStock: true,
        status: 'акция',
        price: 1200.0,
        category: {
          id: 1,
          name: 'Стройматериалы',
          description: null,
        },
      },
    },
  })
  @Public()
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, image);
  }

  @ApiOperation({ summary: 'Удалить продукт (только админ)' })
  @ApiResponse({
    status: 204,
    description: 'Продукт успешно удален.',
  })
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Public()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id);
    return { message: `Продукт с ID ${id} успешно удален` };
  }
}
