import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { EmailerService } from 'src/modules/mailer/mailer.service';
import { OtpService } from 'src/modules/otp/otp.service';
import { LoginDto } from 'src/modules/security/security.dto';
import { SecurityService } from 'src/modules/security/security.service';
import { Customer, CustomerDto } from 'src/typeorm/customer.entity';
import { OtpChannel, OtpVerificationDto } from 'src/typeorm/otp.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { SetProfileDto } from 'src/typeorm/customer.entity';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'src/typeorm/repository';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
@Injectable()
export class WsCustomerService {
  constructor(
    private securityService: SecurityService,
    @Inject(EntityProviderEnum.CUSTOMER) private repos: Repository<Customer>,
    private otpService: OtpService,
    private mailService: EmailerService,
  ) {}
  login({ body }: { body: LoginDto }) {
    return this.securityService.userLogin({
      phone: body.username,
      code: body.password,
    });
  }
  async setProfile({ body, by }: { body: SetProfileDto; by: CustomerDto }) {
    return this.repos
      .update({ id: by.id }, body)
      .then((result) => {
        if (result.affected > 0)
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
  async sendOtp({ phone, channel }: { phone: string; channel: OtpChannel }) {
    console.log(`=========send-otp : ${phone} / ${channel}======`);
  return   this.repos
      .findOne({ where: { phone: phone } })
      .then((user) => {
        if (!user) throw new WsMessage(HttpExceptionCode.NOT_FOUND);
        return this.otpService
          .generateOtp({ to: phone, configId: null, channel: channel })
          .then((otp) => {
            return this.mailService
              .senOtp({
                to: phone,
                message: `your  otp code  is ${otp.code}`,
              })
              .then((restult) => {
                console.log('================opt sended==========');
                return new WsMessage(HttpExceptionCode.SUCCEEDED);
              })
            
          })
         
      })
      .catch(WsCatch);
  }
  getById(id) {
    return this.repos
      .findOne({ where: { id } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.NOT_FOUND);
      })
      .catch(WsCatch);
  }
  otpVerification(body: OtpVerificationDto, res: Response) {
    console.log(`============body=============\n`, body)
    return this.otpService
      .verifivcation(body)
      .then(async (result) => {
        if (result.status == true) {
          const customer =
            (await this.repos.findOne({ where: { phone: body.to } })) ??
            (await this.repos.save(
              this.repos.create({ phone: body.to, parentId: 1 }),
            ));
          return this.securityService
            .userLogin({ phone: body.to, code: body.code })
            .then((resultLogin) => {
              return res
                .cookie('access_token', `Bearer ${resultLogin.token}`)
                .json(
                  BaseResponse.success({
                    customer,
                    token: `Bearer ${resultLogin.token}`,
                  }),
                )
                .status(200);
            })
            .catch(WsCatch);
        }
        throw new WsMessage(HttpExceptionCode.LOGIN_FAILLURE);
      })
      .catch(WsCatch);
  }
}
