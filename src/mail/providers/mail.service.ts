import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { Global, Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserWelcome(user: { email: string; name: string }): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: user.email, // Recipient's email
        subject: 'Welcome to My Blog!',
        template: './welcome', // Name of the template file (e.g., `welcome.ejs`)
        context: {
          name: user.name, // Variables to pass to the template
        },
      });
      console.log(`Welcome email sent to ${user.email}`);
    } catch (error) {
      console.error(`Failed to send welcome email: ${error.message}`);
    }
  }
}
