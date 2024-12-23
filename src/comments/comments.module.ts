import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './providers/comments.service';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { ProductsModule } from '../products/products.module';
import { Product } from 'src/categories/product.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, Product]), ProductsModule, PostsModule],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}