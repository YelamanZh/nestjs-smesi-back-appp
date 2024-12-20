import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { User } from 'src/users/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';

@ApiTags('Comments')
@Controller('comments')
@UseGuards(AccessTokenGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.commentsService.createComment(createCommentDto, user);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'List of all comments.' })
  @Get()
  async getAllComments(
    @Query('productId') productId?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.commentsService.getAllComments(productId, page, limit);
  }

  @ApiOperation({ summary: 'Get comments for a specific post' })
  @ApiResponse({ status: 200, description: 'List of comments for the post.' })
  @Get('post/:postId')
  async getCommentsForPost(
    @Param('postId') postId: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.commentsService.getCommentsForPost(postId, page, limit);
  }
}
