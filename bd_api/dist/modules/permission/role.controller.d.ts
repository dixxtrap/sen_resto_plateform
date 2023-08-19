import { PermissionService } from './permission.service';
import { PermissionRoleDto, RoleDto } from 'src/dto/role.dto';
export declare class RoleController {
    private permissionService;
    constructor(permissionService: PermissionService);
    create(roleDto: RoleDto): Promise<import("../../typeorm").Role>;
    createRolePermission(rolePermission: PermissionRoleDto): Promise<import("../../typeorm").PermissionRole>;
    createRolePermissions(permissionRoles: [PermissionRoleDto]): Promise<string>;
    getRole(): Promise<import("../../typeorm").Role[]>;
    getRoleUser(search: string): Promise<import("../../typeorm").Role[]>;
    getPermission(id: number): Promise<import("../../typeorm").Role>;
}
