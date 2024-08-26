import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

import { ExcelService } from '../excel/excel.service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm/repository/Repository';
import { DataSource } from 'typeorm/data-source/DataSource';
import { Inject } from '@nestjs/common';
import { PaginationDto } from '../../utils/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { City, CityEnum } from 'src/typeorm/city.entity';
import { BaseResponse } from 'src/typeorm/response_base';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private repos: Repository<City>,
    private excel: ExcelService,
  ) {}

  async findAll({ pagination }: { pagination: PaginationDto }) {
    const count = await this.repos.count({ where: { type: CityEnum.COMMUNE } });
  
    return this.repos
      .find({
        where: { type: CityEnum.COMMUNE },
        take: pagination.perPage ?? 20,
        skip: ((pagination.page ?? 1) - 1) * (pagination.perPage ?? 20),
        relations: { parent: { parent: { parent: true } } },
        order:{parent:{parent:{parent:{ name:1},name:1 }, name:1}, name:1}
      })
      .then((val) => BaseResponse.successWithPagination(val, count, pagination.perPage));
  }
  findRegion(){
    return this.repos.find({where:{type:CityEnum.REGION}}).then(val=>BaseResponse.success(val))
  }
  findChildren({id}:{id:number}){
    return this.repos.find({where:{parentId:id}}).then(val=>BaseResponse.success(val))
  }

}
