import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Product } from 'src/categories/product.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string; // Содержание комментария

  @Column({ type: 'varchar', length: 96, nullable: false })
  username: string; // Имя пользователя

  @CreateDateColumn()
  createdAt: Date; // Дата добавления комментария

  @ManyToOne(() => Product, (product) => product.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  product: Product; // Связь с продуктом

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  post: Post; // Связь с постом

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;
}
