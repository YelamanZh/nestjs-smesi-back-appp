import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comment.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Product } from 'src/categories/product.entity';
import { User } from 'src/users/user.entity';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto, activeUser: ActiveUserData) {
    const user = await this.usersRepository.findOneBy({ id: activeUser.sub });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    let post: Post | undefined;
    let product: Product | undefined;
  
    if (createCommentDto.postId) {
      post = await this.postRepository.findOneBy({ id: createCommentDto.postId });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
    }
  
    if (createCommentDto.productId) {
      product = await this.productsRepository.findOneBy({ id: createCommentDto.productId });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
    }
  
    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      user,
      post,
      product,
    });
  
    return this.commentsRepository.save(comment);
  }  

  // Method to fetch all comments
  async getAllComments(productId?: number, page = 1, limit = 10) {
    const queryBuilder = this.commentsRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.product', 'product')
      .leftJoinAndSelect('comment.user', 'user');

    if (productId) {
      queryBuilder.andWhere('comment.productId = :productId', { productId });
    }

    queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('comment.createdAt', 'DESC');

    const [comments, total] = await queryBuilder.getManyAndCount();

    return {
      data: comments,
      total,
      page,
      limit,
    };
  }

  async getCommentsForPost(postId: number, page = 1, limit = 10) {
    const queryBuilder = this.commentsRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.postId = :postId', { postId })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('comment.createdAt', 'DESC');
  
    const [comments, total] = await queryBuilder.getManyAndCount();
  
    return {
      data: comments,
      total,
      page,
      limit,
    };
  }
  
}
