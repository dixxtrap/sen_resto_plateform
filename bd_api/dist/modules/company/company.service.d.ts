import { OnModuleInit } from '@nestjs/common';
import { CompanyDto } from 'src/dto/company.dto';
import { CompanyContactDto } from 'src/dto/contact.dto';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { Company, CompanyContact, Restaurant, User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';
import { DocumentService } from '../document_file/document_file.service';
export declare class CompanyService implements OnModuleInit {
    private restosService;
    private company;
    private companycontact;
    private user;
    private permission;
    private doc;
    constructor(restosService: Repository<Restaurant>, company: Repository<Company>, companycontact: Repository<CompanyContact>, user: Repository<User>, permission: PermissionService, doc: DocumentService);
    onModuleInit(): void;
    getHello(): void;
    createCompany(companyDto: CompanyDto): Promise<Company>;
    getCompanys(): Promise<Company[]>;
    getCompany(id: number): Promise<Company>;
    updateCompany(company: CompanyDto): Promise<boolean>;
    createCompanyContact(companyContact: CompanyContactDto): Promise<CompanyContact>;
    updateCompanyContact(id: number, companyContact: CompanyContactDto): Promise<import("typeorm").UpdateResult>;
    getRestaurants(): Promise<Restaurant[]>;
    getRestaurantParticulier(): Promise<Restaurant[]>;
    getRestaurant(id: number): Promise<Restaurant>;
    createRestaurant(restos: RestaurantDto, company?: Company): Promise<Restaurant>;
    deleteRestaurant(id: number): Promise<import("typeorm").UpdateResult>;
    updateRestaurant(id: number, restos: RestaurantDto): Promise<{
        message: string;
    }>;
}
