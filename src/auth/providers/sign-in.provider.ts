import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../inteface/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {

    constructor(
        /**
         * Inject usersService
         */
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,

        /**
         * Iject hashingProvider
         */
        private readonly hashingProvider: HashingProvider,

        /**
         * Inject jwtService
         */
        private readonly jwtService: JwtService,

        /**
         * Inject jwtConfiguration
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        /**
         * Inject generateTokenProvider
         */
        private readonly generateTokenProvider : GenerateTokensProvider,


    ) { }

    public async signIn(signInDto: SignInDto) {
        //Find the user using email ID
        //Throw an exception user not found
        let user = await this.usersService.findOneByEmail(signInDto.email)

        //Compare password to the hash
        let isEqual: boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(
                signInDto.password,
                user.password,
            )
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: 'Could not compare passwords'
            })
        }

        if (!isEqual) {
            throw new UnauthorizedException('Incorrect Password')
        }

        return await this.generateTokenProvider.generateTokens(user)
    }
}
