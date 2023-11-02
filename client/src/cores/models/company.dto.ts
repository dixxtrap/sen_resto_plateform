import { RestaurantDto } from "./restaurant.dto";
import * as yup from "yup";
import { text } from "./text";
import { FileDocument } from "./file_document";
export class CompanyDto {
  id?: number;
  name?: string;
  email?: string;
  short_name?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  laltitude?: number;
  longitude?: number;
  isActive?: boolean;
  canPublish?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  restaurants?: number | RestaurantDto[];
  profile?: FileDocument;
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

