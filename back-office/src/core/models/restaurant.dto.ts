import { CompanyDto } from "./company.dto";
import { RestaurantContactDto } from "./restaurant_contact.dto";
import * as yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";
import { profile } from "console";
export class RestaurantDto {
  id!: number;

  name!: string;

  email!: string;

  companyId!: number;

  createdAt!: String;

  updatedAt!: String;

  laltitude!: number;

  longitude!: number;

  isDelecetd!: boolean;

  company!: CompanyDto;

  contact!: RestaurantContactDto | number;

  address!: string;

  city!: string;

  country!: string;

  postal_code!: string;

  phone!: string;
  profile!: FileDocument;
}

export const restaurantSchema = yup.object({
  name: yup.string().max(30).required(),
  phone: yup.string().max(20, text.caracter_max(20)).required(),
  address: yup
    .string()

    .max(50, text.caracter_max(50))
    .required(),
  city: yup
    .string()
    .min(4, text.caracter_min(4))
    .max(20, text.caracter_max(20))
    .required(),
  country: yup.string().max(20, text.caracter_max(20)),
  email: yup.string().max(30, text.caracter_max(30)).required(),
  laltitude: yup.number(),
  longitude: yup.number(),
  companyId: yup.number(),
  // age: yup.number().positive().integer().required(),
});
export type RestaurantFormData = yup.InferType<typeof restaurantSchema>;
