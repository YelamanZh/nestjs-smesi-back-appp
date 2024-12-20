import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { config} from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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
  config.update({
    credentials: {
      accessKeyId: configService.get(
        'appConfig.awsAccessKeyId',
      ),
      secretAccessKey: configService.get(
        'appConfig.awsSecretAccessKey',
      ),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  //enable cors
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
