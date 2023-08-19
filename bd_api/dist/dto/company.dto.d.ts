import { RestaurantDto } from './restaurant.dto';
import { FileDocumentDto } from './file.dto';
export declare class CompanyDto {
    [x: string]: any;
    name: string;
    short_name: string;
    email: string;
    phone: string;
    description: string;
    laltitude: number;
    longitude: number;
    profile: FileDocumentDto;
    userId: number;
}
export declare class CompanyDtoRsetos {
    name: string;
    restaurants: [RestaurantDto];
}
export declare class UpdateCompanyDto {
    name?: string;
    laltitude: any;
}
