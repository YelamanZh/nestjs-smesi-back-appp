import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * Swagger configuration
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Стройка и материалы')
    .setDescription('Use the basic API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('A', 'B')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  /**
   * Setup AWS SDK for uploading files
   */
  const configService = app.get(ConfigService);

  AWS.config.update({
    region: configService.get<string>('appConfig.awsRegion'),
    accessKeyId: configService.get<string>('appConfig.awsAccessKeyId'),
    secretAccessKey: configService.get<string>('appConfig.awsSecretAccessKey'),
  });

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();