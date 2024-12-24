import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Repository, DataSource } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { PatchUserDto } from '../dtos/patch-user.dto';

/**
 * Controller class for '/users' API endpoint
 */
@Injectable()
export class UsersService {
  constructor(
    /*
     * Injecting user Repository
     */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    /**
     * Inject UsersCreateMany provider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    /**
     * Inject Datasource
     */
    private readonly dataSource: DataSource,

    /**
     * Inject createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * Inject findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * Inject findOneByGoogleIdProvier
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,

    /**
     * Inject createGoogleUserProvider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Public method responsible for handling GET request for '/users' endpoint
   */
  

public async findAll(
  getUseresParamDto: GetUsersParamDto,
  limit: number,
  page: number,
) {
  try {
    // Используем findAndCount для получения данных и общего количества записей
    const [users, total] = await this.usersRepository.findAndCount({
      take: limit, // Количество записей на одной странице
      skip: (page - 1) * limit, // Пропускаем записи на основе текущей страницы
      where: getUseresParamDto, // Фильтры из DTO, если они заданы
    });

    return {
      data: users,
      total, // Общее количество записей
      limit, // Лимит записей на странице
      page,  // Текущая страница
    };
  } catch (error) {
    // Обработка ошибок при выполнении запроса
    throw new RequestTimeoutException(
      'Unable to fetch users at the moment. Please try again later.',
    );
  }
}

  /**
   * Public method used to find one user using the ID of the user
   */

  public async findOneById(id: number) {
    let user = undefined;

    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the the datbase',
        },
      );
    }

    /**
     * Handle the user does not exist
     */
    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }

    return user;
  }

  public async createMany(createUsersDto: CreateUserDto[]) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }


  public async createGoogleUser(googleUser: GoogleUser){
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }

  async updateUser(patchUserDto: PatchUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: patchUserDto.id } });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    Object.assign(user, patchUserDto);

    return this.usersRepository.save(user);
  }
}
