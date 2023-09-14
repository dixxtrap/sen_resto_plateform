import { Company } from './company';
import { FileDocument, RestaurantContact } from '.';
export declare class Restaurant {
    id: number;
    name: string;
    description: string;
    email: string;
    companyId: number;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    laltitude: number;
    longitude: number;
    isDelecetd: boolean;
    profile: FileDocument;
    company: Company;
    contact: RestaurantContact;
    openingTime: string;
    closingTime: string;
}
