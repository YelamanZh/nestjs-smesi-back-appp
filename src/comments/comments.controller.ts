import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from 'src/comments/providers/comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator'

@ApiTags('Комментарии')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Добавить комментарий к новости' })
  @ApiResponse({ status: 201, description: 'Комментарий успешно создан.' })
  @ApiBearerAuth() // Specifies that this endpoint requires authentication
  @UseGuards(AccessTokenGuard)
  @Post('post/:postId')
  @HttpCode(HttpStatus.CREATED)
  async addCommentToPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() createCommentDto: CreateCommentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.commentsService.createCommentForPost(postId, createCommentDto, user);
  }

  @ApiOperation({ summary: 'Получить комментарии для поста' })
  @ApiResponse({ status: 200, description: 'Комментарии успешно получены.' })
  @Get('post/:postId')
  async getCommentsByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getCommentsByPost(postId);
  }

  @ApiOperation({ summary: 'Удалить комментарий (только админ)' })
  @ApiResponse({ status: 204, description: 'Комментарий успешно удален.' })
  @ApiBearerAuth()
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.deleteComment(id);
  }
}
