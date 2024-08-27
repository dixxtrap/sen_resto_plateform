import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { ProductFile, ProductFileDto } from 'src/typeorm/product_file.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
import { S3Service } from '../../s3/s3.service';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
@Injectable()
export class ProductFileService {
  constructor(
    @Inject(EntityProviderEnum.PRODUCT_FILE) private repos: Repository<ProductFile>,
    private s3Service: S3Service,
  ) {}
  getUpdate() {
    return HttpExceptionCode.SUCCEEDED;
  }
  async create({
    body,
    file,
  }: {
    body: ProductFileDto;
    file: Express.Multer.File;
  }) {
    if (file)
      body.path = await this.s3Service.createFileToS3AndDeleteLocal({
        file: file,
      });
    return this.repos
      .save(this.repos.create(body))
      .then((value) => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({
    body,
    id,
    file,
  }: {
    body: ProductFileDto;
    id: number;
    file?: Express.Multer.File;
  }) {
    if (file)
      return this.repos
        .findOne({ where: { id } })
        .then((value) => {
          if (body.path) {
            return this.s3Service
              .uploadFileToS3AndDeleteLocal({
                file,
                oldPath: value.path,
              })
              .then((val) => {
                return this.repos
                  .update({ id }, { path: val })
                  .then((result) => {
                    console.log(result);
                    return HttpExceptionCode.SUCCEEDED;
                  });
              })
              .catch((err) => {
                console.log('-===========update error============');
                throw err;
              });
          }
        })
        .catch((err) => {
          if (err instanceof WsMessage) throw err;
          throw new WsMessage(HttpExceptionCode.FAILLURE);
        });
  }
  delete({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((value) => {
        if (value.path) {
          return this.s3Service
            .deleteFileToS3({ path: value.path })
            .then((isDelected) => {
              if (isDelected)
                return this.repos.delete({ id }).then(() => {
                  throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                });
              throw new WsMessage(HttpExceptionCode.FAILLURE);
            });
        }
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
