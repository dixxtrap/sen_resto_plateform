import { CreationDetailDto } from "./creation_details.dto"

export class DeliverDto{
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