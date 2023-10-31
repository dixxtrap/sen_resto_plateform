import { FileDocumentDto } from './file.dto';
export declare class RestaurantDto {
    name: string;
    locality: string;
    companyId?: number;
    description: string;
    laltitude?: number;
    longitude?: number;
    email: string;
    profile: FileDocumentDto;
}
