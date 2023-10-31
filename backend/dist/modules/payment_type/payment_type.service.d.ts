import { PaymentTypeDto } from 'src/dto/payment_type.dto';
import { PaymentType, PaymentTypeHistory } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class PaymentTypeService {
    private repos;
    private reposHistory;
    constructor(repos: Repository<PaymentType>, reposHistory: Repository<PaymentTypeHistory>);
    getS(): Promise<PaymentType[]>;
    get(id: number): Promise<PaymentType>;
    update(id: number, item: PaymentTypeDto): Promise<import("typeorm").UpdateResult>;
    post(item: PaymentTypeDto, user: any): Promise<void>;
}
