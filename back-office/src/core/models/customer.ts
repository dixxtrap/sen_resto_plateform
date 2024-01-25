import * as yup from "yup"
import { CreationDetailDto } from "./creation_details.dto"

export class Customer {
        [x: string]: any
        id?: number
        phone?: string
        adresse?: string
        isPhoneVeirified?: boolean
        fisrtname?: string
        lastname?: string
        laltitude?: number
        longitude?: number
        isEnable?: boolean
       details?:CreationDetailDto
      }


      export const customerSchema=yup.object({
id:yup.number(),
phone:yup.string(),
adresse:yup.string(),
displayName:yup.string(),
laltitude:yup.number(),
longitude:yup.number(),
isEnable:yup.boolean(),
isPhoneVeirified:yup.boolean(),
      })
      