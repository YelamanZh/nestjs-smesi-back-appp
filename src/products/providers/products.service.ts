import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/categories/product.entity';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { Express } from 'express';
import { MailService } from 'src/mail/providers/mail.service';
import { UsersService } from 'src/users/providers/users.service';
import { GetUsersParamDto } from 'src/users/dtos/get-users-param.dto'
import { Category } from 'src/categories/category.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly uploadsService: UploadsService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(page: number, limit: number) {
    const [data, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['category'],
    });
    return { data, total };
  }

  async create(createProductDto: CreateProductDto, image?: Express.Multer.File) {
    let imageUrl: string | undefined;

    if (image) {
      const uploadResult = await this.uploadsService.uploadFile(image);
      imageUrl = uploadResult.path;
    }

   const category = await this.categoryRepository.findOne({
     where: { id: createProductDto.categoryId },
   });

   if (!category) {
     throw new NotFoundException(`Категория с ID ${createProductDto.categoryId} не найдена`);
   }

    const newProduct = this.productRepository.create({
      ...createProductDto,
      imageUrl,
      category
    });

    return this.productRepository.save(newProduct);
  }

  async update(id: number, updateProductDto: UpdateProductDto, image?: Express.Multer.File) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }

    if (image) {
      const uploadResult = await this.uploadsService.uploadFile(image);
      product.imageUrl = uploadResult.path;
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }

    return this.productRepository.remove(product);
  }
}
