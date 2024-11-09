import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/modules/s3/s3.service';
import {
  CompanyShop,
  CompanyShopDto,
} from 'src/typeorm/partner/company_shop.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

export class ShopService {
  constructor(
    @Inject(EntityProviderEnum.COMPANY_SHOP)
    private repos: Repository<CompanyShop>,
    private s3Service: S3Service,
  ) {}

  async create({
    body,
    by,
    file,
    background,
  }: {
    body: CompanyShopDto;
    by: UserDto;
    file: Express.Multer.File;
    background: Express.Multer.File;
  }) {
    console.log(body);

    return this.repos
      .save(
        this.repos.create({
          ...body,
          companyId: by.companyId,
          details: { byId: by.id },
        }),
      )
      .then(async (result) => {
        if (background) {
          body.backgroundPath =
            await this.s3Service.createFileToS3AndDeleteLocal({
              file: background,
            });
        }
        await this.repos.update({ id: result.id }, body);
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({
    id,
    body,
    file,
    background,
  }: {
    id: number;
    body: CompanyShopDto;
    file?: Express.Multer.File;
    background?: Express.Multer.File;
  }) {
    console.log(body);
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then(async (old) => {
        if (background) {
          body.backgroundPath =
            await this.s3Service.uploadFileToS3AndDeleteLocal({
              file: background,
              oldPath: old.backgroundPath,
            });
        }
        return this.repos
          .update({ id: Equal(id) }, this.repos.create(body))
          .then((result) => {
            if (result.affected! > 0) return HttpExceptionCode.SUCCEEDED;
            else throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      })
      .catch(WsCatch);
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({ where: { companyId: by.companyId }, relations: {} })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
