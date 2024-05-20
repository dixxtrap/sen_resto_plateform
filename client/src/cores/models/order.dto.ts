import { CompanyDto } from "./company.dto"
import { CreationDetailDto } from "./creation_details.dto"
import { ProductDto } from "./product"

export interface OrderDto {
    id: number
    partnerId: number
    customerId: number
    deliverId: number 
    deliveryDate: string
    status: string
    details: CreationDetailDto
    partner:CompanyDto
    products: OrderProduct[]
  }
export interface OrderProduct {
    productHistoryId: number
    partnerId:number
   
    description: string
    quantity: number
    productHistory: ProductHistory
  }
  
  export interface ProductHistory {
    id:number
    price: number
    reduction: number
    productId: number
    product: ProductDto
  }