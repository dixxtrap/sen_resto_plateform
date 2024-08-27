import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gift } from "src/typeorm/gift.entity";
import { GiftController } from "./gift.controller";
import { GiftService } from "./gift.service";
import { GiftHistory } from "src/typeorm/gift_history.entity";

@Module({
  imports: [],
  controllers: [GiftController],
  providers: [GiftService],
  exports: [],
})
export class GiftModule{}