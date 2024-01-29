import * as yup from "yup"
import { CreationDetailDto } from "./creation_details.dto"
import { CoordonatesDto, coordonatesSchema } from "./coordonates.dto"
import { AddressDto, addressSchema } from "./address.dto"

export class Customer {
        
        id?: number
        phone?: string
        address?: AddressDto
        isPhoneVeirified?: boolean
        firstname?: string
        lastname?: string
       location?:CoordonatesDto
        isEnable?: boolean
       details?:CreationDetailDto
  isActive?: boolean
      }


      export const customerSchema=yup.object({
id:yup.number(),
phone:yup.string(),
address:addressSchema,
firstname:yup.string(),
lastname:yup.string(),
location: coordonatesSchema,
isEnable:yup.boolean(),
isPhoneVeirified:yup.boolean(),
      })
      