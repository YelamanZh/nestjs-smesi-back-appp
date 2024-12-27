import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  ) {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }
    await this.categoryRepository.remove(category);
  }

async createProduct(
  createProductDto: CreateProductDto,
  file: Express.Multer.File,
): Promise<Product> {
  const { categoryId, specifications, ...productData } = createProductDto;

  // Обработка specifications
  let parsedSpecifications: Record<string, any> | undefined;
  if (specifications && typeof specifications === 'string') {
    try {
      parsedSpecifications = JSON.parse(specifications);
    } catch (error) {
      throw new BadRequestException('Invalid specifications format');
    }
  } else if (specifications && typeof specifications === 'object') {
    parsedSpecifications = specifications as Record<string, any>;
  }

  const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
  if (!category) {
    throw new NotFoundException('Category not found');
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

async updateProduct(
  id: number,
  updateProductDto: UpdateProductDto,
  file?: Express.Multer.File,
): Promise<Product> {
  const { categoryId, specifications, ...productData } = updateProductDto;

  const product = await this.productRepository.findOne({ where: { id } });
  if (!product) {
    throw new NotFoundException('Product not found');
  }

  if (categoryId) {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    product.category = category;
  }

  let parsedSpecifications: Record<string, any> | undefined;
  if (specifications && typeof specifications === 'string') {
    try {
      parsedSpecifications = JSON.parse(specifications);
    } catch (error) {
      throw new BadRequestException('Invalid specifications format');
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

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    await this.productRepository.remove(product);
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
