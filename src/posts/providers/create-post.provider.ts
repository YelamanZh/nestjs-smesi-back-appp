import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly tagsService: TagsService, // Если нужно для тегов
  ) {}

  public async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create({
      ...createPostDto,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException('Ошибка сохранения поста', {
        cause: error,
        description: 'Убедитесь, что все данные корректны.',
      });
    }
  }
}
