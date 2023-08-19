import { CompanyUserService } from './company_user.service';
import { CompanyUserDto } from 'src/dto/company_user.dto';
export declare class CompanyUserController {
    private service;
    constructor(service: CompanyUserService);
    getS(): Promise<import("../../typeorm").CompanyUser[]>;
    get(id: number): Promise<import("../../typeorm").CompanyUser>;
    create(item: CompanyUserDto): Promise<import("../../typeorm").CompanyUser>;
    update(id: number): Promise<{
        isActive: boolean;
        id: number;
        companyId: number;
        userId: number;
        company: import("../../typeorm").Company;
        user: import("../../typeorm").User;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
