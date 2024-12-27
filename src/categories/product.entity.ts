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
  imageUrl?: string; // Ссылка на изображение в S3

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: true })
  inStock: boolean;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.Regular,
  })
  status: ProductStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'jsonb', nullable: true })
  specifications: {
    color?: string;
    waterResistance?: string;
    maxGrainSize?: string;
    mixingRatio?: string;
    materialConsumption?: string;
    mobilityGrade?: string;
    applicationTemperature?: string;
    solutionLife?: string;
    materialClass?: string;
    activityErn?: string;
    adhesionStrength?: string;
    compressiveStrength?: string;
    strengthGrade?: string;
    dryingTime?: string;
    frostResistance?: string;
  };

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
