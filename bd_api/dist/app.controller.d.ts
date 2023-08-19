import { AppService } from './app.service';
import { CompanyDto } from './dto/company.dto';
export declare class AppController {
    protected readonly appService: AppService;
    constructor(appService: AppService);
    getHello(): string;
    createCompany(company: CompanyDto): Promise<import("./typeorm").Company>;
}
