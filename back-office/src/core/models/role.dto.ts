import { User } from "./user.dto";

export class RoleDto {
  id!: number;
  name!: string;
  scope!: string;
  createdAt!:string;
  updatedAt!:string;
permissionRole!:PermissionRoleDto[];
user!:User[]
}
export class PermissionRoleDto{
id?:number;
createdAt?:string;
updatedAt?:string;
permissionId!:number
userId!:number
roleId!:number
permission?:PermissionDto;
isActive!:boolean;
user?:User;
}
export class PermissionDto{
  id!:number;
  createdAt!:string;
  updatedAt!:string;
  sousModule!:string;
  type!:string
}