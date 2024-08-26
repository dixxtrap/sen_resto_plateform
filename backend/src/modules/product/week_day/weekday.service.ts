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
    this.repos.upsert(weekDayData.map(e=>this.repos.create(e)),{ conflictPaths: { name:true, dayNumber:true},
    upsertType: 'on-duplicate-key-update',})
    ;
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
