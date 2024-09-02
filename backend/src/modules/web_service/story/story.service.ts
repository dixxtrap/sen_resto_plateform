import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { BaseResponse } from "src/typeorm/response_base";
import { Story } from "src/typeorm/story.entity";
import { StoryGroup } from "src/typeorm/story_group.entity";
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
    constructor(@Inject(EntityProviderEnum.STORY_GROUP) private repos:Repository<StoryGroup>){}


    getAll(){
        return this.repos.find({relations:{partner:true, story:true},select:{partner:{name:true, shortname:true,imagePath:true}, story:{imagePath:true}}}).then(result=>BaseResponse.success(result))
    }
}