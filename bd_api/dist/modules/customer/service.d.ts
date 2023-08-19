import { JwtService } from '@nestjs/jwt';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class CustomerService {
    private repos;
    private jwt;
    constructor(repos: Repository<Customer>, jwt: JwtService);
    getS(): Promise<Customer[]>;
    get(id: number): Promise<Customer>;
    getPhone(phone: string): Promise<{
        token: string;
        id: number;
        phone: string;
        isPhoneVeirified: boolean;
        displayName: string;
        laltitude: number;
        longitude: number;
        updatedAt: Date;
        createdAt: Date;
    }>;
    update(id: number, item: CustomerDto): Promise<import("typeorm").UpdateResult>;
    post(item: CustomerDto): Promise<Customer>;
}
