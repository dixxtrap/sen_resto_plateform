import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger/dist/decorators/api-use-tags.decorator";
import { GiftService } from "./gift.service";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { UserDto } from "src/typeorm/user.entity";
import { GiftDto } from "src/typeorm/gift.entity";
import { AuthenticatedGuard } from "../security/authenticated.guard";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import {Request} from 'express'
import { Body, Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { CurrentUser } from "src/annotations/current_user";
@Controller('gift')
@ApiTags('gift')
export class GiftController{
    constructor(private service:GiftService){}
    @Get("all")
    @UseGuards(AuthenticatedGuard)
    getAll(@Body('by') by:UserDto){
        return this.service.getAll({by});
    }
    @Post('create')
    @UseGuards(AuthenticatedGuard)
    create(@CurrentUser() user :UserDto, @Body()body:GiftDto){
        return this.service.create({by:user , body})
    }
}
