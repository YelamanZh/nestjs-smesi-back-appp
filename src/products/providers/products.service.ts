import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/categories/product.entity';
import { Category } from 'src/categories/category.entity';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { Multer } from 'multer';
import * as AWS from 'aws-sdk';


@Injectable()
export class ProductsService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({ relations: ['category', 'comments'] });
  }

  async uploadImage(id: number, file: Express.Multer.File): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    const bucketName = process.env.AWS_PUBLIC_BUCKET_NAME;
    const key = `products/${id}/${file.originalname}`;

    try {
      await this.s3
        .upload({
          Bucket: bucketName!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      product.imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      return this.productsRepository.save(product);
    } catch (error) {
      throw new Error(`Ошибка загрузки файла: ${error.message}`);
    }
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoriesRepository.findOne({ where: { id: categoryId } }); if (!category) { throw new NotFoundException('Категория не найдена'); }
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    const { categoryId, ...productData } = updateProductDto;
    if (categoryId) { const category = await this.categoriesRepository.findOne({ where: { id: categoryId } }); if (!category) { throw new NotFoundException('Категория не найдена'); } product.category = category; }

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
}
