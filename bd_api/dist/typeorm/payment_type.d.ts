import { FileDocument, User } from '.';
export declare class PaymentType {
    id: number;
    name: string;
    createBy: User;
    createById: number;
    profile: FileDocument;
    fees: number;
    feesInvert: number;
    isActive: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
