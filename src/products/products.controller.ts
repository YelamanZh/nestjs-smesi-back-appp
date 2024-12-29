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
  @Public() // Доступно всем
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
  @Roles(userRole.ADMIN) // Только админ
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
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
  @Roles(userRole.ADMIN) // Только админ
  @UseGuards(AccessTokenGuard)
  @ApiBearerAuth()
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
  @Roles(userRole.ADMIN) // Только админ
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.delete(id);
    return { message: `Продукт с ID ${id} успешно удален` };
  }
}

