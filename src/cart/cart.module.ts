import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart.entity';
import { CartService } from './providers/cart.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}