import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { User } from 'src/users/user.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async getByPost(postId: number): Promise<Comment[]> {
    const comments = await this.commentsRepository.find({
      where: { post: { id: postId } },
      relations: ['post'],
    });

    if (!comments.length) {
      throw new NotFoundException('Комментарии для данного поста не найдены.');
    }

    return comments;
  }

  async createForPost(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: Partial<User>,
  ): Promise<Comment> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    const newComment = this.commentsRepository.create({
      content: createCommentDto.content,
      username: user.email, // Имя пользователя
      post,
    });

    return this.commentsRepository.save(newComment);
  }
}