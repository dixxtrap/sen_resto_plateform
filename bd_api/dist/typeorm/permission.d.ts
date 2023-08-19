import { PermissionUser } from './';
import { PermissionRole } from './permission_role';
export declare class Permission {
    id: number;
    permissionUser: PermissionUser;
    permissionRole: PermissionRole;
    sousModule: string;
    type: string;
    isActive: boolean;
}
