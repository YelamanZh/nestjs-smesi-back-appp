import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './providers/auth.service';
import { SignInProvider } from './providers/sign-in.provider';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { HashingProvider } from './providers/hashing.provider';
import { UsersService } from '../users/providers/users.service';

describe('AuthModule', () => {
  let module: TestingModule;

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mockValue'),
  };

  const mockUsersService = {
    findOneByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  const mockSignInProvider = {
    signIn: jest.fn(),
  };

  const mockGenerateTokensProvider = {
    generateTokens: jest.fn(),
  };

  const mockHashingProvider = {
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();    
  });

  it('should compile the module without errors', () => {
    expect(module).toBeDefined();
  });

  it('should provide AuthService', () => {
    const authService = module.get<AuthService>(AuthService);
    expect(authService).toBeDefined();
  });

  it('should provide SignInProvider', () => {
    const signInProvider = module.get<SignInProvider>(SignInProvider);
    expect(signInProvider).toBeDefined();
  });

  it('should provide JwtService', () => {
    const jwtService = module.get<JwtService>(JwtService);
    expect(jwtService).toBeDefined();
  });

  it('should provide ConfigService', () => {
    const configService = module.get<ConfigService>(ConfigService);
    expect(configService).toBeDefined();
  });

  it('should provide UsersService', () => {
    const usersService = module.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });

  it('should provide GenerateTokensProvider', () => {
    const generateTokensProvider = module.get<GenerateTokensProvider>(
      GenerateTokensProvider,
    );
    expect(generateTokensProvider).toBeDefined();
  });

  it('should provide HashingProvider', () => {
    const hashingProvider = module.get<HashingProvider>(HashingProvider);
    expect(hashingProvider).toBeDefined();
  });
});