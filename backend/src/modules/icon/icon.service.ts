import { Inject } from "@nestjs/common/decorators/core/inject.decorator";
import { EntityProviderEnum } from "src/typeorm/entity_provider_enum";
import { Icon, IconDto } from "src/typeorm/icon.entity";
import { BaseResponse } from "src/typeorm/response_base";
import { Repository } from "typeorm";
import { S3Service } from "../s3/s3.service";
import { HttpExceptionCode, WsMessage } from "src/utils/http_exception_code";
import { WsCatch } from "src/utils/catch";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
@Injectable()
export class IconService{
    constructor(@Inject(EntityProviderEnum.ICON) private repos: Repository<Icon>, private s3Service:S3Service){}
    getAll(){
        return this.repos.find().then(value=>BaseResponse.success(value))
    }
        create({file, body}:{file:Express.Multer.File, body:IconDto}){
            console.log(body)
            return this.s3Service.createFileToS3AndDeleteLocal({file}).then(path=>{
                body.imagePath=path;
                return this.repos.save(this.repos.create(body))
            })
        }
        update({
            file,
    
            id,
            body,
          }: {
            file: Express.Multer.File;
          
            id: number;
            body: IconDto;
          }) {
            // logInfo({ by, action: `update banner ${id}` });
            return this.repos
              .findOne({ where: { id } })
              .then(async (old) => {
                if (old) {
                  if (file)
                    body.imagePath = await this.s3Service.uploadFileToS3AndDeleteLocal({
                      file: file,
                      oldPath: old.imagePath,
                    });
                  return this.repos.update({ id }, this.repos.create(body)).then((updatetedResult) => {
                    if (updatetedResult.affected > 0)
                      throw new WsMessage(HttpExceptionCode.SUCCEEDED);
                    throw new WsMessage(HttpExceptionCode.NOT_FOUND);
                  });
                }
                throw new WsMessage(HttpExceptionCode.NOT_FOUND);
              })
              .catch(WsCatch);
          }
}