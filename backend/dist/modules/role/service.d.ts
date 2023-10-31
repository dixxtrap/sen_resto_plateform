import { PermissionDto } from 'src/dto/permission.dto';
import { RoleDto } from 'src/dto/role.dto';
import { Permission, PermissionRole, Role } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class RoleService {
    private repos;
    private permission;
    private reposPermission;
    constructor(repos: Repository<Role>, permission: Repository<Permission>, reposPermission: Repository<PermissionRole>);
    post(body: RoleDto): Promise<Role>;
    getS(): Promise<Role[]>;
    get(id: number): Promise<{
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
        user: import("src/typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
        permissionLenght: number;
        userLenght: number;
    }>;
    getRolePermission(id: number): Promise<{
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
        user: import("src/typeorm").User[];
        createdAt: Date;
        updatedAt: Date;
        permissionLenght: number;
        userLenght: number;
    }>;
    getPermission(id: number): Promise<Permission[]>;
    getNoValidPermision(id: any): Promise<Permission[]>;
    deletePermission(id: number, body: PermissionDto[]): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
    addPermission(id: number, body: PermissionDto[]): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
    update(id: number, body: RoleDto): Promise<{
        status: string;
        code: number;
        message: string;
    }>;
}
