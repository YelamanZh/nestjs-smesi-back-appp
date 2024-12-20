import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/category.entity';
import { Product } from 'src/categories/product.entity';
import { CatalogService } from './providers/catalog.service';
import { CatalogController } from './catalog.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product]),
    AuthModule, // Добавляем AuthModule
    ConfigModule
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
