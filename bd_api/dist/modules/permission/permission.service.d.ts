import { OnModuleInit } from '@nestjs/common';
import { PermissionDto } from 'src/dto/permission.dto';
import { PermissionRoleDto, RoleDto } from 'src/dto/role.dto';
import { Permission, PermissionRole, PermissionUser, Role } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class PermissionService implements OnModuleInit {
    private permissionRepos;
    private roleRepos;
    private permiRoleRepos;
    private permiUser;
    constructor(permissionRepos: Repository<Permission>, roleRepos: Repository<Role>, permiRoleRepos: Repository<PermissionRole>, permiUser: Repository<PermissionUser>);
    onModuleInit(): void;
    onInit(): void;
    createRole(role: RoleDto): Promise<Role>;
    getRoleByName(name: string, scope: string): Promise<Role>;
    getRole(): Promise<Role[]>;
    getRoleUser(search: string): Promise<Role[]>;
    createRolePermissions(permissionRoles: PermissionRoleDto[]): Promise<string>;
    createRolePermission(permissionRole: PermissionRoleDto): Promise<PermissionRole>;
    getRolePermission(id: number): Promise<Role>;
    onInitRole(): void;
    createPermission(permisionTdo: PermissionDto): Promise<Permission>;
    getPermissions(): Promise<Permission[]>;
}
