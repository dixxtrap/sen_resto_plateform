import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlink } from 'fs';
import { ProductFile, ProductFileDto } from 'src/typeorm/product_file.entity';
import { HttpExceptionCode, WsMessage } from 'src/utils/http_exception_code';
import { Repository } from 'typeorm';
@Injectable()
export class ProductFileService {
  constructor(
    @InjectRepository(ProductFile) private repos: Repository<ProductFile>,
  ) {}
  getUpdate() { 
    return HttpExceptionCode.SUCCEEDED;
  }
  create(body: ProductFileDto) {
    return this.repos
      .save(this.repos.create(body))
      .then((value) => {
        throw new WsMessage(HttpExceptionCode.SUCCEEDED);
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  update({ body, id }: { body: ProductFileDto; id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((value) => {
        if (body.path) {
          try {
            unlink(value.path, () => {});
          } catch (error) {}
        }
        return this.repos.update({ id }, body).then(() => {
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        });
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
  delete({ id }: {  id: number }) {
    return this.repos
      .findOne({ where: { id } })
      .then((value) => {
        if (value.path) {
          try {
            unlink(value.path, () => {});
          } catch (error) {}
        }
        return this.repos.delete({ id }).then(() => {
          throw new WsMessage(HttpExceptionCode.SUCCEEDED);
        });
      })
      .catch((err) => {
        if (err instanceof WsMessage) throw err;
        throw new WsMessage(HttpExceptionCode.FAILLURE);
      });
  }
}
