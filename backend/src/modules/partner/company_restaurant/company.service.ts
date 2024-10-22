import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartyType } from 'aws-sdk/clients/customerprofiles';
import { unlink } from 'fs';
import { S3Service } from 'src/modules/s3/s3.service';
import { WalletStatusService } from 'src/modules/wallet_status/wallet_status.service';
import { CompanyRestaurant } from 'src/typeorm';
import { AddressDto } from 'src/typeorm/address.entity';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { CoordonatesDto } from 'src/typeorm/coordonates.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CompanyRestaurantService {
  constructor(
    @Inject(EntityProviderEnum.COMPANY)
    private repos: Repository<CompanyRestaurant>,
    private walletStatusService: WalletStatusService,
    private s3Service: S3Service,
  ) {}
  async itinitCompany(byId?: number) {
    const exist = await this.repos.exist({ where: { shortname: 'Sen Resto' } });
    if (!exist)
      return this.repos.save(
        this.repos.create({
          email: 'senResto@gmail.com',
          phone: '2211000000',
          shortname: 'Sen Resto',
          description: '',
          name: 'Sen Resto',
          location: new CoordonatesDto(),
          address: '',
          parentId: null,
          details: { byId: byId },
        }),
      );
  }
  async create({
    body,
    by,
    background,
    file,
  }: {
    body: CompanyRestaurantBaseDto;
    by: UserDto;
    file: Express.Multer.File;
    background: Express.Multer.File;
  }) {
    return this.repos
      .save(
        this.repos.create({
          ...body,
          details: { byId: by.id },
          parentId: by.parentId,
        }),
      )
      .then(async (result) => {
        // if (result) await this.reposClosure.update({childId:result.id,}, {parentId:result.partnerId});
        if (file) {
          body.imagePath = await this.s3Service.createFileToS3AndDeleteLocal({
            file: file,
          });
        }
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
    body: CompanyRestaurantBaseDto;
    file?: Express.Multer.File;
    background?: Express.Multer.File;
  }) {
    console.log(
      '===================================data========================',
    );
    console.log(body);
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then(async (old) => {
        if (old && file && body.imagePath && old.imagePath !== body.imagePath) {
          body.imagePath = await this.s3Service.uploadFileToS3AndDeleteLocal({
            file,
            oldPath: old.imagePath,
          });
        }
        if (
          old &&
          background &&
          body.backgroundPath &&
          old.backgroundPath !== body.backgroundPath
        ) {
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
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getAll() {
    return this.repos
      .find({ relations: { establishmentType: true } })
      .then((result) => {
        if (result)
          return Promise.all(
            result.map((item) => {
              return this.walletStatusService
                .getOrCreateByEntityId(item.id)
                .then((ws) => {
                  return { ...item, balance: ws.balance };
                });
            }),
          ).then((result) => {
            return BaseResponse.success(result);
          });
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({
        where: { id: Equal(id) },
        relations: { city: { parent: { parent: { parent: true } } } },
      })
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
