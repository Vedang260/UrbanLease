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

}