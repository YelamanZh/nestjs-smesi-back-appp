import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Product } from 'src/categories/product.entity';
import { Post } from 'src/posts/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.comments, { nullable: true, onDelete: 'CASCADE' })
  product?: Product;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: true, onDelete: 'CASCADE' })
  post?: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
