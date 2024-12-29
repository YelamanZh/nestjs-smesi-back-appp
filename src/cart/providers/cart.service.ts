import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../cart.entity';
import { AddToCartDto } from '../dtos/add-to-cart.dto';
import { UpdateCartItemDto } from '../dtos/update-cart-item.dto';
import { User } from 'src/users/user.entity';
import { Product } from 'src/categories/product.entity';
import { ActiveUserData } from 'src/auth/inteface/active-user-data.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getCart(user: ActiveUserData): Promise<CartItem[]> {
    const userEntity = await this.userRepository.findOne({ where: { id: user.sub } });
    if (!userEntity) {
      throw new NotFoundException('Пользователь не найден');
    }

    return this.cartRepository.find({
      where: { user: userEntity },
      relations: ['product'],
    });
  }

  async addToCart(user: ActiveUserData, addToCartDto: AddToCartDto): Promise<CartItem> {
    const { productId, quantity } = addToCartDto;

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Товар не найден');
    }

    const userEntity = await this.userRepository.findOne({ where: { id: user.sub } });
    if (!userEntity) {
      throw new NotFoundException('Пользователь не найден');
    }

    let cartItem = await this.cartRepository.findOne({
      where: { user: userEntity, product },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepository.create({
        user: userEntity,
        product,
        quantity,
      });
    }

    return this.cartRepository.save(cartItem);
  }

  async removeFromCart(user: ActiveUserData, cartItemId: number): Promise<void> {
    const userEntity = await this.userRepository.findOne({ where: { id: user.sub } });
    if (!userEntity) {
      throw new NotFoundException('Пользователь не найден');
    }

    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, user: userEntity },
    });

    if (!cartItem) {
      throw new NotFoundException('Товар в корзине не найден');
    }

    await this.cartRepository.remove(cartItem);
  }
}
