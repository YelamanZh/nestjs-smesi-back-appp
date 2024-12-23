import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './providers/products.service';
import { CreateProductDto } from 'src/categories/dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProductsService = {
    findAll: jest.fn(() => [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ]),
    create: jest.fn((dto: CreateProductDto) => ({
      id: 1,
      ...dto,
    })),
    update: jest.fn((id: number, dto: UpdateProductDto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id: number) => ({ id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('должен быть определён', () => {
    expect(controller).toBeDefined();
  });

  it('должен возвращать список продуктов', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('должен создавать продукт (только админ)', async () => {
    const dto: CreateProductDto = {
      name: 'Test Product',
      price: 1000,
      inStock: true,
      status: 'новинка',
      specifications: {},
      categoryId: 1, // Добавьте это поле
    };    
    const result = await controller.create(dto);
    expect(result).toEqual({ id: 1, ...dto });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('должен обновлять продукт (только админ)', async () => {
    const dto: UpdateProductDto = { name: 'Updated Product' };
    const result = await controller.update(1, dto);
    expect(result).toEqual({ id: 1, name: 'Updated Product' });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('должен удалять продукт (только админ)', async () => {
    const result = await controller.remove(1);
    expect(result).toEqual({ id: 1 });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});