import { CreationDetailDto } from "./creation_details.dto";
import { FileDocument } from "./file_document";
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
