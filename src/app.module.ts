import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Importing Entities
 */
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import enviromentValidation from './config/enviroment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuardTsGuard } from './auth/guards/authentication.guard.ts/authentication.guard.ts.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { UploadsModule } from './uploads/uploads.module';
import { MailModule } from './mail/mail.module';
import { CatalogModule } from './catalogs/catalogs.module';
import { Product } from './categories/product.entity';
import { Comment } from './comments/comment.entity';
import { CommentsModule } from './comments/comments.module';


const ENV = process.env.NODE_ENV;

@Module({
  imports: [UsersModule,
    CommentsModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: enviromentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [
          User,
          Product,
          Comment, // Добавляем сущность Comment
          // Другие сущности...
        ],
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        database: configService.get('database.name'),
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    UploadsModule,
    MailModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers:
    [
      AppService,
      {
        provide: APP_GUARD,
        useClass: AuthenticationGuardTsGuard,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: DataResponseInterceptor,
      },
      AccessTokenGuard,
    ],
})
export class AppModule { }
