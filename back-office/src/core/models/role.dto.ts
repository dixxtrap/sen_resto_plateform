
import * as Yup from "yup"
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
  user?: User[];
  description?: string;
}

export const roleSchema=Yup.object({
  name:Yup.string(),
  code:Yup.string(),
  description:Yup.string(),

})