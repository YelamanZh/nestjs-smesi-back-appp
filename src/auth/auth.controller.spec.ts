import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValue({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockJwtToken'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mockValue'),
  };

  const mockAccessTokenGuard = {
    canActivate: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    })
      .overrideGuard(AccessTokenGuard)
      .useValue(mockAccessTokenGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should call signIn and return tokens', async () => {
    const result = await controller.signIn({ email: 'test', password: '1234' });
    expect(authService.signIn).toHaveBeenCalledWith({ email: 'test', password: '1234' });
    expect(result).toEqual({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    });
  });
});