import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Express } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { userRole } from 'src/users/enums/userRole.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Новости')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Получить все новости' })
  @ApiResponse({ status: 200, description: 'Список новостей успешно получен' })
  @Get()
  async getAllPosts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.postsService.getAllPosts(page, limit);
  }

  @ApiOperation({ summary: 'Получить новость по ID' })
  @ApiResponse({ status: 200, description: 'Новость успешно получена' })
  @ApiResponse({ status: 404, description: 'Новость не найдена' })
  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.getPostById(id);
  }

  @ApiOperation({ summary: 'Создать новость (только админ)' })
  @ApiConsumes('multipart/form-data')
  @Public()
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: { fileSize: 10 * 1024 * 1024 }, // Максимальный размер файла 10MB
      fileFilter: (req, file, callback) => {
        if (file.fieldname === 'previewImage' || file.fieldname === 'images') {
          callback(null, true); // Разрешаем файл
        } else {
          callback(new Error('Unexpected field'), false); // Отклоняем файл
        }
      },
    }),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const previewImage = files?.find((file) => file.fieldname === 'previewImage');
    const images = files?.filter((file) => file.fieldname === 'images') || [];
    return this.postsService.createPost(createPostDto, previewImage, images);
  }

  @ApiOperation({ summary: 'Обновить новость (только админ)' })
  @ApiConsumes('multipart/form-data')
  @Public()  
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (req, file, callback) => {
        if (file.fieldname === 'previewImage' || file.fieldname === 'images') {
          callback(null, true);
        } else {
          callback(new Error('Unexpected field'), false);
        }
      },
    }),
  )
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const previewImage = files?.find((file) => file.fieldname === 'previewImage');
    const images = files?.filter((file) => file.fieldname === 'images') || [];
    return this.postsService.updatePost(id, updatePostDto, previewImage, images);
  }

  @ApiOperation({ summary: 'Удалить новость (только админ)' })
  @Public()
  @Roles(userRole.ADMIN)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
