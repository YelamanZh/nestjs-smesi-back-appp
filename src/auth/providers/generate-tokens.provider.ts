import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from '../inteface/active-user-data.interface';
type UserMinimal = Pick<User, 'id' | 'email' | 'role'>;

@Injectable()
export class GenerateTokensProvider {
  constructor(
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,

    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T extends Record<string, any>>(
    userId: number,
    expiresIn: number,
    payload?: T,
  ) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateTokens(user: UserMinimal): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      { secret: this.jwtConfiguration.secret, expiresIn: '15m' },
    );
  
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: this.jwtConfiguration.secret, expiresIn: '7d' },
    );
  
    return { accessToken, refreshToken };
  }
}
