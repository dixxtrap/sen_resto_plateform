import { Permission, Role, User } from './';
export declare class PermissionRole {
    id: number;
    permissionId: number;
    roleId: number;
    permission: Permission;
    role: Role;
    createBy: User;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
