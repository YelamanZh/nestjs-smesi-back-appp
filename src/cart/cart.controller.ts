import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from 'src/cart/providers/cart.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';
import { AddToCartDto } from 'src/cart/dtos/add-to-cart.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Корзина')
@Controller('cart')
@Public()
@UseGuards(AccessTokenGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Получить корзину пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Корзина успешно получена.',
  })
  @Get()
  async getCart(@ActiveUser() user: ActiveUserData) {
    return this.cartService.getCart(user);
  }

  @ApiOperation({ summary: 'Добавить товар в корзину' })
  @ApiResponse({
    status: 201,
    description: 'Товар успешно добавлен в корзину.',
  })
  @Post()
  async addToCart(
    @ActiveUser() user: ActiveUserData,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(user, addToCartDto);
  }

  @ApiOperation({ summary: 'Удалить товар из корзины' })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно удален из корзины.',
  })
  @Delete(':id')
  async removeFromCart(
    @ActiveUser() user: ActiveUserData,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.removeFromCart(user, id);
  }
}
