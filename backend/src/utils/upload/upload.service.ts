import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            reject(new Error(`Cloudinary upload failed: ${error.message}`));
          } else if (!result) {
            reject(new Error('Cloudinary upload returned no result'));
          } else {
            resolve(result);
          }
        }
      );
      
      uploadStream.end(file.buffer);
    });
  }
  
    async uploadMultipleFiles(files: Express.Multer.File[]): Promise<
        { success: boolean; message: string; image_url: string }[]
        > {
        const uploadPromises = files.map(file =>
            this.uploadImage(file)
            .then(result => ({
                success: true,
                message: 'Image uploaded successfully',
                image_url: result.secure_url,
            }))
            .catch(error => {
                console.error('Error uploading one of the images:', error.message);
                return {
                success: false,
                message: 'Failed to upload image',
                image_url: '',
                };
            }),
        );

        return Promise.all(uploadPromises);
    }

  async uploadPDF(
    file: Express.Multer.File,
    folder: string = 'legal_documents'
  ): Promise<{
    success: boolean;
    message: string;
    url?: string;
    publicId?: string;
    error?: string;
  }> {
    return new Promise((resolve) => {
      if (!file) {
        resolve({
          success: false,
          message: 'No file provided',
          error: 'FILE_MISSING'
        });
        return;
      }

      if (file.mimetype !== 'application/pdf') {
        resolve({
          success: false,
          message: 'Only PDF files are allowed',
          error: 'INVALID_FILE_TYPE'
        });
        return;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          format: 'pdf',
          folder,
          tags: ['legal_document'] // Optional tagging for organization
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve({
              success: false,
              message: 'Failed to upload document',
              error: error.message
            });
          } else if (!result) {
            resolve({
              success: false,
              message: 'Cloudinary returned no response',
              error: 'NO_RESULT'
            });
          } else {
            resolve({
              success: true,
              message: 'PDF uploaded successfully',
              url: result.secure_url,
            });
          }
        }
      );

      uploadStream.end(file.buffer);
    });
  }
}