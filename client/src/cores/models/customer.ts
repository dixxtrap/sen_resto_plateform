import { AddressDto } from "./address.dto"
import { CreationDetailDto } from "./creation_details.dto"


export class Customer {
        id?: number
        phone?: string
        isPhoneVeirified?: boolean
        firstname?: string
        lastname?: string
       address?:AddressDto
    details?:CreationDetailDto
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
      