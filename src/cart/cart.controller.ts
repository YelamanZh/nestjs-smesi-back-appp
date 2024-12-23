import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { CartService } from './providers/cart.service';
import { User } from 'src/users/user.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body('user') user: User,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ) {
    return this.cartService.addToCart(user, productId, quantity);
  }

  @Delete('remove/:productId')
  async removeFromCart(
    @Param('user') user: User,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeFromCart(user, productId);
  }

  @Get('items')
  async getCartItems(@Body('user') user: User) {
    return this.cartService.getCartItems(user);
  }
}