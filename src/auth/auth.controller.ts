import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        /**
         * Injecting Auth Service
         */
        private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto)
    }

    //Refresh tokens
    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    @Auth(AuthType.None)
    public async refreshTokens(@Body() refreshTokensDto: RefreshTokenDto){
        return this.authService.refreshTokens(refreshTokensDto)
    }
}