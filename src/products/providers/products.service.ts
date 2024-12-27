import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/categories/product.entity';
import { Category } from 'src/categories/category.entity';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable() export class ProductsService { private s3: AWS.S3; constructor( @InjectRepository(Product) private readonly productsRepository: Repository<Product>, @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>, ) { this.s3 = new AWS.S3({ region: process.env.AWS_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, }); } async findAll(): Promise<Product[]> { return this.productsRepository.find({ relations: ['category'] }); } async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> { const { categoryId, specifications, ...productData } = createProductDto; let parsedSpecifications: Record<string, unknown> = {}; if (specifications) { if (typeof specifications === 'string') { try { parsedSpecifications = JSON.parse(specifications); } catch { throw new BadRequestException('Invalid specifications format'); } } else { parsedSpecifications = specifications; } } const category = await this.categoriesRepository.findOne({ where: { id: categoryId } }); if (!category) { throw new NotFoundException('Категория не найдена'); } const imageUrl = await this.uploadImageToS3(file); const product = this.productsRepository.create({ ...productData, specifications: parsedSpecifications, imageUrl, category, });
    return this.productsRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const { categoryId, specifications, ...productData } = updateProductDto;

    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    if (categoryId) {
      const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }
      product.category = category;
    }

    let parsedSpecifications: Record<string, unknown> = {};
    if (specifications) {
      if (typeof specifications === 'string') {
        try {
          parsedSpecifications = JSON.parse(specifications);
        } catch {
          throw new BadRequestException('Invalid specifications format');
        }
      } else {
        parsedSpecifications = specifications;
      }
    }

    product.specifications = parsedSpecifications || {};

    if (file) {
      product.imageUrl = await this.uploadImageToS3(file);
    }

    Object.assign(product, productData);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    await this.productsRepository.remove(product);
  }

  private async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;

    if (!bucketName) {
      throw new Error('Имя S3 bucket не указано в переменных окружения');
    }

    const key = `products/${uuidv4()}${path.extname(file.originalname)}`;

    try {
      await this.s3
        .upload({
          Bucket: bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      throw new Error(`Ошибка загрузки файла: ${error.message}`);
    }
  }
}
