import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocuments(@UploadedFile() file: Express.Multer.File){
    return this.uploadService.uploadPDF(file, 'documents');
  }
}