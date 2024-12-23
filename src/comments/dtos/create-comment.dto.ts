import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  content: string; // Текст комментария

  @IsOptional()
  productId?: number; // ID продукта (если комментарий к продукту)

  @IsOptional()
  postId?: number; // ID поста (если комментарий к посту)

  @IsOptional()
  parentCommentId?: number; // ID родительского комментария (для вложенных комментариев)
}