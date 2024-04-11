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
       
       details?:CreationDetailDto
  isActive?: boolean
      }


      export const customerSchema=yup.object({
id:yup.number(),
phone:yup.string(),
address:addressSchema.notRequired().nullable(),
firstname:yup.string(),
lastname:yup.string(),
location: coordonatesSchema.notRequired().nullable(),
isActive:yup.boolean(),
isPhoneVeirified:yup.boolean(),
      })
      