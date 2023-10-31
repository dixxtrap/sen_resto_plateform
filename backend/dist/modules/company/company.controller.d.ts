import { CompanyService } from './company.service';
import { CompanyDto } from 'src/dto/company.dto';
import { CompanyContactDto } from 'src/dto/contact.dto';
import { RestaurantDto } from 'src/dto/restaurant.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(company: CompanyDto): Promise<import("../../typeorm").Company>;
    addRestaurant(resto: RestaurantDto): Promise<import("../../typeorm").Restaurant>;
    getCompanys(): Promise<import("../../typeorm").Company[]>;
    createContact(id: number, contact: CompanyContactDto): Promise<import("../../typeorm").CompanyContact>;
    createCompanyWithReasto(company: CompanyDto): Promise<import("../../typeorm").Company>;
    getCompany(id: number): Promise<import("../../typeorm").Company>;
    updateCompany(id: number, company: CompanyDto): Promise<boolean>;
    updateContact(id: number, contact: CompanyContactDto): Promise<import("typeorm").UpdateResult>;
    deleteRestaurant(id: number): Promise<import("typeorm").UpdateResult>;
}
