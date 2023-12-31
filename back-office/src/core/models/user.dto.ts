import * as Yup from "yup";
import { text } from "./text";
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

export const userSchema = Yup.object({
  firstname: Yup.string().max(30).required(),
  lastname: Yup.string().max(30).required(),

  phone: Yup.string().max(20, text.caracter_max(20)),
  birthday: Yup.string(),
  address: Yup.string().max(50, text.caracter_max(50)),
  roleId: Yup.number(),
  restaurantId: Yup.number().nullable().notRequired().optional(),
  companyId: Yup.number(),
  city: Yup.string(),
  country: Yup.string(),
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
