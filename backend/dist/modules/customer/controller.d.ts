import { CustomerService } from './service';
import { CustomerDto } from 'src/dto/customer.dto';
export declare class CustomerController {
    private service;
    constructor(service: CustomerService);
    getS(): Promise<import("../../typeorm").Customer[]>;
    get(id: number): Promise<import("../../typeorm").Customer>;
    getByPhone(phone: string): Promise<{
        token: string;
        id: number;
        phone: string;
        adresse: string;
        isPhoneVeirified: boolean;
        displayName: string;
        laltitude: number;
        longitude: number;
        isEnable: boolean;
        updatedAt: Date;
        createdAt: Date;
    }>;
    post(item: CustomerDto): Promise<import("../../typeorm").Customer>;
    update(id: number, item: CustomerDto): Promise<import("typeorm").UpdateResult>;
}
