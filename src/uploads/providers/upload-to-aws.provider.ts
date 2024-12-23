import * as AWS from 'aws-sdk';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  public async fileUpload(file: Express.Multer.File): Promise<string> {
    const bucketName = this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME');
    const key = this.generateFileName(file);

    try {
      await this.s3
        .upload({
          Bucket: bucketName!,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return key;
    } catch (error) {
      throw new RequestTimeoutException('Ошибка загрузки файла на S3', {
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