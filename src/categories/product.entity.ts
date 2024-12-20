import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 96, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  imageUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'text', nullable: true })
  specifications: string;

  @Column({
    type: 'enum',
    enum: ['новинка', 'акция', 'рекомендуем', 'хит', 'обычный'],
    default: 'обычный',
  })
  status: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];
}
