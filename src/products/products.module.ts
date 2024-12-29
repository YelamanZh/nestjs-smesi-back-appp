import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './providers/products.service';
import { ProductsController } from './products.controller';
import { Product } from 'src/categories/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { CatalogModule } from '../catalogs/catalogs.module';
import { Category } from 'src/categories/category.entity'
import { UploadsModule } from 'src/uploads/uploads.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    UploadsModule,
    forwardRef(() => CategoriesModule),
    forwardRef(() => CatalogModule),
    forwardRef(() => AuthModule),
    JwtModule.register({}),
    MailModule,
    UsersModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [TypeOrmModule, ProductsService],
})
export class ProductsModule {}
