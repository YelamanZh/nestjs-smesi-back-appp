import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/post.entity';
import { CreateCommentDto } from 'src/comments/dtos/create-comment.dto';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { User } from 'src/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createCommentForPost(
    postId: number,
    createCommentDto: CreateCommentDto,
    user: ActiveUserData,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Новость с ID ${postId} не найдена`);
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      user: { id: user.sub }, // User is linked via its ID
      post,
    });

    return this.commentRepository.save(comment);
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Новость с ID ${postId} не найдена`);
    }

    return this.commentRepository.find({
      where: { post },
      relations: ['user'], // Load user who made the comment
      order: { createdAt: 'DESC' },
    });
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Комментарий с ID ${id} не найден`);
    }

    await this.commentRepository.remove(comment);
  }
}
