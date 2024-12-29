import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipes
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
    .setDescription('API documentation for Стройка и материалы')
    .setTermsOfService(
      'http://ec2-13-51-241-139.eu-north-1.compute.amazonaws.com:3000/terms-of-service',
    )
    .setLicense('License', 'https://example.com/license')
    .addServer('http://localhost:3000')
    .addServer('http://ec2-13-51-241-139.eu-north-1.compute.amazonaws.com:3000')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  /**
   * Configure AWS SDK
   */
  const configService = app.get(ConfigService);

  AWS.config.update({
    region: configService.get<string>('appConfig.awsRegion'),
    accessKeyId: configService.get<string>('appConfig.awsAccessKeyId'),
    secretAccessKey: configService.get<string>('appConfig.awsSecretAccessKey'),
  });

  /**
   * CORS configuration
   */
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://ec2-13-51-241-139.eu-north-1.compute.amazonaws.com:3000',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Authorization, Content-Type',
  });

  // Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
