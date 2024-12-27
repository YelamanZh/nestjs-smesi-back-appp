import { Injectable, Inject, forwardRef, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from 'src/products/providers/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { Product } from 'src/categories/product.entity';
import { CreateCategoryDto } from 'src/categories/dtos/create-category.dto';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import { UpdateCategoryDto } from 'src/categories/dtos/update-categoty.dto';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatalogService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  // Создание категории
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Обновление категории
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Удаление категории
  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    await this.categoryRepository.remove(category);
  }

  // Создание продукта
  async createProduct(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const { categoryId, specifications, ...productData } = createProductDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    let parsedSpecifications: Record<string, any> | undefined;
    if (specifications && typeof specifications === 'string') {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        throw new BadRequestException('Неверный формат спецификаций');
      }
    }

    const imageUrl = await this.uploadImageToS3(file);

    const product = this.productRepository.create({
      ...productData,
      specifications: parsedSpecifications,
      imageUrl,
      category,
    });

    return this.productRepository.save(product);
  }

  // Обновление продукта
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const { categoryId, specifications, ...productData } = updateProductDto;

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    if (categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
      if (!category) {
        throw new NotFoundException('Категория не найдена');
      }
      product.category = category;
    }

    let parsedSpecifications: Record<string, any> | undefined;
    if (specifications && typeof specifications === 'string') {
      try {
        parsedSpecifications = JSON.parse(specifications);
      } catch (error) {
        throw new BadRequestException('Неверный формат спецификаций');
      }
    } else if (specifications) {
      parsedSpecifications = specifications;
    }

    if (file) {
      product.imageUrl = await this.uploadImageToS3(file);
    }

    Object.assign(product, productData);
    product.specifications = parsedSpecifications as Record<string, unknown>;

    return this.productRepository.save(product);
  }

  // Удаление продукта
  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    await this.productRepository.remove(product);
  }

  // Загрузка изображения в S3
  private async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;

    if (!bucketName) {
      throw new Error('S3 Bucket name not defined in environment variables');
    }

    const key = `products/${uuidv4()}${path.extname(file.originalname)}`;

    const { Location } = await this.s3
      .upload({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    return Location;
  }
}
