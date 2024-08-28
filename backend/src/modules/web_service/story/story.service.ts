import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { BaseResponse } from "src/typeorm/response_base";
import { Story } from "src/typeorm/story.entity";
import { Repository } from "typeorm";
type GroupBy<T> = {
    [key: string]: T[];
  };
  
  // Create the groupBy function
  function groupBy<T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): GroupBy<T> {
    return array.reduce((result, item) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as GroupBy<T>);
  }
  
@Injectable()
export class WsStoryService{
    constructor(@Inject(EntityProviderEnum.STORY) private repos:Repository<Story>){}


    getAll(){
        return this.repos.createQueryBuilder().groupBy("partnerId").groupBy("id").getMany().then(result=>BaseResponse.success(groupBy(result, 'partnerId')))
    }
}