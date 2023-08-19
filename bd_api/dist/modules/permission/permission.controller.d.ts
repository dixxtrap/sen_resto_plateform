import { PermissionService } from './permission.service';
import { Permission } from 'src/typeorm';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    getPermissions(): Promise<Permission[]>;
}
