import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Добро пожаловать в Строим и Месим!',
      template: './welcome', // Путь к шаблону EJS
      context: {
        name: user.firstName,
      },
    });
  }

  async sendProductUpdateNotification(user: User, productName: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Новый продукт добавлен: ${productName}`,
      template: './product-notification',
      context: {
        name: user.firstName,
        productName,
      },
    });
  }

  async sendNewsUpdateNotification(user: User, newsTitle: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: `Новая новость: ${newsTitle}`,
      template: './news-notification',
      context: {
        name: user.firstName,
        newsTitle,
      },
    });
  }
}
