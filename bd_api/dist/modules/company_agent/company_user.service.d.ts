import { CompanyUserDto } from 'src/dto/company_user.dto';
import { CompanyUser } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class CompanyUserService {
    private repos;
    constructor(repos: Repository<CompanyUser>);
    getS(): Promise<CompanyUser[]>;
    get(id: number): Promise<CompanyUser>;
    create(item: CompanyUserDto): Promise<CompanyUser>;
    update(id: number): Promise<{
        isActive: boolean;
        id: number;
        companyId: number;
        userId: number;
        company: import("src/typeorm").Company;
        user: import("src/typeorm").User;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
