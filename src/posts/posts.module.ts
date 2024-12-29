import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { Post } from './post.entity';
import { UploadsModule } from 'src/uploads/uploads.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UploadsModule, MailModule, forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [jwtConfig.KEY],
      useFactory: (jwtConfig) => ({
        secret: jwtConfig.secret,
        signOptions: {
          audience: jwtConfig.audience,
          issuer: jwtConfig.issuer,
        },
      }),
    }),],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
