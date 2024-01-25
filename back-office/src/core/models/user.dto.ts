import * as Yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";

import { CompanyDto } from "./company.dto";
import { RoleDto } from "./role.dto";
import { CreationDetailDto } from "./creation_details.dto";
import { CoordonatesDto } from "./coordonates.dto";
import { AddressDto, addressSchema } from "./address.dto";

export class User {
  [x: string]: unknown;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: AddressDto;
  city?: string;
  isAgent?: boolean;
  isAdmin?: boolean;

  birthday?: Date;
  password?: string;
 details?:CreationDetailDto;
  pin?: string;
coordonates?:CoordonatesDto;
  parentId?: number|null;
  parent?: CompanyDto;
  isActive?: boolean;
  profile?: FileDocument;
  roleId?: number;
  role?: RoleDto;
}

export const userSchema = Yup.object({
  firstname: Yup.string().max(30).required(),
  lastname: Yup.string().max(30).required(),

  phone: Yup.string().max(20, text.caracter_max(20)),
  birthday: Yup.date(),
  address:addressSchema,
  roleId: Yup.number(),
  parentId: Yup.number().optional(),
  password: Yup.string().optional(),
  email: Yup.string(),

  // country: Yup.string().max(20, text.caracter_max(20)),
  // email: Yup.string().max(30, text.caracter_max(30)).required(),
 

  // age: yup.number().positive().integer().required(),
});
export const userSchemaCreate = userSchema.shape({

  
  pin: Yup.string().min(6, text.caracter_max(6)).required(),
});
export type userFormDataCreate = Yup.InferType<typeof userSchemaCreate>;

export const userSchemaUpdate = Yup.object().shape({
  ...userSchema.fields,
  pin: Yup.string(),
  isAgent: Yup.bool(),
  isAdmin: Yup.bool(),
});
export type userFormDataUpdate = Yup.InferType<typeof userSchemaUpdate>;

export type userFormData = Yup.InferType<typeof userSchema>;
