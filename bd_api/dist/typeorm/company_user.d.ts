import { Company, User } from '.';
export declare class CompanyUser {
    id: number;
    companyId: number;
    userId: number;
    isActive: boolean;
    company: Company;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
