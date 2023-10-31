import { PaymentTypeService } from './payment_type.service';
import { PaymentTypeDto } from 'src/dto/payment_type.dto';
import { Request } from 'express';
export declare class PaymentTypeController {
    private service;
    constructor(service: PaymentTypeService);
    getS(): Promise<import("../../typeorm").PaymentType[]>;
    get(id: number): Promise<import("../../typeorm").PaymentType>;
    post(body: PaymentTypeDto, req: Request): Promise<void>;
    update(body: PaymentTypeDto, id: number, req: Request): Promise<import("typeorm").UpdateResult>;
}
