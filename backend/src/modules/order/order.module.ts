import { Module } from "@nestjs/common/decorators/modules";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/typeorm/order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports:[TypeOrmModule.forFeature
        ([Order])
    ]
    ,controllers:[OrderController]
    ,providers:[OrderService]
})
export class OrderModule{}