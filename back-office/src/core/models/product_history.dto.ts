import { CreationDetailDto } from "./creation_details.dto";
import { ProductDto } from "./product";

export type ProductHistoryDto={
  
    id?: number;
    name?: string;
    price?: number;
    reduction?: number;
    cookingTime?: string;   
    product?: ProductDto;
    productId?: number;
    details?: CreationDetailDto;
}