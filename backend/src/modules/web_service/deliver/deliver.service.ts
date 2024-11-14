import { HttpException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { LoginDto } from 'src/modules/security/security.dto';
import { SecurityService } from 'src/modules/security/security.service';
import { Deliver } from 'src/typeorm/partner/deliver.entity';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { WsCatch } from 'src/utils/catch';
import { CryptoService } from 'src/utils/crypto_service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm/repository/Repository';

export class WsDeliverService {
  constructor(
    @Inject(EntityProviderEnum.DELIVER) private repos: Repository<Deliver>,
    private securityService: SecurityService,
  ) {}

  login({ body }: { body: LoginDto }) {
    return this.repos
      .findOneOrFail({ where: { phone: body.username } })
      .then((result) => {
        const { password, ...rest } = result;

        if (true) {
          const token = this.securityService.sign({ payload: rest }); 
        return {user:rest, token}
        }
        throw new WsMessage(HttpExceptionCode.LOGIN_FAILLURE);
      })
      .catch(WsCatch);
  }
}
