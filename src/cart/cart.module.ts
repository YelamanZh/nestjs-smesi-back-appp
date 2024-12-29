import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartService } from './providers/cart.service';
import { CartItem } from './cart.entity';
import { Product } from 'src/categories/product.entity';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, User]), UsersModule, forwardRef(() => AuthModule),],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
