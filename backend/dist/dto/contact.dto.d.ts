import { CompanyContact, Contact, RestaurantContact } from 'src/typeorm';
declare const ContactDto_base: import("@nestjs/common").Type<Partial<Contact>>;
export declare class ContactDto extends ContactDto_base {
    adress?: string;
    firstname?: string;
    email?: string;
    lastname?: string;
    telephhone?: string;
    id?: number;
}
declare const CompanyContactDto_base: import("@nestjs/common").Type<CompanyContact & ContactDto>;
export declare class CompanyContactDto extends CompanyContactDto_base {
    companyId: number;
}
declare const RestaurantContactDto_base: import("@nestjs/common").Type<ContactDto & RestaurantContact>;
export declare class RestaurantContactDto extends RestaurantContactDto_base {
    restaurantId: number;
}
export {};
