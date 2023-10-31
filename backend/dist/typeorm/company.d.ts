import { Restaurant } from './restaurant';
import { FileDocument } from './document';
export declare class Company {
    id: number;
    name: string;
    short_name: string;
    email: string;
    description: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    phone: string;
    laltitude: number;
    longitude: number;
    isActive: boolean;
    canPublish: boolean;
    createdAt: Date;
    updatedAt: Date;
    profile: FileDocument;
    restaurants: Restaurant[];
}
