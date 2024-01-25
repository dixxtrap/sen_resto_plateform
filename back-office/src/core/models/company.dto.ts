import * as yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";
import { CompanyEnum } from "./company_enu";
import { AddressDto, addressSchema } from "./address.dto";
import { CoordonatesDto, coordonatesSchema } from "./coordonates.dto";
import { CreationDetailDto } from "./creation_details.dto";

export type CompanyDto = {
  id?: number;
  name?: string;
  email?: string;
  balance?: number;
  shortname?: string;
  description?: string;
  address?: AddressDto;
  phone?: string;
  location?:CoordonatesDto;
  isActive?: boolean;
  canPublish?: boolean;
  openingTime?: string;
  closingTime?: string;
  imagePath?: string;
  parentId?:number;
  details?:CreationDetailDto,
} & { type?: CompanyEnum.RESTO; parent?: CompanyDto } & {
  type?: CompanyEnum.MASTER;
  children?: number | CompanyDto[];
};
export const companySchema = yup.object({
  name: yup.string().max(30).required(),
  shortname: yup.string(),
  description: yup.string(),
  phone: yup.string().max(20, text.caracter_max(20)).required(),
  address:addressSchema,
 
  email: yup.string().max(30, text.caracter_max(30)).required(),
location:coordonatesSchema,
  openingTime: yup
    .string()
    .matches(
      /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      "Invalid time format. Use HH:MM:SS"
    ),
  closingTime: yup
    .string()
    .matches(
      /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      "Invalid time format. Use HH:MM:SS"
    ),
  // age: yup.number().positive().integer().required(),
});
