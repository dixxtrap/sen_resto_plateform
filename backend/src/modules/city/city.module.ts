import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { User } from "src/typeorm/user.entity";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { City } from "src/typeorm/city.entity";
import { MulterConfig } from "src/utils/multer.config";
import { ExcelModule } from "../excel/excel.module";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

@Module({
    imports:[MulterConfig, ExcelModule, TypeOrmModule.forFeature([City])],
    providers:[CityService],
    controllers:[CityController],
    exports:[]
})
export class CityModule{} 