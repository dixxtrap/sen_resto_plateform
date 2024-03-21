import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City, CityDto } from 'src/typeorm/city.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository, Equal } from 'typeorm';
@Injectable()
export class CityService {
  constructor(@InjectRepository(City) private repos: Repository<City>) {}
  create(body: CityDto) {
    return this.repos
      .save(this.repos.create(body))
      .then((value) => value)
      .catch(WsCatch);
  }
  getAll() {
    return this.repos.find();
  }
  getById(id: number) {
    return this.repos.findOne({ where: { id: Equal(id) } });
  }
  updateById({ id, body }: { id: number; body: CityDto }) {
    return this.repos
      .update({ id }, { name: body.name })
      .then((value) => {
        if (value.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
}
