import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { Partner } from 'src/typeorm';
import {
  CompanyRestaurant,
  CompanyRestaurantBaseDto,
  Restaurant,
} from 'src/typeorm/company_restaurant.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repos: Repository<Restaurant>,
  ) {}

  create({ body, by }: { body: CompanyRestaurantBaseDto; by: UserDto }) {
    console.log(body);
    return this.repos
      .save(
        this.repos.create({
          ...body,
          parentId: by.parentId,
          details: { byId: by.id },
        }),
      )
      .then((result) => {
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
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({ where: { parentId: by.parentId } })
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
