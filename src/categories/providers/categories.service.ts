import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-categoty.dto';
import { ProductsService } from 'src/products/providers/products.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException('Категория не найдена');
    }

    // Удаляем связанные продукты
    await Promise.all(
      category.products.map((product) => this.productService.remove(product.id)),
    );

    await this.categoryRepository.remove(category);
  }
}