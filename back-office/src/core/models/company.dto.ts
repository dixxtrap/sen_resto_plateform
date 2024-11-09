import { CoordonatesDto } from "./coordonates.dto";
import { CreationDetailDto } from "./creation_details.dto";
import { EstablishmentTypeDto } from "./establishment_type.dto";
import { CompanyCategoryDto } from "./company_category.dto";
export type ShopDto = {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
  closingTime?: boolean;
  openingTime?: boolean;
  backgroundPath?: string;
  description?: string;
  details?: CreationDetailDto;
  location?: CoordonatesDto;
};
export type CompanyDto = {
  id?: number;
  name?: string;
  email?: string;
  balance?: number;
  shortname?: string;
  description?: string;
  establishmentTypeId?: string;
  establishmentType?: EstablishmentTypeDto;
  address?: string;
  phone?: string;
  shop?: companyShop;
  location?: CoordonatesDto;
  isActive?: boolean;
  category?: CompanyCategoryDto[];
  canPublish?: boolean;
  openingTime?: string;
  closingTime?: string;
  isOpen?: boolean;
  imagePath?: string;
  backgroundPath?: string;
  details?: CreationDetailDto;
};
export class companyShop {
  backgroundPath?: string;
  name?: string;
}
