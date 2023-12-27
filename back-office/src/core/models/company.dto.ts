import * as yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";
import { CompanyEnum } from "./company_enu";

export type CompanyDto = {
  id?: number;
  name?: string;
  email?: string;
  short_name?: string;
  shortname?: string;
  description?: string;
  imagePath?: string;
  address?: string;
  type?: CompanyEnum;
  city?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  laltitude?: number;
  longitude?: number;
  isActive?: boolean;
  canPublish?: boolean;
  createdAt?: string;
  updatedAt?: string;
  openingTime?: string;
  closingTime?: string;
  profile?: FileDocument;
  parentId?:number;
} & { type?: CompanyEnum.RESTO; parent?: CompanyDto } & {
  type?: CompanyEnum.MASTER;
  children?: number | CompanyDto[];
};
export const companySchema = yup.object({
  name: yup.string().max(30).required(),
  short_name: yup.string(),
  description: yup.string(),
  postal_code: yup.string(),
  phone: yup.string().max(20, text.caracter_max(20)).required(),
  address: yup
    .string()

    .max(50, text.caracter_max(50)),
  city: yup
    .string()
    .max(20, text.caracter_max(20)),
  country: yup.string().max(20, text.caracter_max(20)),
  email: yup.string().max(30, text.caracter_max(30)).required(),
  laltitude: yup.number(),
  longitude: yup.number(),
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
