import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { PaymentType } from "src/typeorm/payment_type.entity";
import { BaseResponse } from "src/typeorm/response_base";
import { Repository } from "typeorm/repository/Repository";

@Injectable()
export class WsPaymentTypeService{
 constructor(@Inject(EntityProviderEnum.PAYMENT_TYPE) private repos:Repository<PaymentType>){}

 getAll(){
    return this.repos.find({select:{id:true,isActive:true, imagePath:true, invertFees:true, fees:true , name:true, shortname:true}}).then(result=>BaseResponse.success(result))
 }
 getById({id}:{id: number}){
    return this.repos.findOne({where:{id}}).then(result=>BaseResponse.success(result))
 }
}