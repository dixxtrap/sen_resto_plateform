import { PermissionRole, User } from './';
export declare class Role {
    id: number;
    scope: string;
    name: string;
    user: User[];
    permissionRole: PermissionRole[];
    createdAt: Date;
    updatedAt: Date;
}
