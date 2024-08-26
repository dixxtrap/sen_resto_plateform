import { CreationDetailDto } from "./creation_details.dto"
import { CoordonatesDto } from "./coordonates.dto"
import { AddressDto } from "./address.dto"

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



      