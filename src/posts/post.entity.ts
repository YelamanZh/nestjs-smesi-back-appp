import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from 'src/comments/comment.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string; // Название поста

  @Column({ type: 'text', nullable: false })
  content: string; // Содержимое поста

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Дата добавления поста

  @Column({ type: 'jsonb', nullable: true })
  images: string[]; // Ссылки на изображения (один или несколько)

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[]; // Комментарии, оставленные пользователями
}