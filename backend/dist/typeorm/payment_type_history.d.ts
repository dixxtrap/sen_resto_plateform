import { PaymentType, User } from '.';
export declare class PaymentTypeHistory {
    id: number;
    name: string;
    createBy: User;
    createById: number;
    paymentType: PaymentType;
    paymentTypeId: number;
    fees: number;
    feesInvert: number;
    isActive: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
