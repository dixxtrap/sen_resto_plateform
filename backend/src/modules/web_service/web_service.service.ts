import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { DataSource } from "typeorm/data-source/DataSource";
import { BaseResponse } from 'src/typeorm/response_base';

Injectable()
export class WsService {
    constructor(
    @Inject(EntityProviderEnum.DATA_SOURCE) private dataSource: DataSource
) {}

   async  getIcons(){
        return  this.dataSource.createQueryRunner().query('Select * from icon').then(val=>
        {
            console.log(val)
            return BaseResponse.success(val)
        } 
        )
    }
}