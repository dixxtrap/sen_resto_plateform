
import { CompanyEnum } from "./company_enu";
import { CoordonatesDto } from "./coordonates.dto";
import { CreationDetailDto } from "./creation_details.dto";
import { City } from "./city.dto";
import { EstablishmentTypeDto } from "./establishment_type.dto";
type AddressType={
regionId?:number,
municipalityId?:number,
departementId?:number,
cityId?:number,
}
export type CompanyDto  = Partial<AddressType>&{
  id?: number;
  name?: string;
  email?: string;
  balance?: number;
  shortname?: string;
  description?: string;
  establishmentTypeId?: string;
  establishmentType?:EstablishmentTypeDto
  address?: string;
  phone?: string;
  city?: City;
  cityId?: number;
  location?:CoordonatesDto;
  isActive?: boolean;
  canPublish?: boolean;
  openingTime?: string;
  closingTime?: string;
  imagePath?: string;
  backgroundPath?: string;
  parentId?:number;
  details?:CreationDetailDto,
} & { type?: CompanyEnum.RESTO; parent?: CompanyDto } & {
  type?: CompanyEnum.MASTER;
  children?: number | CompanyDto[];
};