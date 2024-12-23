// src/auth/providers/auth.service.ts
import { Injectable } from '@nestjs/common';
import { SignInProvider } from './sign-in.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ActiveUserData } from '../inteface/active-user-data.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInProvider: SignInProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  @ApiOperation({ summary: 'Войти в систему' })
  public async signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }

  @ApiOperation({ summary: 'Обновить токены' })
  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }

  @ApiOperation({ summary: 'Выйти из системы' })
  @ApiResponse({ status: 200, description: 'Выход успешно выполнен' })
  public async logout(user: ActiveUserData) {
    // Здесь вы можете добавить логику добавления токена в черный список
    // или обновления записи в базе, если вы используете Refresh Tokens.
    return {
      message: `Пользователь с ID ${user.sub} успешно вышел из системы`,
    };
  }
}