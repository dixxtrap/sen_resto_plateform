import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Banner, BannerDto } from 'src/typeorm/banner.entity';
import { CreateUserDto, UserDto } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { WsCatch } from 'src/utils/catch';
import { BaseResponse } from 'src/typeorm/response_base';
import { logInfo } from 'src/app_log';
@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private readonly repos: Repository<Banner>,
    private s3Service: S3Service,
  ) {}

  getAll({ by }: { by: UserDto }) {
    logInfo({ by, action: `get all service nsws  banner` });
    return this.repos.find().then((result) => {
      return BaseResponse.success(result);
    });
  }
  getById({ by, id }: { by: UserDto; id: number }) {
    logInfo({ by, action: `get banner ${id}` });
    return this.repos.findOne({ where: { id } }).then((result) => {
      return BaseResponse.success<BannerDto>(result);
    });
  }
  create({
    file,
    by,
    body,
  }: {
    file: Express.Multer.File;
    by: UserDto;
    body: BannerDto;
  }) {
    logInfo({ by, action: 'create new banner' });
    console.log(body);
    console.log(file);
    return this.s3Service
      .createFileToS3AndDeleteLocal({ file: file })
      .then((path) => {
        return this.repos
          .save(this.repos.create({ ...body, imageUrl: path }))
          .then((result) => {
            if (result) throw new WsMessage(HttpExceptionCode.SUCCEEDED);
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      })
      .catch(WsCatch);
  }
  delete({ id, by }: { by: UserDto; id: number }) {
    return this.getById({ by, id })
      .then((item) => {
        return this.s3Service
          .deleteFileToS3({ path: item.data.imageUrl })
          .then((deletePath) => {
            console.log(deletePath);
            return this.repos.delete({ id }).then((deleteResult) => {
              if (deleteResult.affected > 0)
                throw new WsMessage(HttpExceptionCode.SUCCEEDED);
              else throw new WsMessage(HttpExceptionCode.NOT_FOUND);
            });
          });
      })
      .catch(WsCatch);
  }
  update({
    file,
    by,
    id,
    body,
  }: {
    file: Express.Multer.File;
    by: UserDto;
    id: number;
    body: BannerDto;
  }) {
    logInfo({ by, action: `update banner ${id}` });
    return this.repos
      .findOne({ where: { id } })
      .then(async (old) => {
        if (old) {
          if (file)
            body.imageUrl = await this.s3Service.uploadFileToS3AndDeleteLocal({
              file: file,
              oldPath: old.imageUrl,
            });
          return this.repos.update({ id }, body).then((updatetedResult) => {
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
