import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

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
   * Swagge configuration
   */

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Стройка и материалы')
    .setDescription('use the basic API url as htpp://localhost:3000')
    .setTermsOfService('htpp://localhost:3000/terms-of-service')
    .setLicense('A', 'B')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  // Instantiate document
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  //setup the aws sdk used uploading the files to aws s3 bucket
  const configService = app.get(ConfigService);

  const s3Client = new S3Client({
    region: configService.get('appConfig.awsRegion'),
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
  });

}
bootstrap();
