import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/providers/categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { ProductsModule } from 'src/products/products.module';
import { CatalogModule } from 'src/catalogs/catalogs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    forwardRef(() => ProductsModule), // Correct forwardRef usage
    forwardRef(() => CatalogModule),
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
