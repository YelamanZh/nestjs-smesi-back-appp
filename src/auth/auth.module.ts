import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  imports: [
    ConfigModule.forFeature(jwtConfig),
    forwardRef(() => UsersModule),
    forwardRef(() => CategoriesModule),
    forwardRef(() => ProductsModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<number>('JWT_ACCESS_TOKEN_TTL')}s`,
          audience: configService.get<string>('JWT_TOKEN_AUDIENCE'),
          issuer: configService.get<string>('JWT_TOKEN_ISSUER'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SignInProvider,
    AccessTokenGuard,
    GenerateTokensProvider,
    RefreshTokensProvider,
    GoogleAuthenticationService,
  ],
  exports: [
    AuthService,
    HashingProvider,
    AccessTokenGuard,
    JwtModule,
  ],
})
export class AuthModule {}