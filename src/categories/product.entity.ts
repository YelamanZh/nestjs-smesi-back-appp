import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Comment } from 'src/comments/comment.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export enum ProductStatus {
  New = 'новинка',
  Promo = 'акция',
  Recommend = 'рекомендуем',
  Hit = 'хит',
  Regular = 'обычный',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.Regular,
  })
  status: ProductStatus;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @IsNotEmpty()
  price: number;

  @Column({ type: 'jsonb', nullable: true })
  specifications: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[];
}