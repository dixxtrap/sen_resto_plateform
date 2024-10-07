import { Inject } from '@nestjs/common';
import { entityProviders } from 'src/typeorm';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import {
  EstablishmentType,
  EstablishmentTypeDto,
} from 'src/typeorm/establishment_type';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { WsCatch } from 'src/utils/catch';
import { BaseResponse } from 'src/typeorm/response_base';

export class EstablishmentTypeService {
  constructor(
    @Inject(EntityProviderEnum.ESTABLISHMENT_TYPE)
    private repos: Repository<EstablishmentType>,
    private s3Service: S3Service,
  ) {}
  getAll() {
    return this.repos
      .find({ where:{} })
      .then((value) => BaseResponse.success(value));
  }
  create({
    file,
    body,
  }: {
    file: Express.Multer.File;
    body: EstablishmentTypeDto;
  }) {
    console.log(body);
    return this.s3Service
      .createFileToS3AndDeleteLocal({ file })
      .then((path) => { 
        body.imagePath = path;
        return this.repos.save(this.repos.create(body));
      });
  }
  update({
    file,

    id,
    body,
  }: {
    file: Express.Multer.File;

    id: number;
    body: EstablishmentTypeDto;
  }) {
    // logInfo({ by, action: `update banner ${id}` });
    return this.repos
      .findOne({ where: { id } })
      .then(async (old) => {
        if (old) {
          if (file)
            body.imagePath = await this.s3Service.uploadFileToS3AndDeleteLocal({
              file: file,
              oldPath: old.imagePath,
            });
          return this.repos
            .update({ id }, this.repos.create(body))
            .then((updatetedResult) => {
              if (updatetedResult.affected > 0)
                throw new WsMessage(HttpExceptionCode.SUCCEEDED);
              throw new WsMessage(HttpExceptionCode.NOT_FOUND);
            });
        }
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
}
