import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { userRole } from './enums/userRole.enum';
import { Post } from 'src/posts/post.entity';
import { Exclude } from 'class-transformer';
import { Comment } from 'src/comments/comment.entity';
// src/users/user.entity.ts
import { CartItem } from 'src/cart/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @Column({
    type: 'enum',
    enum: userRole,
    default: userRole.USER,
  })
  role: userRole;

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItems: CartItem[];
}
