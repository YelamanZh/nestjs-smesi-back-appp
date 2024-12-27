import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './providers/products.service';
import { ProductsController } from './products.controller';
import { Product } from 'src/categories/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { CatalogModule } from '../catalogs/catalogs.module';
import { Category } from 'src/categories/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => CatalogModule),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
