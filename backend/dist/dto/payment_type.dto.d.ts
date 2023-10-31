import { FileDocumentDto } from './file.dto';
export declare class PaymentTypeDto {
    id: number;
    name: string;
    createById: number;
    profile: FileDocumentDto;
    fees: number;
    feesInvert: number;
    isActive: boolean;
    description: string;
}
