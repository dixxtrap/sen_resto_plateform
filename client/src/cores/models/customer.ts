import { AddressDto } from "./address.dto"
import { CoordonatesDto } from "./coordonates.dto"
import { CreationDetailDto } from "./creation_details.dto"


export class Customer {
        id?: number
        phone?: string
        isPhoneVeirified?: boolean;
       displayname?:string;
        cityId?: number;
       address?:AddressDto
    details?:CreationDetailDto
    location?:CoordonatesDto
      }


//       export const customerSchema=yup.object({
// id:yup.number(),
// phone:yup.string(),
// adresse:yup.string(),
// displayName:yup.string(),
// laltitude:yup.number(),
// longitude:yup.number(),
// isEnable:yup.boolean(),
// isPhoneVeirified:yup.boolean(),
//       })
      

export class OtpVerificationDto {
  to?: string;
  code?: string;
}