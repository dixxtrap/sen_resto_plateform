import { CoordonatesDto } from "./coordonates.dto"
import { CreationDetailDto } from "./creation_details.dto"

export class DeliverDto{
        id?: number
        phone?: string
        address?: string
        email?: string
        location?:CoordonatesDto;
        isPhoneVeirified?: boolean
        firstname?: string
        lastname?: string
        laltitude?: number
        longitude?: number
        isEnable?: boolean
       details?:CreationDetailDto 
}