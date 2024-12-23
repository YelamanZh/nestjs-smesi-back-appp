// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './providers/auth.service';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

describe('AuthService', () => {
  let service: AuthService;

  const mockSignInProvider = {
    signIn: jest.fn(),
  };

  const mockRefreshTokensProvider = {
    generateRefreshToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: SignInProvider,
          useValue: mockSignInProvider,
        },
        {
          provide: RefreshTokensProvider,
          useValue: mockRefreshTokensProvider,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});