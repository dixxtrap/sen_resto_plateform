
import { User } from "./user.dto";
import { RolePermissionDto } from "./permission_role.dto";
import { CreationDetailDto } from "./creation_details.dto";
export class RoleDto {
  id?: number;
  name?: string;
  code?: string;
 children?:RoleDto[];
  isActive?: boolean;
 details?:CreationDetailDto;
parent?:RoleDto;
parentId?:number;
  rolePermission?: RolePermissionDto[];
  permissions?: number[];
  user?: User[];
  description?: string;
}
