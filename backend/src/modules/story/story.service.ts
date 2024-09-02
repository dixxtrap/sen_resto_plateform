import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Story } from 'src/typeorm/story.entity';
import { UserDto } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { S3Service } from '../s3/s3.service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { BaseResponse } from 'src/typeorm/response_base';
import { WsCatch } from 'src/utils/catch';
import { EntityProviderEnum } from 'src/typeorm/entity_provider_enum';
import { StoryGroup } from 'src/typeorm/story_group.entity';
@Injectable()
export class StoryService {
    constructor(
        @Inject(EntityProviderEnum.STORY) private repos: Repository<Story>, 
        @Inject(EntityProviderEnum.STORY_GROUP) private reposGroup: Repository<StoryGroup>, 
        private s3Service:S3Service) { }
    async create  ({by,files}:{by:UserDto,files:Array<Express.Multer.File>}){
        const group=await this.reposGroup.findOne({where:{partnerId:by.parentId}})?? await  this.reposGroup.save(this.reposGroup.create({partnerId:by.parentId, byId:by.id}))
      return   Promise.all(files.map(file=>this.s3Service.createFileToS3AndDeleteLocal({file}))).then(paths=>{
            return this.repos.save(paths.map(path=>this.repos.create({imagePath:path, groupId:group.id, byId:by.id}))).then(result=>result)
        }).then(()=>{
            throw new WsMessage(HttpExceptionCode.SUCCEEDED)
        }).catch(WsCatch)
    }

    getAll({by}:{by:UserDto}){
return this.repos.find({where:{group:{partnerId:by.parentId}}}).then(result=>BaseResponse.success(result))
    }
    delete({by, id}:{by:UserDto, id:number}){
        return this.repos.findOne({where:{id}}).then(old=>{
            if(old) return this.s3Service.deleteFileToS3({path:old.imagePath}).then(res=>{return this.repos.delete({id}).then(res=>{if (res.affected>0)throw new WsMessage(HttpExceptionCode.SUCCEEDED)})})
                throw new WsMessage(HttpExceptionCode.FAILLURE)
        }).catch(WsCatch)
    }
}
