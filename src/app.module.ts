import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';
import { CatalogModule } from 'src/catalogs/catalogs.module';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { Product } from 'src/categories/product.entity';
import { Category } from 'src/categories/category.entity';
import { Post } from 'src/posts/post.entity';
import { CartItem } from 'src/cart/cart.entity'; // Add this import
import { Upload } from 'src/uploads/uploads.entity'; // Add this import

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Disable in production
        entities: [Product, Category, Comment, Post, User, CartItem, Upload],
        logging: true,
      }),
    }),
    CategoriesModule,
    ProductsModule,
    CatalogModule,
    forwardRef(() => AuthModule), // Используем forwardRef
  ],
})
export class AppModule {}
