import { CompanyService } from './modules/company/company.service';
export declare class AppService {
    companyService: CompanyService;
    constructor(companyService: CompanyService);
    getHello(): string;
}
