import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { MulterConfig } from "src/utils/multer.config";
import { S3Module } from "../s3/s3.module";
import { IconController } from "./icon.controller";
import { IconService } from "./icon.service";

@Module({
  imports: [MulterConfig, S3Module],
  controllers: [IconController],
  providers: [IconService],
  exports: [],
})
export class IconModule{

}