import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { EstablishmentTypeService } from "./establishment_type.service";
import { EstablishmentTypeController } from "./establishment_type.controller";
import { MulterConfig } from "src/utils/multer.config";
import { S3Module } from "../s3/s3.module";

@Module({
    imports: [MulterConfig, S3Module],
    providers:[EstablishmentTypeService],
    controllers:[EstablishmentTypeController]
})
export class EstablishmentTypeModule{}