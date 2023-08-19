import { Permission, User } from './';
export declare class PermissionUser {
    id: number;
    permission: Permission[];
    user: User[];
    createBy: User;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
