import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { CompanyCategoryService } from "./company_category.service";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { CurrentUser } from "src/annotations/current_user";
import { UserDto } from "src/typeorm/user.entity";
import { CompanyCategoryDto } from "src/typeorm/company_category.entity";
import { Body, Param } from "@nestjs/common/decorators/http/route-params.decorator";
@Controller("company_category")
@ApiTags("company_category")
export class CompanyCategoryController{
    constructor(private service:CompanyCategoryService){}
    @Get('all')
    @UseGuards(AuthenticatedGuard)
    getAll(@CurrentUser() by:UserDto){
        return this.service.getAll({by})
    }
    @Post('create')
    @UseGuards(AuthenticatedGuard)
    create(@CurrentUser() by:UserDto, @Body() body:CompanyCategoryDto){
        return this.service.create({by, body})
    }
    @Post('update/:id')
    @UseGuards(AuthenticatedGuard)
    update(@CurrentUser() by:UserDto,@Param('id') id:number, @Body() body:CompanyCategoryDto){
        return this.service.update({by,id, body})
    }
}