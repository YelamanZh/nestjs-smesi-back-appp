import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { Global, Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('appConfig.mailHost'),
          port: 587,
          secure: false,
          auth: {
            user: config.get('appConfig.smtpUsername'),
            pass: config.get('appConfig.smtpPassword'),
          },
        },
        defaults: {
          from: `My Blog <no-repy@nestjs-blog.com>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({ inlineCssEnabled: true }),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService], // Экспорт MailService
})

@Injectable()
export class MailService {
  async sendUserWelcome(user: any): Promise<void> {
    // Реализуйте логику отправки почты
    console.log(`Отправка приветственного письма пользователю: ${user.email}`);
  }
}