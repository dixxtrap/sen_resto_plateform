import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { CompanyCategoryController } from "./company_category.controller";
import { CompanyCategoryService } from "./company_category.service";

@Module({
    imports:[],
    controllers:[CompanyCategoryController],
    providers:[CompanyCategoryService]
})
export class CompanyCategoryModule{

}