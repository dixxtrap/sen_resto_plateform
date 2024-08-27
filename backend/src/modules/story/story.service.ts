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
@Injectable()
export class StoryService {
    constructor(@Inject(EntityProviderEnum.STORY) private repos: Repository<Story>, private s3Service:S3Service) { }
    create ({by,files}:{by:UserDto,files:Array<Express.Multer.File>}){
        return  Promise.all(files.map(file=>this.s3Service.createFileToS3AndDeleteLocal({file}))).then(paths=>{
            return this.repos.save(paths.map(path=>this.repos.create({imagePath:path, partnerId:by.parentId, byId:by.id}))).then(result=>result)
        }).then(result=>{
            throw new WsMessage(HttpExceptionCode.SUCCEEDED)
        }).catch
    }

    getAll({by}:{by:UserDto}){
return this.repos.find({where:{partnerId:by.parentId}}).then(result=>BaseResponse.success(result))
    }
    delete({by, id}:{by:UserDto, id:number}){
        return this.repos.findOne({where:{id}}).then(old=>{
            if(old) return this.s3Service.deleteFileToS3({path:old.imagePath}).then(res=>{throw new WsMessage(HttpExceptionCode.SUCCEEDED)})
                throw new WsMessage(HttpExceptionCode.FAILLURE)
        }).catch(WsCatch)
    }
}
