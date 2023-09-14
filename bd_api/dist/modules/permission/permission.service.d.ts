import { OnModuleInit } from '@nestjs/common';
import { PermissionDto } from 'src/dto/permission.dto';
import { RoleDto } from 'src/dto/role.dto';
import { Permission, Role } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class PermissionService implements OnModuleInit {
    private permissionRepos;
    private roleRepos;
    constructor(permissionRepos: Repository<Permission>, roleRepos: Repository<Role>);
    onModuleInit(): void;
    onInit(): Promise<void>;
    createRole(role: RoleDto): Promise<Role>;
    getRoleByName(name: string, scope: string): Promise<Role>;
    getRole(): Promise<Role[]>;
    getRoleUser(search: string): Promise<Role[]>;
    getRolePermission(id: number): Promise<Role>;
    onInitRole(): Promise<void>;
    createPermission(permisionTdo: PermissionDto): Promise<Permission>;
    getPermissions(): Promise<Permission[]>;
}
