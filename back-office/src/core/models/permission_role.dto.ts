import { CreationDetailDto } from "./creation_details.dto";
import { PermissionDto } from "./permission.dto";
import { RoleDto } from "./role.dto";

export class RolePermissionDto {
      permissionId?:number;
      roleId?:number;
      canUse?:number;
      isActive?:boolean;
      canInherit?:boolean;
      permission?:PermissionDto;
      role?:RoleDto;
      details?:CreationDetailDto
      }