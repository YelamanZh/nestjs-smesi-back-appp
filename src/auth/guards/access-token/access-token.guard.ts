import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic && !token) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Токен отсутствует.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );
      request[REQUEST_USER_KEY] = payload;

      const requiredRoles = this.reflector.get<userRole[]>(ROLES_KEY, context.getHandler());
      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        throw new ForbiddenException('У вас нет прав для доступа к этому ресурсу.');
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Неверный токен.');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}