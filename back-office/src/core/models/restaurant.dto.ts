import { CompanyDto } from "./company.dto";
import { RestaurantContactDto } from "./restaurant_contact.dto";
import * as yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";

export class RestaurantDto {
  id?: number;

  name?: string;

  email?: string;
  description?: string;

  companyId?: number;
  createdAt?: string;

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

export const restaurantSchema = yup.object({
  name: yup.string().max(30).required(),
  description: yup.string(),
  phone: yup.string().max(20, text.caracter_max(20)).required(),
  address: yup
    .string()

    .max(50, text.caracter_max(50))
 ,
  city: yup
    .string()
    .max(20, text.caracter_max(20))
  ,
 openingTime:yup.string()
    .matches(
      /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      'Invalid time format. Use HH:MM:SS'
  ),
  closingTime:yup.string()
    .matches(
      /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
      'Invalid time format. Use HH:MM:SS'
    ),
  country: yup.string().max(20, text.caracter_max(20)),
  email: yup.string().max(30, text.caracter_max(30)).required(),
  laltitude: yup.number(),
  longitude: yup.number(),
  companyId: yup.number(),
  // age: yup.number().positive().integer().required(),
});
export type RestaurantFormData = yup.InferType<typeof restaurantSchema>;
