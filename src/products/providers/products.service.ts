import { Injectable, Inject, forwardRef, NotFoundException, BadRequestException, } from '@nestjs/common';
import { CatalogService } from 'src/catalogs/providers/catalog.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/categories/product.entity';
import { Category } from 'src/categories/category.entity';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/dtos/update-product.dto';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @Inject(forwardRef(() => CatalogService))
    private readonly catalogService: CatalogService,
  ) {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category'] });
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException(`Категория с ID ${categoryId} не найдена`);
    }

    return this.productsRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async createProduct(
  createProductDto: CreateProductDto,
  file?: Express.Multer.File,
): Promise<Product> {
  const { categoryId, ...productData } = createProductDto;

  const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
  if (!category) {
    throw new NotFoundException(`Категория с ID ${categoryId} не найдена`);
  }

  let imageUrl: string | undefined;
  if (file) {
    imageUrl = await this.uploadImageToS3(file); // Загрузка изображения в S3
  }

  const product = this.productsRepository.create({
    ...productData,
    imageUrl,
    category,
  });

  return this.productsRepository.save(product);
}


  async update(id: number, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    const { categoryId, specifications, ...productData } = updateProductDto;
    const category = await this.categoriesRepository.findOne({ where: { id: categoryId } });
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    const imageUrl = file ? await this.uploadImageToS3(file) : product.imageUrl;

    Object.assign(product, {
      ...productData,
      specifications,
      imageUrl,
      category,
    });

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
    const params: AWS.S3.PutObjectRequest = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || 'your-default-bucket-name',
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
