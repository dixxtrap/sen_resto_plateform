import { InjectRepository } from '@nestjs/typeorm';
import { Otp, OtpVerificationDto } from 'src/typeorm/otp.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
export class OtpService {
  constructor(@InjectRepository(Otp) private repos: Repository<Otp>) {}
  generateCode(length: number): string {
    const chars = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }
  generateOtp({
    to,
    configId,
    channel,
  }: {
    to: string;
    configId: number;
    channel: string;
  }) {
    return this.repos.save(
      this.repos.create({ code: this.generateCode(4), to, configId }),
    );
  }
  getAll() {
    return this.repos.find().then((result) => {
      return BaseResponse.success(result);
    });
  } 
  verifivcation(body: OtpVerificationDto) {
    return this.repos
      .findOne({
        where: { to: body.to },
        order: { details: { createdAt: -1 } },
      })
      .then((result) => {
        if (result && result.code === body.code)
          return BaseResponse.success(HttpExceptionCode.SUCCEEDED);
        else
          throw new WsMessage({
            ...HttpExceptionCode.LOGIN_FAILLURE,
            message: 'code pin invalide',
          });
      })
      .catch(WsCatch);
  }
}
