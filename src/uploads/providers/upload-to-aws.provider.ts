import * as path from 'path';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    // Инициализация клиента S3
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME');
    const key = this.generateFileName(file);

    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      return key; // Возвращаем имя файла в S3
    } catch (error) {
      throw new RequestTimeoutException('Failed to upload file to S3', {
        cause: error,
      });
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    const name = file.originalname.split('.')[0].replace(/\s/g, '').trim();
    const extension = path.extname(file.originalname);
    const timeStamp = new Date().getTime().toString().trim();
    return `${name}-${timeStamp}-${uuidv4()}${extension}`;
  }
}