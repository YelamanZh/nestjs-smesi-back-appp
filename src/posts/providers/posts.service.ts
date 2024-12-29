import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { MailService } from 'src/mail/providers/mail.service';
import { UsersService } from 'src/users/providers/users.service';
import { Express } from 'express';
import { User } from 'src/users/user.entity'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly uploadsService: UploadsService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
  ) {}

  async getAllPosts(page: number, limit: number) {
    const [posts, total] = await this.postRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['comments', 'comments.user'],
    });
    return { posts, total };
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['comments', 'comments.user'], });
    if (!post) throw new NotFoundException(`Новость с ID ${id} не найдена`);
    return post;
  }

  async createPost(
    createPostDto: CreatePostDto,
    previewImage?: Express.Multer.File,
    images: Express.Multer.File[] = [],
  ) {
    const previewImageUrl = previewImage
      ? (await this.uploadsService.uploadFile(previewImage)).path
      : undefined;
    const imageUrls = await Promise.all(
      images.map(async (image) => (await this.uploadsService.uploadFile(image)).path),
    );

    const post = this.postRepository.create({
      ...createPostDto,
      previewImage: previewImageUrl,
      images: imageUrls,
    });
    const { data: users } = await this.usersService.findAll({}, 1000, 1);

    for (const user of users) {
      await this.mailService.sendNewsUpdateNotification(user, post.title);
    }

    return this.postRepository.save(post);
  }

  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    previewImage?: Express.Multer.File,
    images: Express.Multer.File[] = [],
  ) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Новость с ID ${id} не найдена`);

    const previewImageUrl = previewImage
      ? (await this.uploadsService.uploadFile(previewImage)).path
      : post.previewImage;

    const imageUrls = images.length
      ? await Promise.all(
          images.map(async (image) => (await this.uploadsService.uploadFile(image)).path),
        )
      : post.images;

    Object.assign(post, {
      ...updatePostDto,
      previewImage: previewImageUrl,
      images: imageUrls,
    });

    return this.postRepository.save(post);
  }

  async deletePost(id: number) {
    const post = await this.getPostById(id);
    return this.postRepository.remove(post);
  }
}
