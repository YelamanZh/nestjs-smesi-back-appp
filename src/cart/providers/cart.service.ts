import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../cart.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
  ) {}

  async addToCart(user: User, productId: number, quantity: number): Promise<CartItem> {
    let cartItem = await this.cartRepository.findOne({
      where: { user: { id: user.id }, productId },
    });

    if (!cartItem) {
      cartItem = this.cartRepository.create({ user, productId, quantity });
    } else {
      cartItem.quantity += quantity;
    }

    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(user: User, productId: number): Promise<void> {
    await this.cartRepository.delete({ user: { id: user.id }, productId });
  }

  async getCartItems(user: User): Promise<CartItem[]> {
    return this.cartRepository.find({
      where: { user: { id: user.id } },
      relations: ['user'], // Убедитесь, что связи настроены корректно
    });
  }
}