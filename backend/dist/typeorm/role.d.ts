import { Permission, User } from '.';
export declare class Role {
    id: number;
    scope: string;
    isActive: boolean;
    name: string;
    user: User[];
    permission: Permission[];
    createdAt: Date;
    updatedAt: Date;
    permissionLenght: number;
    userLenght: number;
    private PermissionLenght;
}
