// s3.service.ts

import { Injectable } from '@nestjs/common';

import * as S3 from 'aws-sdk/clients/s3';
import { promises as fsPromises, createReadStream } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3;

  constructor(private config: ConfigService) {
    this.s3 = new S3({
      region: this.config.getOrThrow('S3_REGION'),
      credentials: {
        secretAccessKey: this.config.getOrThrow('S3_SECRET_ACCESS_KEY'),
        accessKeyId: this.config.getOrThrow('S3_ACCESS_KEY_ID'),
      },
    });
  }
  async deleteFileToS3({ path }: { path: string }) {
    const regexPattern = /[^/]+$/;
    const name = path.match(regexPattern)[0];
    console.log(`=========== attemp delecting ${name}==============`);
    return this.s3
      .deleteObject(
        {
          Bucket: this.config.getOrThrow('S3_BUCKET_NAME'),
          Key: ` ${this.config.getOrThrow(
            'S3_PUBLIC',
          )}/${this.config.getOrThrow('S3_BUCKET_DIR')}/${name}`,
        },
        () => {},
      )
      .promise()
      .then((val) => {
        console.log(val.$response.data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  async createFileToS3AndDeleteLocal({
    file,
  }: {
    file: Express.Multer.File;
    name?: string;
  }) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.config.getOrThrow('S3_BUCKET_NAME'),
        Key:
          this.config.getOrThrow('S3_PUBLIC') +
          '/' +
          this.config.getOrThrow('S3_BUCKET_DIR') +
          '/' +
          file.filename,
        // Body: file.stream,
        Body: createReadStream(file.path),

        ACL: 'public-read',
        ContentDisposition: 'inline',
      })
      .promise();
    // Delete the file from the local filesystem after uploading to S3
    try {
      await fsPromises.unlink(file.path);
    } catch (error) {}
    console.log(uploadResult.Location);

    return uploadResult.Location;
  }
  async uploadFileToS3AndDeleteLocal({
    file,
    oldPath,
  }: {
    file: Express.Multer.File;
    oldPath: string;
  }) {
    if (file) {
      if (oldPath)
        return await this.deleteFileToS3({ path: oldPath })
          .then(async (isDelected) => {
            console.log(
              `==============${
                isDelected ? 'supprimer' : 'non supprimer'
              }==========`,
            );
            const uploadResult = await this.createFileToS3AndDeleteLocal({
              file,
            });
            // Delete the file from the local filesystem after uploading to S3
            return uploadResult;
          })
          .catch((err) => {
            console.log('============error delecting==========');
            console.log(err);
            throw err;
          });
      return await this.createFileToS3AndDeleteLocal({
        file,
      });
    } else {
      const uploadResult = await this.createFileToS3AndDeleteLocal({ file });
      // Delete the file from the local filesystem after uploading to S3
      return uploadResult;
    }
  }
}
