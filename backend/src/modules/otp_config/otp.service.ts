import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpConfig, OtpConfigDto } from 'src/typeorm/otp_config';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class OtpConfigService implements OnModuleInit {
  constructor(
    @InjectRepository(OtpConfig) private repos: Repository<OtpConfig>,
  ) {}
  onModuleInit() {
    this.init();
  }
  init() {
    return this.repos.exist({ where: { label: 'default' } }).then((exist) => {
      if (!exist) {
        return this.repos.save(
          this.repos.create({
            label: 'default',
            duration: 15,
            isHash: false,
            maxAttemp: 3,
            details: { byId: 1 },
          }),
        );
      }
    });
  }
  getAll() {
    return this.repos.find().then((result) => {
      return BaseResponse.success(result);
    });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }

  create({ by, body }: { by: UserDto; body: OtpConfigDto }) {
    return this.repos
      .save(this.repos.create({ ...body, details: { byId: by.id } }))
      .then((result) => {
        if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
  update({ by, body, id }: { by: UserDto; body: OtpConfigDto; id: number }) {
    return this.repos
      .update({ id }, { ...body, details: { byId: by.id } })
      .then((result) => {
        if (result.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch(WsCatch);
  }
}
