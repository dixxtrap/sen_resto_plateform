import { RoleService } from './service';
import { RoleDto } from 'src/dto/role.dto';
import { PermissionDto } from 'src/dto/permission.dto';
export declare class RoleController {
    private service;
    constructor(service: RoleService);
    gets(): Promise<import("../../typeorm").Role[]>;
    post(body: RoleDto): Promise<import("../../typeorm").Role>;
    update(id: number, body: RoleDto): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
    permission(id: number): Promise<{
        permission: {
            id: number;
            permissionId: number;
            roleId: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            sousModule: string;
            type: string;
        }[];
        id: number;
        scope: string;
        isActive: boolean;
        name: string;
        user: import("../../typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
        permissionLenght: number;
        userLenght: number;
    }>;
    permissionUser(id: number): Promise<{
        permission: {
            id: number;
            permissionId: number;
            roleId: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            sousModule: string;
            type: string;
        }[];
        id: number;
        scope: string;
        isActive: boolean;
        name: string;
        user: import("../../typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
        permissionLenght: number;
        userLenght: number;
    }>;
    getNoValidPermision(id: number): Promise<import("../../typeorm").Permission[]>;
    addPermission(id: number, body: [PermissionDto]): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
    removePermission(id: number, body: [PermissionDto]): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
}
