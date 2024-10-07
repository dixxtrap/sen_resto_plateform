import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ChatGateway } from "./chat.gateway";
import { Global } from "@nestjs/common/decorators/modules/global.decorator";

@Global()
@Module(
    {
        imports:[],
        providers:[ChatGateway],
        exports:[ChatGateway]
    }
)
export class ChatModuleGateway{}