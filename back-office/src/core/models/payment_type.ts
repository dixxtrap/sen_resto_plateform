import { CreationDetailDto } from "./creation_details.dto";
import { FileDocument } from "./file_document";
import * as yup from "yup";
export class PaymentType {
  id?: number;
  name?: string;
  imagePath?: string;
  shortname?: string;
  phone?: string;
  email?: string;
  description?: string;
  fees?: number;
  invertFees?: number;
  profile?: FileDocument;
  details?:CreationDetailDto;
  isActive?: boolean;
}

export const paymentTypeSchema = yup.object({
  name: yup.string().required(),
  shortname: yup.string().required(),
  isActive: yup.boolean(),
  description: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  fees: yup.number().min(0).max(100),
  invertFees: yup.number().min(0).max(100),
});
