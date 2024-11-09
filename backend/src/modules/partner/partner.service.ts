import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { WalletStatusService } from '../wallet_status/wallet_status.service';
import { BaseResponse } from 'src/typeorm/response_base';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { Partner, PartnerDto } from 'src/typeorm/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @Inject(EntityProviderEnum.PARTNER)
    private repos: Repository<Partner>,
    private walletStatausService: WalletStatusService,
  ) {}
  create({ body }: { body: PartnerDto }) {
    return this.repos.save(this.repos.create({...body})).then(async (partner)=>{
      this.walletStatausService.getOrCreateByEntityId(partner?.id!)
      return partner;
    })
  }
}
