
import { FileDocument } from "./file_document";
import { RoleDto } from "./role.dto";
import { CompanyDto } from "./company.dto";
import { RestaurantDto } from "./restaurant.dto";

export class User {
  [x: string]: unknown;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  isAgent?: boolean;
  isAdmin?: boolean;
  country?: string;
  birthday?: string;
  createdAt?: string;
  pin?: string;
  restaurantId?: number|null;
  restaurant?: RestaurantDto;
  companyId?: number|null;
  company?: CompanyDto;
  status?: boolean;
  profile?: FileDocument;
  roleId?: number;
  role?: RoleDto;
}
