import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Посты')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Получить все посты (доступно всем)' })
  @ApiResponse({ status: 200, description: 'Список постов успешно получен' })
  @Public()
  @Get()
  getAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Создать новый пост (только админ)' })
  @ApiResponse({ status: 201, description: 'Пост успешно создан' })
  @Roles(userRole.ADMIN)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Обновить пост (только админ)' })
  @ApiResponse({ status: 200, description: 'Пост успешно обновлён' })
  @Roles(userRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Удалить пост (только админ)' })
  @ApiResponse({ status: 200, description: 'Пост успешно удалён' })
  @Roles(userRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}