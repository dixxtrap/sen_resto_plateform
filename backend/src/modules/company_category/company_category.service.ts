import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { CompanyCategory } from "src/typeorm/company_category.entity";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { Repository } from "typeorm";
import { UserDto } from '../../typeorm/user.entity';
import { CompanyCategoryDto } from '../../typeorm/company_category.entity';
import { HttpExceptionCode, WsMessage } from "src/utils/http_exception_code";
import { WsCatch } from "src/utils/catch";
import { BaseResponse } from "src/typeorm/response_base";

@Injectable()
export class CompanyCategoryService {
    constructor(@Inject(EntityProviderEnum.COMPANY_CATEGORY) private repos: Repository<CompanyCategory>) { }

    create({ by, body }: { by: UserDto, body: CompanyCategoryDto }) {
        return this.repos.save(this.repos.create({ ...body, partnerId: by.parentId, details: { byId: by.id } })).then(result => {
            if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED)
            throw new Error();
        }).catch(WsCatch)
    }

    update({ by, id, body }: { by: UserDto, id: number, body: CompanyCategoryDto }) {
        return this.repos.update({ id }, this.repos.create({ ...body, partnerId: by.parentId })).then(result => {
            if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED)
            throw new Error();
        }).catch(WsCatch)
    }
    getAll({ by }: { by: UserDto }) {
        return this.repos.find({ where: { partnerId: by.parentId }, order:{priority:"DESC"} }).then(result => BaseResponse.success(result)).catch(WsCatch)
    }
}