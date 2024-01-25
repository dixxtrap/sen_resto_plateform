import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRestaurantBase } from 'src/typeorm';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';
import { WalletStatusService } from '../wallet_status/wallet_status.service';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(CompanyRestaurantBase)
    private reposCompany: Repository<CompanyRestaurantBase>,
    private walletStatausService: WalletStatusService,
  ) {}

  getAll(by: UserDto) {
    console.log(by);
    return this.reposCompany
      .find({ where: { parentId: Equal(by.parentId) } })
      .then((value) => {
        return value;
      })
      .catch((err) => {
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
