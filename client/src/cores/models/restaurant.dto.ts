import { CompanyDto } from "./company.dto";
import { RestaurantContactDto } from "./restaurant_contact.dto";
import { FileDocument } from "./file_document";

export class RestaurantDto {
  id?: number;

  name?: string;

  email?: string;
  description?: string;

  companyId?: number;
  createdAt?: string;
  isActive?:  boolean;

  updatedAt?: string;

  laltitude?: number;

  longitude?: number;

  isDelecetd?: boolean;

  company?: CompanyDto;

  contact?: RestaurantContactDto | number;

  address?: string;

  city?: string;

  country?: string;

  postal_code?: string;
  openingTime?: string;
  closingTime?: string;
  phone?: string;
  profile?: FileDocument;
}