import * as yup from "yup"

export class Customer {
        id?: number
        phone?: string
        adresse?: string
        isPhoneVeirified?: boolean
        displayName?: string
        laltitude?: number
        longitude?: number
        isEnable?: boolean
        updatedAt?: string
        createdAt?: string
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
      