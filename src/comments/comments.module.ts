import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './providers/comments.service';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { Product } from 'src/categories/product.entity';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Product, Post, User]), JwtModule.register({}), ConfigModule, AuthModule,],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [TypeOrmModule, CommentsService]
})
export class CommentsModule {}
