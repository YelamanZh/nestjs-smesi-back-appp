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
import { Category } from 'src/categories/category.entity';
import { Comment } from 'src/comments/comment.entity';
import { ProductStatus } from 'src/categories/enums/productStatus.enum';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.REGULAR, // Убедитесь, что REGULAR определен в enum
  })
  status: ProductStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'jsonb', nullable: true })
  specifications?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[];
}
