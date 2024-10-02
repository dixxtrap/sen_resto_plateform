import { CreationDetailDto } from "./creation_details.dto";
import { CoordonatesDto } from "./coordonates.dto";
import { AddressDto } from "./address.dto";
import { ProductManagement } from "./product_management.dto";
import { CompanyCategoryDto } from "./company_category.dto";
export enum CompanyEnum {
  RESTO = 'restaurant',
  MASTER = 'master',
  DELIVER = 'deliver',
  COMPANY = 'CompanyRestaurant',
}
export class CompanyDto {
  id?: number;
  name?: string;
  backgroundPath?: string;
  email?: string;
  shortname?: string;
  description?: string;
  address?: AddressDto;
  type?: CompanyEnum;
  city?: string;
  country?: string;
  phone?: string;
  productManagement?:ProductManagement[]
  location?:CoordonatesDto;
  isActive?: boolean;
  canPublish?: boolean;
  openingTime?: string;
  closingTime?: string;
  imagePath?: string;
  parentId?:number;
  parent?:CompanyDto;
  details?:CreationDetailDto;
  isOpen?:boolean;
  category?:CompanyCategoryDto[]
}
// export const companySchema = yup.object({
//   name: yup.string().max(30).required(),
//   short_name: yup.string(),
//   description: yup.string(),
//   postal_code: yup.string(),
//   phone: yup.string().max(20, text.caracter_max(20)).required(),
//   address: yup
//     .string()

//     .max(50, text.caracter_max(50))
//   ,
//   city: yup
//     .string()
//     .min(4, text.caracter_min(4))
//     .max(20, text.caracter_max(20))
//     .required(),
//   country: yup.string().max(20, text.caracter_max(20)),
//   email: yup.string().max(30, text.caracter_max(30)).required(),
//   laltitude: yup.number(),
//   longitude: yup.number(),

//   // age: yup.number().positive().integer().required(),
// });
