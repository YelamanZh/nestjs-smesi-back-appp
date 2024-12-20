import * as path from 'path';

import { Injectable, RequestTimeoutException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Express } from 'express';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3({
      accessKeyId: this.configService.get<string>('appConfig.awsAccessKeyId'),
      secretAccessKey: this.configService.get<string>('appConfig.awsSecretAccessKey'),
      region: this.configService.get<string>('appConfig.awsRegion'),
    });

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('appConfig.awsBucketName'), // Убедитесь, что Bucket корректный
          Body: file.buffer,
          Key: this.generateFileName(file),
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new RequestTimeoutException('Failed to upload file to S3', {
        cause: error,
      });
    }
  }

  private generateFileName(file: Express.Multer.File): string {
    let name = file.originalname.split('.')[0].replace(/\s/g, '').trim();
    let extension = path.extname(file.originalname);
    let timeStamp = new Date().getTime().toString().trim();
    return `${name}-${timeStamp}-${uuidv4()}${extension}`;
  }
}

