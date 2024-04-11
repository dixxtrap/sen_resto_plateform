import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { weekDayData } from 'src/data/weekdata.data';
import { Weekday } from 'src/typeorm';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class WeekdayService implements OnModuleInit {
  constructor(@InjectRepository(Weekday) private repos: Repository<Weekday>) {}
  onModuleInit() {
    //     throw new Error('Method not implemented.');
    this.initDay();
  }
  initDay() {
    this.repos.find().then((result) => {
      if (result.length > 0) return null;
      Promise.all(
        weekDayData.map((item) => {
          try {
            this.repos.save(item);
          } catch (error) {
            return null;
          }
        }),
      );
    });
  }
  getAll() {
    return this.repos
      .find()
      .then((value) => {
        value;
        if (value) return value;
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
