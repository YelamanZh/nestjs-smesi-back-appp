import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './providers/comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './comment.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/categories/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Product]),
    ProductsModule, // Import ProductsModule
    AuthModule,
    PostsModule
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
