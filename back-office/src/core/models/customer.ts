import { CreationDetailDto } from "./creation_details.dto"
import { CoordonatesDto } from "./coordonates.dto"

export class Customer {
        
        id?: number
        phone?: string
        address?: string;
        isPhoneVeirified?: boolean
        displayname?: string
        
       location?:CoordonatesDto
       
       details?:CreationDetailDto
  isActive?: boolean
      }



      