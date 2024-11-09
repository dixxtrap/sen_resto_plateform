import { FileDocument } from "./file_document";

import { CompanyDto } from "./company.dto";
import { RoleDto } from "./role.dto";
import { CreationDetailDto } from "./creation_details.dto";
import { CoordonatesDto } from "./coordonates.dto";

export class User {
  [x: string]: unknown;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: String;
  city?: string;
  isAgent?: boolean;
  isAdmin?: boolean;

  birthday?: Date;
  password?: string;
 details?:CreationDetailDto;
  pin?: string;
coordonates?:CoordonatesDto;
  companyId?: string;
  company?: CompanyDto;
  isActive?: boolean;
  profile?: FileDocument;
  roleId?: string;
  role?: RoleDto;
}

