import { Company } from './';
import { Contact } from './contact';
export declare class CompanyContact extends Contact {
    companyId: number;
    company: Company;
    createdAt: Date;
    updatedAt: Date;
}
