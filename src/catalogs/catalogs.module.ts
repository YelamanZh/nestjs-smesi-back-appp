import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/category.entity';
import { Product } from '../categories/product.entity';
import { CatalogService } from './providers/catalog.service';
import { CatalogController } from './catalog.controller';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    forwardRef(() => AuthModule), // Используем forwardRef для циклической зависимости
    forwardRef(() => ProductsModule), // Используем forwardRef для ProductsModule
    forwardRef(() => CategoriesModule), // Используем forwardRef для CategoriesModule
  ],
  providers: [CatalogService],
  exports: [CatalogService],
})

export class CatalogModule {}
