import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner } from 'src/typeorm/banner.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { Repository } from 'typeorm';
@Injectable()
export class WsBannerService {
  constructor(@Inject(EntityProviderEnum.BANNER) private repos: Repository<Banner>) {}

  getAll() {
    return this.repos
      .find({relations:{}})
      .then((result) => BaseResponse.success<Banner[]>(result))
      .catch(WsCatch);
  }
}
