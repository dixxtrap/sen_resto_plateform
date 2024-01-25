import { FileDocument } from "./file_document";
import * as yup from "yup";
export class PaymentType {
  id?: number;
  name?: string;
  description?: string;
  fees?: number;
  invertFees?: number;
  profile?: FileDocument;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export const paymentTypeSchema = yup.object({
  name: yup.string().required(),
  isActive: yup.boolean(),
  description: yup.string(),
  fees: yup.number().min(0).max(100),
  invertFees: yup.number().min(0).max(100),
});
