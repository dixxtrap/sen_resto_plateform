import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRestaurantBase } from 'src/typeorm';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { WalletStatusService } from '../wallet_status/wallet_status.service';
import { BaseResponse } from 'src/typeorm/response_base';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';

@Injectable() 
export class PartnerService {
  constructor(
    @Inject(EntityProviderEnum.COMPANY_RESTAURANT_BASE)
    private reposCompany: Repository<CompanyRestaurantBase>,
    private walletStatausService: WalletStatusService,
  ) {}

  getAll(by: UserDto) {
    console.log(by);
    return this.reposCompany
      .find({ where: { parentId: Equal(by.parentId) } })
      .then((result) => {
        return BaseResponse.success(result);
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
