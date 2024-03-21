import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { logInfo } from 'src/app_log';
import { Card, CardDto } from 'src/typeorm/card.entity';
import { CreateUserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';

@Injectable()
export class CardService {
  constructor(@InjectRepository(Card) private repos: Repository<Card>) {}
  create({ by, body }: { by: CreateUserDto; body: CardDto }) {
    return this.repos
      .save(this.repos.create({ ...body, details: { byId: by.id } }))
      .then((value) => {
        if (value) return value;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }

  createBulk({ by, body }: { by: CreateUserDto; body: CardDto[] }) {
    return this.repos.manager.transaction((manager) => {
      return Promise.all(
        body.map((e) => {
          return manager
            .save(
              Card,
              manager.create(Card, { ...e, details: { byId: by.id } }),
            )
            .then((value) => {
              return value;
            })
            .catch((err) => {
              if (err instanceof WsMessage) throw err;
              console.log(err);
              throw new WsMessage({
                ...HttpExceptionCode.FAILLURE,
                message: `ligne serial= ${e.serial} number=${e.pan} `,
              });
            });
        }),
      )
        .then((value) => {
          if (value) {
            throw new WsMessage(HttpExceptionCode.SUCCEEDED);
          } else throw new WsMessage(HttpExceptionCode.FAILLURE);
        })
        .catch((err) => {
          if (err instanceof WsMessage) throw err;
          console.log(err);
          throw new WsMessage(HttpExceptionCode.FAILLURE);
        });
    });
  }

  getAll({ by }: { by: CreateUserDto }) {
    logInfo({ by, action: 'Get Card details' });
    return this.repos
      .find()
      .then((value) => {
        if (value) return value;
      })
      .catch((err) => {
        if (err) throw err;
        console.log(err);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
