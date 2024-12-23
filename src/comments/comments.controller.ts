import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { userRole } from 'src/users/enums/userRole.enum';


@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Получить комментарии к посту (доступно всем)' })
  @ApiResponse({ status: 200, description: 'Список комментариев успешно получен.' })
  @Public()
  @Get('post/:postId')
  async getCommentsByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getByPost(postId);
  }

  @ApiOperation({
    summary: 'Создать комментарий к посту (только авторизованные пользователи)',
  })
  @ApiResponse({ status: 201, description: 'Комментарий успешно создан.' })
  @Post('post/:postId')
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    const minimalUser = {
      id: user.sub,
      email: user.email,
      role: user.role as userRole,
    };

    return this.commentsService.createForPost(postId, createCommentDto, minimalUser);
  }
}