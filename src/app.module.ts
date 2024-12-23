import { Module } from '@nestjs/common';
import { Product } from './categories/product.entity';
import { MailModule } from './mail/mail.module';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { Comment } from './comments/comment.entity';
import { Post } from './posts/post.entity';
import { CartItem } from './cart/cart.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    UsersModule,
    CommentsModule,
    CartModule,
    PostsModule,
    AuthModule,
    MailModule, // Убедитесь, что MailModule здесь
    ConfigModule.forRoot({ isGlobal: true, 
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
        entities: [User, CartItem, Product, Post, Comment],
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        autoLoadEntities: configService.get<boolean>('DATABASE_AUTOLOAD'),
        logging: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
