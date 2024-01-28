import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { WalletStatusService } from 'src/modules/wallet_status/wallet_status.service';
import { CompanyRestaurant } from 'src/typeorm';
import { AddressDto } from 'src/typeorm/address.entity';
import { CompanyRestaurantBaseDto } from 'src/typeorm/company_restaurant.entity';
import { CoordonatesDto } from 'src/typeorm/coordonates.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class CompanyRestaurantService {
  constructor(
    @InjectRepository(CompanyRestaurant)
    private repos: Repository<CompanyRestaurant>,
    private walletStatusService: WalletStatusService,
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
          address: new AddressDto(),
          parentId: null,
          details: { byId: byId },
        }),
      );
  }
  create({ body, by }: { body: CompanyRestaurantBaseDto; by: UserDto }) {
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
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({ id, body }: { id: number; body: CompanyRestaurantBaseDto }) {
    console.log(body);
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then((old) => {
        if (
          old &&
          old.imagePath &&
          body.imagePath &&
          old.imagePath !== body.imagePath
        ) {
          unlink(old.imagePath, () => {
            console.log(`file deleted: ${old.imagePath}`);
          });
        }
        return this.repos.update({ id: Equal(id) }, body).then((result) => {
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
      .find()
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
            return result;
          });
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
        if (result) return result;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
