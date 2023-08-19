import { PermissionUser, Role } from '.';
import { FileDocument } from './';
export declare class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    pin: string;
    encryptedPin: string;
    isAdmin: boolean;
    isAgent: boolean;
    isResto: boolean;
    isCompany: boolean;
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
    permissionUser: PermissionUser[];
    hashPassword(): Promise<void>;
}
