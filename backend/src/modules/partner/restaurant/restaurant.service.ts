import { InjectRepository } from "@nestjs/typeorm";
import { Partner } from "src/typeorm";
import { CompanyRestaurant, CompanyRestaurantBaseDto, Restaurant } from "src/typeorm/company_restaurant.entity";
import { HttpExceptionCode, WsMessage } from "src/utils/http_exception_code";
import { Equal, Repository } from "typeorm";

export class RestaurantService{
        constructor(@InjectRepository(Restaurant) private repos:Repository<Restaurant>){}
        
  create({ body }: { body: CompanyRestaurantBaseDto }) {
        console.log(body)
        return this.repos
          .manager.getTreeRepository(Restaurant).save(this.repos .manager.getTreeRepository(Restaurant).create(body))
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
      update({ id, body }: { id: number; body: CompanyRestaurantBaseDto }) {
        return this.repos
          .update({ id: Equal(id) }, body)
          .then((result) => {
            if (result.affected > 0) return HttpExceptionCode.SUCCEEDED;
            else throw new WsMessage(HttpExceptionCode.FAILLURE);
          })
          .catch((err) => {
            console.log(err);
            if (err instanceof WsMessage) throw err;
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      }
      getAll() {
        return this.repos
          .find()
          .then((result) => {
            if (result) return result;
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
            if (result) return result;
            else throw new WsMessage(HttpExceptionCode.FAILLURE);
          })
          .catch((err) => {
            console.log(err);
            if (err instanceof WsMessage) throw err;
            throw new WsMessage(HttpExceptionCode.FAILLURE);
          });
      }
}