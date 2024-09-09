import { CreationDetailDto } from "./creation_details.dto"
import { ProductDto } from "./product"

export interface  ProductManagement {
    id?: number
    productId?: number
    product?:ProductDto
    partnerId?: number
    isActive?: boolean
    details?: CreationDetailDto
  }
  
