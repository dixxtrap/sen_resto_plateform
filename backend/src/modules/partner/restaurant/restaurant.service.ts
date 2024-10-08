import { InjectRepository } from '@nestjs/typeorm';
import { S3Service } from 'src/modules/s3/s3.service';
import {
  CompanyRestaurantBaseDto,
  Restaurant,
} from 'src/typeorm/company_restaurant.entity';
import { BaseResponse } from 'src/typeorm/response_base';
import { UserDto } from 'src/typeorm/user.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Equal, Repository } from 'typeorm';

export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repos: Repository<Restaurant>,
    private s3Service: S3Service,
  ) {}

  create({ body, by }: { body: CompanyRestaurantBaseDto; by: UserDto }) {
    console.log(body);
    return this.repos
      .save(
        this.repos.create({
          ...body,
          parentId: by.parentId,
          details: { byId: by.id },
        }),
      ) 
      .then((result) => {
        if (result) return HttpExceptionCode.SUCCEEDED;
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({
    id,
    body,
    file,
  }: {
    id: number;
    body: CompanyRestaurantBaseDto;
    file: Express.Multer.File;
  }) {
    console.log(body);
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then(async (old) => {
        if (
          file &&
          old?.imagePath &&
          body.imagePath &&
          old.imagePath !== body.imagePath
        ) {
          body.imagePath = await this.s3Service.uploadFileToS3AndDeleteLocal({
            file,
            oldPath: old.imagePath,
          });
          console.log(`==================${body.imagePath}===============`);
        }
        return this.repos.update({ id: Equal(id) }, this.repos.create(body)).then((result) => {
          if (result.affected! > 0) return HttpExceptionCode.SUCCEEDED;
          else throw new WsMessage(HttpExceptionCode.FAILLURE);
        });
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getAll({ by }: { by: UserDto }) {
    return this.repos
      .find({ where: { parentId: by.parentId } , relations:{city:{parent:{parent:true}}}})
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  getById({ id }: { id: number }) {
    return this.repos
      .findOne({ where: { id: Equal(id) } })
      .then((result) => {
        if (result) return BaseResponse.success(result);
        else throw new WsMessage(HttpExceptionCode.FAILLURE);
      })
      .catch((err) => {
        console.log(err);
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
