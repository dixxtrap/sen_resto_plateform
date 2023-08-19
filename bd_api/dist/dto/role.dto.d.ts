export declare class RoleDto {
    name: string;
    scope: string;
    createdAt?: Date;
    updatedAT?: Date;
}
export declare class PermissionRoleDto {
    id: number;
    roleId: number;
    isActive: boolean;
    permissionId: number;
    createdAt: Date;
    updatedAt: Date;
}
