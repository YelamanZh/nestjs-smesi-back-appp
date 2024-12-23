import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './providers/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-categoty.dto';
import { userRole } from 'src/users/enums/userRole.enum';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {
    findAll: jest.fn(() => [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]),
    create: jest.fn((dto: CreateCategoryDto) => ({
      id: 1,
      ...dto,
    })),
    update: jest.fn((id: number, dto: UpdateCategoryDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  it('должен возвращать список категорий', async () => {
    const result = await controller.getAllCategories();
    expect(result).toEqual([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('должен создавать категорию (только админ)', async () => {
    const dto: CreateCategoryDto = { name: 'New Category' };
    const result = await controller.createCategory(dto);
    expect(result).toEqual({ id: 1, name: 'New Category' });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('должен обновлять категорию (только админ)', async () => {
    const dto: UpdateCategoryDto = { name: 'Updated Category' };
    const result = await controller.updateCategory(1, dto);
    expect(result).toEqual({ id: 1, name: 'Updated Category' });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('должен удалять категорию (только админ)', async () => {
    const result = await controller.deleteCategory(1);
    expect(result).toEqual({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});