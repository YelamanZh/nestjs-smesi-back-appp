import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UploadFile } from '../interfaces/upload-file.interface';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { fileTypes } from '../enums/file-types.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../uploads.entity';
import { Repository } from 'typeorm';
import { Express } from 'express';

@Injectable()
export class UploadsService {
  constructor(
    /**
     * Inject uploadToAwsProvider
     */
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    /**
     * inject configService
     */
    private readonly configService: ConfigService,
    /**
     * inject uploadsRepository
     */
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
  ) {}
  
  public async uploadFile(file: Express.Multer.File) {
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)
    ) {
      throw new BadRequestException('MIME type not supported');
    }
    try {
      const path = await this.uploadToAwsProvider.fileUpload(file);
      const uploadFile: UploadFile = {
        name: path,
        path: `https://${this.configService.get<string>('appConfig.awsCloudfrontUrl')}/${path}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException('Failed to upload file', { cause: error });
    }
  }  
}
