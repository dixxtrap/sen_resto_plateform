import { Company, Permission, Restaurant, Role } from '.';
import { FileDocument } from '.';
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    pin: string;
    encryptedPin: string;
    isAdmin: boolean;
    isAgent: boolean;
    restaurant: Restaurant;
    restaurantId: number;
    company: Company;
    companyId: number;
    permission: Permission[];
    address: string;
    country: string;
    city: string;
    birthday: Date;
    phone: string;
    roleId: number;
    role: Role;
    profile: FileDocument;
    status: boolean;
    updatedAt: Date;
    createdAt: Date;
    hashPassword(): Promise<void>;
    permissionLenght: number;
    private PermissionLenght;
}