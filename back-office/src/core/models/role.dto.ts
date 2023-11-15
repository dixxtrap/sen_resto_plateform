import { User } from "./user.dto";

export class RoleDto {
  id!: number;
  name!: string;
  scope!: string;
  createdAt!: string;
  isActive?: boolean;
  updatedAt!: string;
  permissionLenght?: number;
  userLenght?: number;
  permission!: PermissionRole[];
  user!: User[];
}
export class PermissionRole {
  id!: number;
  createdAt!: string;
  updatedAt!: string;
  sousModule!: string;
  type!: string;
  isActive!: boolean;
  user!: User;
}
export class PermissionDto {
  id!: number;
  createdAt!: string;
  updatedAt!: string;
  sousModule!: string;
  isActive!: boolean;
  type!: string;
}
