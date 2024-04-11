import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/typeorm/banner.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { Repository } from 'typeorm';
@Injectable()
export class WsBannerService {
  constructor(@InjectRepository(Banner) private repos: Repository<Banner>) {}

  getAll() {
    return this.repos
      .find()
      .then((result) => BaseResponse.success<Banner[]>(result))
      .catch(WsCatch);
  }
}
